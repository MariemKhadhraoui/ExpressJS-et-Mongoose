const express = require("express");
const router = express.Router();
const fs = require('fs');



//lister tout les produits
router.get("/", function (req, res, next) {
    try {
     const product = fs.readFileSync('products.json', 'utf-8');

      res.status(200).json(
        JSON.parse(product)
      );
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  // list un seul produit
  router.get('/:id', function(req,res,next){
    const _id = req.params.id.toUpperCase();
    try {
        const data = fs.readFileSync('products.json', 'utf-8');
        const products = JSON.parse(data);
        
        const product = products[_id];


        if (product) {
            res.status(200).json(product);
        } else {
           res.status(404).json({ message: error.message}); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message});  
    }
});

// Affiche le prix total pour qt fois le prix du produit id.
router.get('/:id/:qt', function(req,res,next){
    const _id = req.params.id.toUpperCase();
    const qt = parseInt(req.params.qt);

    try {
        const data = fs.readFileSync('products.json', 'utf-8');
        const products = JSON.parse(data);

        const product = products[_id];

        if (product) {
            const total = product.price * qt;
            res.status(200).json({ product, total});
        }
        else{
            res.status(404).json({ message: error.message});  
        }

    } catch (error) {
        res.status(500).json({ message: error.message});  
    }
});

module.exports = router;