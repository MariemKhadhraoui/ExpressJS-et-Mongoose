const express = require("express");
const { getAllContact, addContact, deleteContact, updateContact } = require("../controllers/contact");
const router = express.Router();

router.get("/", getAllContact);
router.post("/add", addContact);
router.delete("/delete/:id",deleteContact )
router.put("/update/:id",updateContact);


module.exports = router;
