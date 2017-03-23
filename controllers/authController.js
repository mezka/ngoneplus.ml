var authController = {
  sendAuthFailed: function(req, res) {
      console.log(req.session);
      res.status(401).send('auth failed');
  },

  sendAuthSuccesful: function(req, res) {
      console.log(req.session);
      res.status(200).send(req.session.passport);
  },

  logout: function(req, res) {
      req.logout();
      res.status(200).send('logout successful');
  }
};


module.exports = authController;
