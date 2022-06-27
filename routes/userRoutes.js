const jsonfile = require('jsonfile');

const file_path = "./DB/users.json";

module.exports = app => {
  app.get('/users', (req, res) => {
  console.log('fetching all users');
  // jsonfile reading
  jsonfile.readFile(file_path, function(err, content) {
    //send file contects back to sender
    res.send(content);
  });
});

// we want to keep the existing contents but add/push a single item. 
// Solvable by first reading the json, then adding the item, and at last writing it back to the file.
  app.post('/users/new', (req, res) => {
    let { email, username } = req.body;

    jsonfile.readFile(file_path, function(err, content) {
      content.push({ email, username });
      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });
      res.sendStatus(200);
    });
  });

  // Delete user by email
  // The contens object returned from reading the file is an array of user objects. 
  // So a simple loop ontop of that makes it possible to evaluate each object of the array individually. 
  // Evaluation of the object to remove is based on the email sent with the request. 
  // When a user object is found with the same email, javascript's pop() function come's in handy.
  app.delete('/users/destroy', (req, res) => {
    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {
      for (let i = content.length - 1; i>= 0; i--) {
        if (content[i].email === email) {
          console.log("removing" + content[i].email  + "from DB");
          content.pop(i);
        }
      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log('err: ', err);

      });
      res.sendStatus(200);
    });
  });

  // Put routes are to be used for updating a or multiple record/s from datastorage. 
  // Create an app.put route for updating an user.
  // The username to update the user with is sent through the request body, though, we send the email of the user we want to update as a query parameter. 
  // Looping over the contents of the json file we can find the user based on the given email, and update the username accordingly. 
  // To then write the newly updates content inside of the local json file.
  app.put('/user', (req, res) => {
    let user;
    let username = req.body.username;
    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {
          console.log("update user " + req.query.email + " has now username : " + username);

          user = content[i];
          user.username = username;
        }
      }
      jsonfile.writeFile(file_path, content, function(err) {
        console.log('err: ', err);

      });
    });
    res.send(user);
  });

  // a route that returns a specific user based on their email
  app.get('/user', (req, res) => {
    let user;
    let email = req.query.email;

    jsonfile.readFile(file_path, function(err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("found user" + content[i]);
          console.log(content[i]);
          user = content[i];
        }
      }
      res.send(user);
    });
  });
};
