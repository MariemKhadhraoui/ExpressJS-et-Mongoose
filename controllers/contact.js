const { default: mongoose } = require("mongoose");
const contactModel = require("../models/contact");

// GET ALL CONTACT
const getAllContact = async (req, res, next) => {
  try {
    const contacts = await contactModel.find();
    if (!contacts || contacts.length == 0) {
      throw new Error("contacts not found");
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//ADD CONTACT
const addContact = async (req, res, next) => {
  //cette ligne de code permet de stocker les données envoyées par le client
  //dans une variable nommée "contact", qui peut ensuite être utilisée pour manipuler ces données dans le reste du code de l'application.
  const contact = req.body;
  const newContact = contactModel(contact);

  try {
    //le mot-clé "await" est utilisé pour gérer de manière synchrone des opérations asynchrones en JavaScript, en permettant à une fonction asynchrone d'attendre la résolution d'une promesse avant de continuer son exécution.
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE CONTACT
const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("no contact whith that id");
    }
    await contactModel.findByIdAndDelete(id);
    res.status(200).json({ message: "contact deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//UPDATE CONTACT
const updateContact = async (req, res, next) => {
  // extraire la valeur de la propriété "id" de l'objet "params" de la requête "req" et
  // de la stocker dans une nouvelle variable "_id"
  const { id: _id } = req.params;
    const contact = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("no contact with that id");
    //la méthode "findByIdAndUpdate()" fournie par la bibliothèque Mongoose
    //{...contact,_id} syntaxe de déconstruction d'objet pour étendre les valeurs de l'objet "contact" avec l'identifiant "_id" et les passer en tant que nouvel objet de valeurs pour la mise à jour.
    const updatedContact = await contactModel.findByIdAndUpdate(
      _id,
      { ...contact, _id },
      { new: true }
    );
    res.status(200).json(updatedContact);
    // "{new: true}" indique à la méthode de renvoyer le document mis
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllContact,
  addContact,
  deleteContact,
  updateContact,
};
