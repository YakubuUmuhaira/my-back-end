const { findOneAndUpdate } = require("../models/traineeSchema");
const Trainee = require("../models/traineeSchema");

//adding a new trainee
const createTrainee = async (req, res) => {
  const newTrainee = new Trainee({
    name: req.body.name,
    destination: req.body.destination,
    email: req.body.email,
    dob: req.body.dob,
  });

  await newTrainee.save();
  res.status(201).json(newTrainee);
};
//get all trainees
const getAllTrainees = async (req, res) => {
  const trainees = await Trainee.find();
  res.json(trainees);
};

//get all trainees
const getSingleTrainee = async (req, res) => {
  const trainee = await Trainee.findById(req.params._id);
  res.json(trainee);
};

//update a trainee
const updateTrainee = async (req, res) => {
  const foundTrainee = await Trainee.findById(req.params._id);
  if (foundTrainee) {
    (foundTrainee.name = req.body.name),
      (foundTrainee.destination = req.body.destination),
      (foundTrainee.email = req.body.email),
      (foundTrainee.dob = req.body.dob);

    const updatedTrainee = await foundTrainee.save();
    res.json({ updatedTrainee: updatedTrainee });
  }
};

//delete a trainee
const deleteTrainee = async (req, res) => {
    const foundTrainee = await Trainee.findById(req.params._id)
    if (foundTrainee) {
        foundTrainee.remove()
        res.json({msg: `${foundTrainee.name} removed`});
    } else{
        res.status(404).json({error: "Trainee notfound"});
    }
}

module.exports = {
  createTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
};
