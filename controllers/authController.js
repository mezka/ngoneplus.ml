var dbController = require('./dbController.js');

var authController = {
  sendAuthFailed: function(req, res) {
      console.log(req.session);
      res.status(401).send();
  },

  sendAuthSuccesful: function(req, res) {
      console.log(req.session.passport.user);
      res.status(200).send(req.session.passport);
  },

  logout: function(req, res) {
      req.logout();
      res.redirect('home');
  }
};


module.exports = authController;
