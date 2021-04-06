const User = require('../models/user');
const Category = require('../models/category');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer');
// const sendgridTransport=require('nodemailer-sendgrid-transport');
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config();

// const emailVar=;
// const passVar=;
// console.log("email",,"password",)

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
let mailOptions = {
    from: 'priyeshpandeyy@gmail.com',
    to: 'priyeshpandeyy@gmail.com',
    subject: 'hello world!',
    text: 'hello world!'
};



const handleErrors = (err) => {
    let errors = { email: '', password: '' }

    console.log(err.message, "Hello there", err.code)
    // return err.message

    //handle errors
    if (err.message === 'incorrect email') {
        errors.email = ' email is not registered'
    }
    //incorrect passsword
    if (err.message === 'incorrect password') {
        errors.password = ' password is incorrect'
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors;
    }


    if (err.message.includes('user validation failed')) {
        // console.log("Happend")
        // Object.values(err.errors).forEach(({ properties }) => {
        //     console.log("path",properties.path,"message",properties.message)
        //     errors[properties.path] = properties.message;

        // })
        return err.message
    }

    return errors;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'priyesh pandey auth', {
        expiresIn: maxAge
    });
}

module.exports.get_dropdown = async (req, res) => {
    try {
        const drop = await Category.find();
        // console.log("consol",drop)
        res.status(200).json(drop)
    } catch (err) {
        res.status(400).json(err)
    }
}



module.exports.admin_check = async (req, res) => {
    const email = req.params.email;
    // console.log("Email",email)
    const user = await User.find({ email });
    // console.log("is something else",user[0].role)
    const tokenvalue = createToken(user._id);
    const token = jwt.sign(tokenvalue, 'Hello world');
    // console.log('Token value',token)
    res.header('auth-token', token)
    res.status(200).json(user)

}
module.exports.get_all_details = async (req, res) => {

    console.log("Search value", req.query.search)

    try {
        const user = await User.find()
            .populate("category")

        // console.log(user)
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }

}






module.exports.signup_post = async (req, res) => {

    const { fullname, email, password, role, category } = req.body;
    // console.log('Signup body',req.body)
    try {
        const user = await User.create({ fullname, email, password, role, category });
        const drop = await Category.find();
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(400).json({ err })

    }
}
module.exports.delete_item = async (req, res) => {
    const id = req.params.id;
    // console.log("id",id)
    try {
        const user = await User.deleteOne({ _id: id });
        // console.log(user)
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.reset_Password = async (req, res) => {
    const { confirmPassword, currentPassword, newPassword } = req.body;
    console.log(confirmPassword, currentPassword, newPassword, req.params.id)
    // res.send("Hello there")
    if (!confirmPassword || !currentPassword || !newPassword) {
        return res.status(400).send("Please field cannot be empty")
    }
    const salt = await bcrypt.genSalt();
    const updatedPassword = await bcrypt.hash(newPassword, salt)
    // console.log(!(confirmPassword === newPassword));
    if (!(confirmPassword === newPassword)) return res.status(400).send("Please Enter same password")
    console.log("Checking", confirmPassword == newPassword)
    if (confirmPassword == newPassword) {
        const user = await User.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {

                const user = await User.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
                res.status(200).send("Password Updated")
            }
            catch (err) {
                res.status(400).send({ err })
            }
        } else {
            res.status(400).send("Password dosen't match")
        }
    }
    else {
        res.status(400).send("Something went wron")
    }
}


module.exports.login_post = async (req, res) => {
    const { email, password, role, active } = req.body;

    try {
        const user = await User.login(email, password, role, active);
        console.log(process.env.SEND_GRID)

        const tokenvalue = createToken(user._id);
        const token = jwt.sign(tokenvalue, 'Hello world');
        // console.log('Token value',token)
        // sgMail.setApiKey(process.env.SEND_GRID)
        res.header('auth-token', token)
        res.status(200).json({ role: user.role, user: user._id, active: user.active })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }

}







module.exports.user_item = async (req, res) => {
    const id = req.params.id;
    // console.log("it is id",id)
    try {
        const user = await User.findById(id)
            .populate("category")
        // console.log(user)
        res.json(user)
        // res.status(200).json(user);
    } catch (err) {
        // console.log(err)
    }
}
// module.exports.admin_get=async (req,res)=>{
//         try{
//             const admindata=
//         }
// }
module.exports.update_item = async (req, res) => {

    try {
        console.log("happening..")
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email, password: req.body.password } })
        console.log(updateUser)
    } catch (err) {
        console.log("happening.. error")
        res.status(400).send(err)
        console.log(err)
    }
}
module.exports.userupdate_item = async (req, res) => {
    console.log(req.body.email)
    console.log(req.params.id)
    console.log(req.body.category)
    try {
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email, fullname: req.body.fullname, category: req.body.category } })
            .populate("category")
        console.log(upateUser)
        const user = await User.findById({ _id: req.params.id })
            .populate("category")
        res.status(200).json({ user })
    } catch (err) {

        // console.log("happening...")
        // res.status(400).json({ err })
        console.log(err)
        res.status(400).send({ err })
        // console.log(err)
    }
    // if (validator.isEmail(req.body.email)) {
    //     try {
    //     } catch (err) {
    //     }
    // }
}
module.exports.filter_data = async (req, res) => {
    // console.log(req.params.category)
    try {
        const user = await User.find({ category: req.params.category })
            .populate("category")
        res.status(200).json(user)
        // console.log(user)   
    } catch (err) {
        // console.log(err)
    }

}
module.exports.active = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { active: true } })
        res.status(200).json(updateUser)
    } catch (err) {
        res.send(err)
    }

}
module.exports.deactive = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { active: false } })
        res.status(200).json(updateUser)
    } catch (err) {
        res.send(err)
    }

}





