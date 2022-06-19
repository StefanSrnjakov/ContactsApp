const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tokenSchema = new Schema({
	'user_id' : String
});

module.exports = mongoose.model('token', tokenSchema);
