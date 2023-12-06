const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const app = express();

// connect to mongoDB
dbURI = 'mongodb+srv://goodnessudk:newblog@blog-project.gmkhmtm.mongodb.net/blog-project?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(result => {app.listen(3000)
        console.log('connected to db')})
    .catch(err => {console.log(err)})

// register view engine
app.set('view engine', 'ejs');

// MIDDLEWARES
// express middleware for rendering static files in browser
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}));

// logger middleware
app.use(morgan('dev'));


// ROUTES
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
});

// blog routes
app.use(blogRoutes);

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'} )
});
