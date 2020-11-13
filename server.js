// Backend server

// Node packages, frameworks and modules stored in variables
// Requiring Express framework
const app = require('express')()
// Requiring Node-fetch module to use the fetch() function
const fetch = require('node-fetch');
// Requiring Cors middleware for Express
const cors = require('cors');
// Requiring Dotenv module that loads environment variables from 
// a .env file into process. Used to hide the API key so it's not accessable on GitHub
const dotenv = require('dotenv').config();
// Storing the port in a variable
const port = 3000


// Telling the app/Express to use Cors
app.use(cors())


// The HTTP request GET. To get books API.
app.get('/books', (req, res) => {
    // Variable for the API key which is defined in the .env file
    const apiKey = process.env.API_KEY;
    // Variable for the request query to add the search string to the url in the fetch.
    const query = req.query.q || "";
    // Variable for the request query to add the "order by" to the url in the fetch so it's possible to choose the order.
    const orderBy = req.query.orderBy || "relevance";
    // Fetching the API. Fetch() method returns a promise.
    fetch(`https://www.googleapis.com/books/v1/volumes?key=${apiKey}&orderBy=${orderBy}&maxResults=20&q=${query}`)
    // Then() methods to handle the promise. The promise will resolve into a response object
    .then(r=>{  
        // Return json method to handle the respective type of data.
        return r.json()
    })
    // Sending the data back to the client.
    .then(function(d){
        console.log(d);
        res.send(d);
    })    
})

// The HTTP request GET.
app.get('/', (req, res) => {
    res.send('default route')
  })

// Listen method creates a listener on the specified port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
