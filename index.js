import express from 'express'
import bcrypt from 'bcrypt'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import dotenv from 'dotenv'
import passport from 'passport'
import initialize from './user-config.js'


if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: '.env' });
}

const app = express()
const users = []


initialize (
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.use("/styles",express.static("/views"));

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport. initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login',  (req, res) => {
    res.render('login.ejs')
});

app.get('/home', (req, res) => {
    res.render('index.ejs')
});

app.get('/waterFountains', (req, res) => {
    res.render('waterFountains.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async(req, res) => {
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


app.delete('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

app.post('/waterFountains', (req, res, next) => {
    console.log("1");
    const request = req.body;
    console.log("2");
    let sushi = request.rate1;

    console.log(request); //returns 'on'

    res.redirect('/waterFountains');

})

function checkAuthenticated (req,res,next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated (req,res,next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});