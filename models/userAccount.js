// MongoDB and Mongoose Setup
var mongoose = require('mongoose');
var database = require('./database');
var Schema = mongoose.Schema;

// Related Models
var UserModel = require('./user');

// Schema and Model Setup
var userAccountSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: String,
	passwordHash: String,
	user: { type: Schema.Types.ObjectId, ref: 'User'}
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

// Exports
exports.UserAccount = UserAccount;
exports.createUserAccount = createUserAccount;
exports.createUserAndUserAccount = createUserAndUserAccount;
exports.saveUserAccount = saveUserAccount;