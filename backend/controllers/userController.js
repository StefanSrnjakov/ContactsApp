const UserModel = require('../models/userModel.js');
const TokenModel = require('../models/tokenModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },
    show: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },
    create: function (req, res) {
        const user = new UserModel({
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },
    update: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    login: async function (req, res) {
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) return res.status(400).json({error: 'Username does not exists'});


        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({error: 'Invalid password'});


        const token = new TokenModel({
            user_id: user._id
        });

        const result = jwt.sign({user_id: user._id}, process.env.ACCESS_TOKEN_SECRET)

        token.save(function (err, mongoUser) {
            if (err) res.status(500).json({error: 'Token failed to save'});
            return res.header('auth-token', result).json({id: mongoUser._id, token: result, user: user})
        });
    },

    logout: async function (req, res) {
        TokenModel.findByIdAndRemove(req.header('id'), function (err, token) {
            if (err) return res.status(500).json('Token failed to remove');
            if (!token) return res.json('Token does not exist');
            return res.json('Token removed');
        });
    },
    register: async function (req, res) {

        const usernameExist = await UserModel.findOne({username: req.body.username});
        if (usernameExist) return res.status(400).json({error: 'Username already exists'});

        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new UserModel({
            username: req.body.username,
            password: hashPassword
        });

        await user.save(function (err, user) {
            if (err) {
                res.status(400).send(err);
            }
            res.send({user: user.id});

        });
    },

};
