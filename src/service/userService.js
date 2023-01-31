const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");

const saveUserService = async (firstName, lastName, email, password) => {
  
        let user = await User.findOne({ email });
        if (user) {
            return false;
        }

        user = new User({
            firstName, lastName, email, password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return true;

}

const loginUserService = async (email) => {
   
        let user = await User.findOne({ email });
        return user;

}

const getUserService = async (id) => {
    let user = await User.findById(id);
    return user;
}

module.exports = { saveUserService, loginUserService, getUserService };