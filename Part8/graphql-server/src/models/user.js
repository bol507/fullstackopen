const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: [3, 'Username must be at least 3 characters long'],
	},
	favoriteGenre: String,
	/*passwordHash: {
		type: String,
		minLength: [3, 'Password must be at least 3 characters long'],
	},*/
});
schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
