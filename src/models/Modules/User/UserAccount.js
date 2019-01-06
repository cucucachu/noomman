/* 
 Mongoose Schema and Model Functions
 Model: User Account
 Description: Holds the email, hashed password and other information for a user of Public Square.
*/

// MongoDB and Mongoose Setup
var mongoose = require('mongoose');
var database = require('../../database');
var Schema = mongoose.Schema;

// Related Models
var User = require('./User');

// Schema and Model Setup
var UserAccountSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: {
		type: String,
		validate: {
			validator: function(value) {
				return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value);
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

var UserAccount = mongoose.model('UserAccount', UserAccountSchema);

//Methods 

// Create Method
var create = function() {
	return new UserAccount({
		_id: new mongoose.Types.ObjectId()
	});
}

var createUserAndUserAccount = function() {
	var newUser = User.create();
	var newUserAccount = create();

	newUser.userAccount = newUserAccount._id;
	newUserAccount.user = newUser._id;

	return {
		user: newUser,
		userAccount: newUserAccount
	};
}

// Save
var save = function(userAccount, errorMessage, successMessasge){
	return new Promise(function(resolve, reject) {
		userAccount.save(function(err, newUserAccount){
			if (err) {
				// if (errorMessage != null)
				// 	console.log(errorMessage);
				reject(err);
			}
			else {
				// if (successMessasge != null)
				// 	console.log(successMessasge);
				resolve(userAccount);
			}
		});
	});
}

var saveUserAndUserAccount = function(user, userAccount) {
	return new Promise(function(resolve, reject) {
		user.validate().then(
			function() {
				userAccount.validate().then(
					function() {
						User.save(user).then(
							function() {
								save(userAccount).then(
									function() {
										resolve(true);
									},
									function(err) {
										reject(err);
									}
								);
							},
							function(err) {
								reject(err);
							}
						);
					},
					function(err) {
						reject(err);
					}
				);
			},
			function(err) {
				reject(err);
			}
		);

	});
}

// Comparison Methods

// This is a member comparison, not an instance comparison. i.e. two separate instances can be equal if their members are equal.
var compare = function(userAccount1, userAccount2) {
	var match = true;
	var message = '';

	if (userAccount1.email != userAccount2.email) {
		match = false;
		message += 'emails do not match. ' + userAccount1.email +' != ' + userAccount2.email + '\n';
	}
	
	if (userAccount1.passwordHash != userAccount2.passwordHash) {
		match = false;
		message += 'passwordHashs do not match. ' + userAccount1.passwordHash +' != ' + userAccount2.passwordHash + '\n';
	}
	
	if (userAccount1.user != userAccount2.user){
		match = false;
		message += 'Users do not match. ' + userAccount1.user +' != ' + userAccount2.user + '\n';
	}
	
	if (match)
		message = 'User Acounts Match';

	return {
		match: match, 
		message: message
	};
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
exports.Model = UserAccount;
exports.create = create;
exports.createUserAndUserAccount = createUserAndUserAccount;
exports.save = save;
exports.saveUserAndUserAccount = saveUserAndUserAccount;
exports.compare = compare;
exports.clear = clear;