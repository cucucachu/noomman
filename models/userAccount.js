// MongoDB and Mongoose Setup
var mongoose = require('mongoose');
var database = require('./database');
var Schema = mongoose.Schema;

// Related Models
var UserModel = require('./user');

// Schema and Model Setup
var userAccountSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: {
		type: String,
		validate: {
			validator: function(v) {
				return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
			},
			message: 'Invalid Email'
		},
		required: true,

	},
	passwordHash: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

var UserAccount = mongoose.model('UserAccount', userAccountSchema);

//Methods 

// Create Method
var createUserAccount = function() {
	return new UserAccount({
		_id: new mongoose.Types.ObjectId()
	});
}

var createUserAndUserAccount = function() {
	var newUser = UserModel.createUser();
	var newUserAccount = createUserAccount();

	newUser.userAccount = newUserAccount._id;
	newUserAccount.user = newUser._id;

	return {
		user: newUser,
		userAccount: newUserAccount
	};
}

// Save
var saveUserAccount = function(userAccount, errorMessage, successMessasge){
	return new Promise(function(resolve, reject) {
		userAccount.save(function(err, newUserAccount){
			if (err) {
				if (errorMessage != null)
					console.log(errorMessage);
				console.error(err);
				reject(err);
			}
			else {
				if (successMessasge != null)
					console.log(successMessasge);
				resolve(userAccount);
			}
		});
	});
}

// Clear the collection. Never run in production! Only run in a test environment.
var clear = function() {
	return new Promise(function(resolve, reject) {	
		UserAccount.deleteMany({}, function(err) {
			if (err) reject(err);
			resolve();
		});
	});
}

// Exports
exports.UserAccount = UserAccount;
exports.createUserAccount = createUserAccount;
exports.createUserAndUserAccount = createUserAndUserAccount;
exports.saveUserAccount = saveUserAccount;
exports.clear = clear;