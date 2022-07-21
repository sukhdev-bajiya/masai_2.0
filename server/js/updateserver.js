app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  });
  
  app.listen(port);