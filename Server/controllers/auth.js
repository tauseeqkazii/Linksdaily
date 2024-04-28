import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken'
import nanoid from 'nanoid'
import mailchimp from '@mailchimp/mailchimp_marketing'

require('dotenv').config()

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input data
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Invalid input data' })
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' })
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password)
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save()

    // Create a signed JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    // Return token and user data
    return res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    // Create a signed JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    // Return token and user data
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Signin error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Generate reset code
    const resetCode = nanoid.nanoid(5).toUpperCase()
    user.resetCode = resetCode
    await user.save()

    // Update Mailchimp list member with reset code
    const listId = process.env.MAILCHIMP_LIST_ID
    const subscriberHash = mailchimp.utils.md5(email.toLowerCase())
    const mergeFields = { RESET_CODE: resetCode }
    await mailchimp.lists.updateListMember(listId, subscriberHash, {
      merge_fields: mergeFields,
    })

    // Prepare email data and send email (You need to configure email sending)
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password reset code',
      html: `<h1>Your password reset code is: ${resetCode}</h1>`,
    }
    // Send email code goes here...

    return res.json({ ok: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body

    // Find user by email and reset code
    const user = await User.findOne({ email, resetCode })
    if (!user) {
      return res.status(404).json({ error: 'Email or reset code is invalid' })
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    // Hash the new password and save it
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    user.resetCode = ''
    await user.save()

    return res.json({ ok: true })
  } catch (error) {
    console.error('Reset password error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}






























































// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
// const { hashPassword, comparePassword } = require('../helpers/auth')
// const nanoid = require('nanoid')
// // sendgrid
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_KEY)

// exports.signup = async (req, res) => {
//   console.log('HIT SIGNUP')
//   try {
//     // validation
//     const { name, email, password } = req.body
//     if (!name) {
//       return res.json({
//         error: 'Name is required',
//       })
//     }
//     if (!email) {
//       return res.json({
//         error: 'Email is required',
//       })
//     }
//     if (!password || password.length < 6) {
//       return res.json({
//         error: 'Password is required and should be 6 characters long',
//       })
//     }
//     const exist = await User.findOne({ email })
//     if (exist) {
//       return res.json({
//         error: 'Email is taken',
//       })
//     }
//     // hash password
//     const hashedPassword = await hashPassword(password)

//     try {
//       const user = await new User({
//         name,
//         email,
//         password: hashedPassword,
//       }).save()

//       // create signed token
//       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       })

//       //   console.log(user);
//       const { password, ...rest } = user._doc
//       return res.json({
//         token,
//         user: rest,
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// exports.signin = async (req, res) => {
//   // console.log(req.body);
//   try {
//     const { email, password } = req.body
//     // check if our db has user with that email
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.json({
//         error: 'No user found',
//       })
//     }
//     // check password
//     const match = await comparePassword(password, user.password)
//     if (!match) {
//       return res.json({
//         error: 'Wrong password',
//       })
//     }
//     // create signed token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     })

//     user.password = undefined
//     user.secret = undefined
//     res.json({
//       token,
//       user,
//     })
//   } catch (err) {
//     console.log(err)
//     return res.status(400).send('Error. Try again.')
//   }
// }

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body
//   // find user by email
//   const user = await User.findOne({ email })
//   console.log('USER ===> ', user)
//   if (!user) {
//     return res.json({ error: 'User not found' })
//   }
//   // generate code
//   const resetCode = nanoid(5).toUpperCase()
//   // save to db
//   user.resetCode = resetCode
//   user.save()
//   // prepare email
//   const emailData = {
//     from: process.env.EMAIL_FROM,
//     to: user.email,
//     subject: 'Password reset code',
//     html: '<h1>Your password  reset code is: {resetCode}</h1>',
//   }
//   // send email
//   try {
//     const data = await sgMail.send(emailData)
//     console.log(data)
//     res.json({ ok: true })
//   } catch (err) {
//     console.log(err)
//     res.json({ ok: false })
//   }
// }

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, password, resetCode } = req.body
//     // find user based on email and resetCode
//     const user = await User.findOne({ email, resetCode })
//     // if user not found
//     if (!user) {
//       return res.json({ error: 'Email or reset code is invalid' })
//     }
//     // if password is short
//     if (!password || password.length < 6) {
//       return res.json({
//         error: 'Password is required and should be 6 characters long',
//       })
//     }
//     // hash password
//     const hashedPassword = await hashPassword(password)
//     user.password = hashedPassword
//     user.resetCode = ''
//     user.save()
//     return res.json({ ok: true })
//   } catch (err) {
//     console.log(err)
//   }
// }





