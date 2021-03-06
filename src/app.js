const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');

//Handlebars configuration
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//Static directory configurations
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Dynamic Home page',
        name: 'Shaan',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Shaan',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Need Any Help. Contact Us -- Dynamically generated',
        title: 'Its help page',
        name: 'Shaan',
    });
});

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if(!address) {
        return res.send({
            error: 'Address is required'
        });
    }

    geocode(address, (err, {latitude, longitude, location} = {}) => {
        
        if(err) {
            return res.send({
                error: err,
            });
        }

        forecast(latitude, longitude, (err, response) => {
            
            if(err) {
                return res.send({
                    error: err,
                });
            }

            res.send({
                forecast: response,
                location,
                address,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Shaan',
        error: 'Help Thread Not Found. Kindly create a new thread',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Shaan',
        error: 'Page Not Found',
    });
});

app.listen(port, () => {
    console.log('Sever Started on port ' + port);
});