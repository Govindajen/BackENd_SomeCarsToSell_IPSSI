const Announce = require("../models/announceModel");

const createAnnounce = async (req, res) => {
    const authorId = req.user.id; 
    
    try {
      const newAnnounce = new Announce({
          ...req.body, 
          author: authorId, 
      });

      
      
      
      if (!newAnnounce.title || !newAnnounce.type || !newAnnounce.price || !newAnnounce.brand || !newAnnounce.model || !newAnnounce.km || !newAnnounce.year || !newAnnounce.description) {
          return res.status(400).send("Merci de remplir tous les champs");
        }
        
        await newAnnounce.save();
        
        
        res.status(201).send({ result: true, Announce: newAnnounce });
    } catch (error) {
        console.log(error.message)
      res.status(400).send({ error: error.message });
    }
  };

  const getAnnounces = async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.brand) {
        filter.brand = { $regex: req.query.brand, $options: "i" };
      }
      if (req.query.model) {
        filter.model = { $regex: req.query.model, $options: "i" }; 
      }
      if (req.query.year) {
        filter.year = req.query.year; 
      }
      if (req.query.id) {
        filter._id = req.query.id; 
      }
  

      const announces = await Announce.find(filter).populate("author", "username email");
  
      res.status(200).send(announces);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
const updateAnnounce = async (req, res) => {
    try {
        // Find the announcement by ID
        const announce = await Announce.findById(req.params.announceId);

        if(req.user.id !== announce.author.toString()) {
          return res.status(403).send({ error: "You are not authorized to update this announcement" });
        }
    
        if (!announce) {
          return res.status(404).send({ error: "Recette introuvable" });
        }
    
        // Check if the logged-in user (req.user) is the author of the announcement
        if (announce.author.toString() !== req.user.id) {
          return res.status(403).send({ error: "You are not authorized to update this announcement" });
        }
    
        // If the user is authorized, update the announcement
        const updatedAnnounce = await Announce.findByIdAndUpdate(
          req.params.announceId,
          req.body,
          {
            new: true, // Return the updated document
          }
        );
    
        res.status(200).json({ result: true, announce: updatedAnnounce});
    
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};


const deleteAnnounce = async (req, res) => {

  const authorId = req.user.id;
  console.log('delete')
  
  try {
    
    const announce = await Announce.findById(req.params.announceId);


    if (!announce) {
      return res.status(404).send({ error: "Recette not found" });
    }


    if (announce.author.toString() !== authorId) {
      return res.json({ result: false, error: "It's not your announce, you can't DELETE" });
    }

    if (announce.author.toString() === authorId) {
      
      const AnnounceToDelete = await Announce.findByIdAndDelete(req.params.announceId);
      if (!AnnounceToDelete) {
        return res.status(404).send({ error: "Announce not found" });
      }
      res.status(200).send({ result: true, message: "Announce deleted" });
    }


  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createAnnounce,
  getAnnounces,
  updateAnnounce,
  deleteAnnounce,
};
