const authRoute = require('express').Router()
const userModel = require('../models/userModel.js');

// register is here
authRoute.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email: email });

        if (user) {
            return res.status(404).json({
                type: "email",
                message: "* Email id already exists"
            })
        }

        // password validation test cases
        // 1 - minLength - 8
        // 2 - one number
        // 3 - one special character
        if (password.length < 8) {
            return res.status(404).json({
                type: "password",
                message: "Must be 8 or more characters and contain at least 1 number and 1 special character."
            })
        }
        let specialCharacter = "!@#$%^&*~";
        let nums = "0123456789";
        let numValidate = 0, charValidate = 0;

        for (let i = 0; i < password.length; i++) {
            if (specialCharacter.includes(password[i])) {
                // console.log('special Char',password[i]);
                charValidate++
            }

            if (nums.includes(password[i])) {
                // console.log('num',password[i]);
                numValidate++
            }
        }

        if (numValidate>=1 && charValidate>=1) {
            user = await userModel.create(req.body);

            return res.status(201).json({
                message: "Registration succesfull!",
                email: email,
                password: password
            })
        }

        res.status(404).json({
            type: "password",
            message: "Must be 8 or more characters and contain at least 1 number and 1 special character."
        })

    } catch (error) {
        res.status(500).json({
            status: "Failed to register",
            error
        })
    }
})


// login is here

authRoute.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        // console.log('email',email);
        // console.log('password',password);
        let user = await userModel.findOne({ email : email});
        if(user===null){
            return res.status(404).json({
                type:"email",
                message:"* Please enter a valid email address."
            })
        }

        if(user.password!=password){
            return res.status(404).json({
                type:"password",
                message:"* Please enter valid password."
            })
        }

        res.status(201).json({
            message:"Login Successfull"
        })
    } catch (error) {
        res.status(500).json({
            status:"Failed to login!",
            error
        })
    }
})
module.exports = authRoute;