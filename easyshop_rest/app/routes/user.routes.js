module.exports = app => {
    const User = require('../models/user.models')
    const passport = require('passport')
    const utils = require('../lib/utils')

    app.post('/login', function(req, res, data) {
        console.log('Login request: ' + JSON.stringify(req.body))
        User.findByUsername(req.body.username, function(err, user) {
            if (err) {
                res.status(401).json({ success: false, msg: `An error occured with details: ${req.body.username} ` })
            } else if (!user || user === undefined) {
                res.status(401).json({ success: false, msg: 'No user found' })
            } else {
                const isValid = utils.isValidPassword(req.body.password, user.current_password)
                if (isValid) {
                    console.log('/login: user: ' + JSON.stringify(user))
                    const tokenObject = utils.issueJWT(user)
                    res.status(200).json({
                        success: true,
                        token: tokenObject.token,
                        expiresIn: tokenObject.expires,
                        user_id: tokenObject.user_id,
                        full_name: tokenObject.full_name
                    })
                } else {
                    console.log('/login: login attempt failed')
                    res.status(401).json({ success: false, msg: 'Incorrect password' })
                }
            }
        })
    })

    app.post('/register', function(req, res, data) {
        console.log('Register request: ' + JSON.stringify(req.body))
        User.checkUserDetailsExist(req.body.username, function(err, data1) {
            if (err || (!data1 || data1 === undefined)) {
                console.log("User details check failed... cancelling registration. " + JSON.stringify(data1))
                res.status(401).json({ success: false, msg: `An error occured with details: ${req.body.username}`})
            } else {
                if (data.found_user === true) {
                    console.log("Register: user has been found, not creating user.")
                    res.status(401).json({ success: false, msg: 'User already exists' })
                } else {
                    // User doesn't exist, can create user...
                    User.insertUser(req.body, function(err2, data2) {
                        if (err2) {
                            res.status(401).json({ success: false, msg: 'Error during user creation' })
                        } else {
                            res.status(200).json({ success: true })
                        }
                    })
                }
            }
        })
    })
}