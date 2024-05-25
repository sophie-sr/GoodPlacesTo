import bcrypt from 'bcrypt'

const localStrategy = require('passport-local')
.Strategy

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email,password,done) => {
        return done(null, false, {message: 'User does not exist'})
    }

    try {
        if (await.bcrypt.compare(password,user.password)) {
            return done(null,user)
        } else {
            return done(null, false, {message: 'Password incorrect'})
        }
    } catch (e) {
        return done(e)
    }
}