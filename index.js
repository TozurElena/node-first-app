const express     = require('express');

// initialise express() inside of your app variable
const app = express();

// import route modules and pass your app
require("./routes/userRoutes")(app);  

// choose what port on which to run the server
const PORT = 5000;

// use the app variable and listen on the port
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server running`);
  console.log('Hello');
});