import express from 'express'
import bcrypt from 'bcrypt'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import dotenv from 'dotenv'

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

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async(res,req) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})


app.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
})