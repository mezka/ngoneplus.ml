var authController = {
  sendAuthFailed: function(req, res) {
      res.status(401).send({message: 'Authentication failed'});
  },

  sendAuthSuccesful: function(req, res) {
      console.log(req.session);
      res.status(200).send(req.session.passport);
  },

  logout: function(req, res) {
      req.logout();
      res.status(200).send({message: 'Logout successful'});
  },

  authorize: function(req, res, next){

    console.log(req.session);
    
    if(!req.session.passport){
      res.status(401).send({message: 'Authorization failed'});
    }else {
      next();
    }
  },
};


module.exports = authController;
