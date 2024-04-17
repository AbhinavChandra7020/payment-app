const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://abhinavchandra:wquHZFha1cDrFqPr@learningdb.dkmrapz.mongodb.net/paytm")

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const bankAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
})

const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", bankAccountSchema)

module.exports = {
    User,
    Account
}
