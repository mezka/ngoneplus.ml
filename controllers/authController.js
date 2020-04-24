var authController = {
  sendAuthFailed: function(req, res) {
      res.status(401).send({message: req.session.messages[0]});
  },

  sendAuthSuccesful: function(req, res) {
      res.status(200).send(req.session.passport);
  },

  logout: function(req, res) {
      req.logout();
      res.status(200).send({message: 'Logout successful'});
  },

  authorize: function(req, res, next){
    if(!req.session.passport){
      res.status(401).send({message: 'Authorization failed'});
    }else {
      next();
    }
  },
};


module.exports = authController;
