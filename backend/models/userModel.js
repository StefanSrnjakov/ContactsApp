const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
	'username' : String,
	'password' : String,
	'contacts' : [{type: Schema.Types.ObjectId, ref: 'contact'}]
});

module.exports = mongoose.model('user', userSchema);
