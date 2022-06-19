const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const contactSchema = new Schema({
	'firstName' : String,
	'lastName' : String,
	'phoneNumber' : String,
	'imgUrl' : String,
	'user_id' : { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('contact', contactSchema);
