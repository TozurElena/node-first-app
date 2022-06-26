const jsonfile = require('jsonfile');

module.exports = app => {
  app.get('/users', (req, res) => {
  console.log('fetching all users');
  // jsonfile reading
  jsonfile.readFile('./DB/users.json', function(err, content) {
    //send file contects back to sender
    res.send(content);
  });
  
});
}
