const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//proces.env.port dotyczy wylacznie dzialania na heroku
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    //next - co ma sie dziać gdy middelware sie zakonczy
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n');

   next();
})

// app.use((req, res) => {
//     res.render('bulding.hbs');
// })


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
    return text.toUpperCase();
});




app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Janusz',
        lastname: 'Skubisz',
        likes : [
            'zupa', 'Pieczenie'
        ]
    })
});

app.get('/about', (req,res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: "About Page",
        NAME: '12345',
        ID: '9999'
    });
});

app.get('/home', (req,res) => {
    res.render('home.hbs', {
        pageTitle: "Welcome Page",
        welcomeMessage: 'WItam serdecznie'
    })
});


app.get('/bad', (req,res) => {
    res.json({
        error: "Bad request"
    });
})

app.get('/private', (req, res) => {
    res.render('private.hbs', {
        pageTitle: "Portfolio welcome"
    })
});

app.listen(port, () => {
    console.log(`Serwer stoi se na porcie ${port}`);
});