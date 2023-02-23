var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

        res.status(200).json("hello contacts")

  });

  var express = require('express');
  const contact = require('../models/contact');
  var router = express.Router();
  
  router.get('/', function(req, res, next) {
    contact.find(
      (err, contacts) => {
      res.status(200).json(contacts);
    })
          
  
    });
   

    router.post('/', function(req, res, next) {
        new Contact({
        FullName : req.body.FullName,
        Phone : req.body.Phone
        })
        .save(
        (err,newcontact)=>{
        if (err)
        console.log("error message :" +err); 
        else{
        console.log(newcontact);

        res.json(" : Contact " + newcontact._id +" added");
        res.status(200).end();
        }
        })
    });
    


module.exports = router;