module.exports.forgot_password = async (req, res) => {
    // const user=new User
    // res.send("Done")
    console.log("Email id", req.body.email)
    // console.log(process.env.EMAIL)
    // res.json(res.body)
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user.active===false)
                {
                    return res.status(422).json({error:"User not exist with that email..."})
                }
                if (!user) {
                    return res.status(422).json({ error: "User dont exist with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save()
                    .then((result) => {
                        transporter.sendMail({
                            to: user.email,
                            from: process.env.EMAIL,
                            subject: "Reset Password",
                            html: `<p>Click the link below to Reset your password</p>
                    <span>Link will expire in 1 hour</span>
                    <a href="http://localhost:3000/set-password/${token}">Click<a/>`
                        })
                        res.json({ message: "Check your email" })
                    }).catch(err => res.status(400).send('Error'))
            })
    })


}
module.exports.update_Password = async (req, res) => {
    console.log("Request body", req.body)
    const newPassword = req.body.value.newpassword;
    const confirmPassword = req.body.value.confirmpassword;
    const sentToken = req.body.token;
    console.log("present", sentToken)
    const salt = await bcrypt.genSalt();
    if (!newPassword || !confirmPassword) {
        return res.status(400).send("Password filed cannot be empty")
    }
    if (newPassword !== confirmPassword) {
        res.status(400).send("Password dosen't match")
    }
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            console.log("Forgot Password", user)
            if (!user) {
                return res.status(422).send("Try again session expired")
            }
            if (newPassword === confirmPassword && newPassword.length > 0) {
                if (newPassword.length > 6) {
                    bcrypt.hash(newPassword, salt)
                    .then(hashedpassword => {
                        console.log("updatedhashed", hashedpassword)
                        User.updateOne({ _id: user._id }, { $set: { password: hashedpassword, resetToken: undefined, expireToken: undefined } })
                            .then(result => res.status(200).send("Password Updated Successfully.."))
                            .catch(err => {
                                console.log(error)
                                res.status(400).send("Try again..!!")
                            })
                    }).catch(err => res.status(400).send("Please check the password field.."))
                }
                else {
                    res.status(400).send("Password length must be at least 6 character..")
                }
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({ err })
        })

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}





function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports.search_Result = async (req, res) => {
    const pal = req.params.search;
    console.log("pal", pal.length)
    console.log(req.params.search);
    if (req.params.search) {
        const regex = new RegExp(escapeRegex(req.params.search), 'gi');
        console.log("regular expression", regex)
        User.find({ fullname: regex })
            .populate("category")
            .then(result => {
                console.log(result)
                res.send(result)
            })
    } else {
        const user = User.find().populate("category")
        res.status(200).json(user);
        console.log("other way around")
    }
}

