
exports = module.exports = function (app, mongoose) {

    'use strict';
    const validator = require('validator');
    const mongooseAutoInc = require('mongoose-auto-increment');

    var Schema = mongoose.Schema;

    var User = new Schema({
        employeeId: {
            type: Number
        },
        firstName: {
            type: String,
            minlength: 3,
        },
        lastName: {
            type: String,
            minlength: 3,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
        phoneNumber: {
            type: String,
            minlength: 10,
            // unique: true
        },
        imageUrl: {
            type: String,
        },
        role: {
            type: String,
        },
        companyAddress: {
            type: String,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        password: {
            type: String
        },
        isEmailVerified: {
            type: Boolean
        },

        createdDate: {
            type: Date,
            default: Date.now
        },
        updatedDate: {
            type: Date,
            default: Date.now
        },
        emailVerificationToken: {
            type: String,
        },
    });
    User.plugin(mongooseAutoInc.plugin, { model: 'User', field: 'employeeId', startAt: 1, })
    app.db.model('User', User);

}