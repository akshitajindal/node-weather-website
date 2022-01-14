const path = require('path')
const express = require('express')
// express is actually a function as opposed to an object
// we call the function to create a new express application.
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express() //it takes no arguments

// now we configure our server by using various methods provided on the application itself.

//let's say we have a domain app.com - we'll probably show them the home page
// but we have other pages as well like app.com/about or app.com/help
// we have one domain app.com and we run everything on a single express server.
// what we have setup are multiple routes. We have the root route, we have /help, /about, etc.
// we set our server to send a response when someone tries to get something at a specific route.
// we set that up using a method on app. i.e. app.get
// it sends back html or json
//it takes 2 arguments. The first is the route (partial url) and a function.
// the fucntion describes what to send back
// the function gets called with 2 arguments. A request and a response.
// req contains info about the incoming request to the server.
// res contains a bunch of methods allowing us to customize what we're going to send back to the requester. 
// if we leave the 1st argument (the path) as an empty string then that means that we're requesting the root url.


//hbs - library
//handlebars - module
//set allows us to setup the value for a given express setting.
//it takes 2 arguments-
//1. key - the setting name
//2. value - the value we wanna set for the setting
//we have to take care that the argumnets follow the case and space conventions.
app.set('view engine', 'hbs') //this line sets handlebars
// it expects all of our handlebar templates to live in a specific folder. 'views' folder here.


//node provides us with 2 variables-
//console.log(__dirname) //path to the directory the current script lives in
//console.log(__filename) //path to the files itself
//console.log(path.join(__dirname, '../public')) // '../' makes us go back a folder, and through the web-server directory, we enter the public directory

const publicDirectoryPath = path.join(__dirname, '../public')

//this is if we create a templates directory instead of a views directory
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//this is to speacify the path for partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//app.use id a way to customize the server
//this serves as the file displayed by the root of our project. 
// index.html is displayed when the path is empty. Hence we can safely remove the app.get() for an empty path.
app.use(express.static(publicDirectoryPath)) //static takes the path to the folder we want to serve up


//to use the handlebars template we'll make an app.get call
app.get('', (req, res) => {
    //res.send('Hello express!')  //allows us to send something back
    //res.send('<h1>Hello express!</h1>') //passing html

    res.render('index', {
        title: 'Weather',
        name: 'Akshita Jindal'
    }) 
    //we don't need the file extension here. Only the name should match up with one of the existing templates.
    // the first argument is the template name, the second argument is an object
})
//remove the index.html file from public dir to get the desired template.


app.get('/help', (req, res) => {
    //res.send('Help page')
    //send back json
    /*res.send({
        name: 'Andrew',
        age: 27
    })*/
    //we can also send back array of objects
    /*res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }])*/
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akshita Jindal'
    })
})

app.get('/about', (req, res) => {
    //res.send('About')
    //res.send('<h1>About</h1>')
    res.render('about', {
        title: 'About Me',
        name: 'Akshita Jindal'
    })
})

app.get('/weather', (req, res) => {
    //res.send('Your weather')
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

    /*res.send({
        focecast: 'It is snowing',
        location: 'Philadelphia',
        address: address
    })*/
})

app.get('/products', (req, res) => {

    if(!req.query.search) {  //run this only when there is no search term
        return res.send({
            error: 'You must provide a search term'
        })  //by using return, we stop the function execution as soon as the response is sent.
    }

    //console.log(req.query)
    //console.log(req.query.search) //if search is a variable in the query string, then we get it's value

    res.send({
        products: []
    })
})

//this is when we are at an extension of the help url. i.e. any page after the help page.
//If that page doesn't exists, then we get the below response.
app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Akshita Jindal',
        errorMessage: 'Help article not found.'
    })
})

//this app.get request is for displaying the 404 page. 
//this should be the last app.get request, and just before starting up the server.
// express looks for matches from top to bottom. That is the reason this app.get req needs to be the last.
// the * in the url means match anything that hasn't been matched so far.
app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Akshita Jindal',
        errorMessage: 'Page not found.'
    })
})


//now we start the server up.
// to start the server we use the method listen on app. It will only be used once in aur whole application.
//app.listen(3000)  //3000 is the port number. We provide this for our local environment.
// the listen method also has an optional argument of a callback function. That callback function will run when the server is up and running.
// the process of starting up a server is a asynchronous process. Tho it almost happens instantly. 

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})