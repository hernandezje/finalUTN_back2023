const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const { saveUserService, loginUserService, getUserService } = require("../service/userService");
const User = require("../model/user");

const saveUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
        let user = await saveUserService(firstName, lastName, email, password);

        if (!user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        } else {
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload,"secret",{expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }

}

const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        let user = await loginUserService(email);
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }

}

const getUserController = async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await getUserService(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  
}

module.exports = { saveUserController, loginUserController, getUserController } 