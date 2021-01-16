const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
	    type: String,
	    required: true
	},
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        console.log(salt)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
    } catch (error){
        next(error)
    }
})

module.exports = User = mongoose.model("Users", UserSchema);
