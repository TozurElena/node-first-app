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
};
