const ContactModel = require('../models/contactModel.js');
const UserModel = require('../models/userModel');

module.exports = {
    list: function (req, res) {
        ContactModel.find(function (err, contacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }
            return res.json(contacts);
        });
    },
    listOwn: function (req, res) {
        const id = req.header('userId');
        UserModel.findById(id).populate("contacts").exec(function (err, user) {
            if (!user) {
                return res.status(500).json({
                    message: "Can't find user",
                    error: err
                });
            }
            return res.json(user);
        })
    },
    show: function (req, res) {
        const contactId = req.params.id;
        const userId = req.header('userId');
        ContactModel.findOne({_id: contactId}, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }
            if (userId !== contact.user_id.toString()) {
                return res.status(401).send('Access Denied');
            }
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }
            return res.json(contact);
        });
    },

    create: function (req, res) {
        const id = req.header('userId');
        const myUrl = req.file ? req.file.filename : "defaultImg.png";
        const contact = new ContactModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            user_id: id,
            imgUrl: myUrl
        });
        contact.save(function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contact',
                    error: err
                });
            }
            UserModel.findByIdAndUpdate(id, {$push: {contacts: contact._id}},
                function (error) {
                    if (error) {
                        return res.status(500).json({
                            message: 'Error when updating user',
                            error: err
                        });
                    }
                    return res.status(201).json(contact);
                }
            );
        });
    },
    update: function (req, res) {
        const id = req.params.id;
        const userId = req.header('userId');

        ContactModel.findOne({_id: id}, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact',
                    error: err
                });
            }

            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }

            if (userId !== contact.user_id.toString()) {
                return res.status(401).send('Access Denied');
            }
            contact.firstName = req.body.firstName ? req.body.firstName : contact.firstName;
            contact.lastName = req.body.lastName ? req.body.lastName : contact.lastName;
            contact.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : contact.phoneNumber;
            contact.imgUrl = req.body.imgUrl ? req.body.imgUrl : contact.imgUrl;

            contact.save(function (err, contact) {
                if (userId !== contact.user_id.toString()) {
                    return res.status(401).send('Access Denied');
                }
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contact.',
                        error: err
                    });
                }
                return res.json(contact);
            });
        });
    },
    remove: function (req, res) {
        const id = req.params.id;
        const userId = req.header('userId');

        ContactModel.findByIdAndRemove(id, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contact.',
                    error: err
                });
            }
            if (userId !== contact.user_id.toString()) {
                return res.status(401).send('Access Denied');
            }
            UserModel.updateOne({_id: userId}, {$pull: {contacts: contact._id}},
                function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the contact.',
                            error: err
                        });
                    }
                    return res.status(204).json();
                }
            );

        });
    }
};
