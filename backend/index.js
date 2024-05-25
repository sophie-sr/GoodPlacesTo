import express from 'express'
import bcrypt from 'bcrypt'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'

const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, user.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash: true
}));

