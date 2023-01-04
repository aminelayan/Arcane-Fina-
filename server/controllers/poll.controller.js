const {Polls} = require("../models/poll.model");

module.exports.createQuestion = (req,res) =>{
  const {question,choice1,choice2,choice3,choice4,user,userName} = req.body
  Polls.create({question,choice1,choice2,choice3,choice4,user,userName})
  .then(data => res.status(201).json(data))
  .catch(err => res.status(500).json(err))
}


module.exports.getAllPolls = (request, response) => {
  Polls.find({})
    .then((allPolls) => response.json(allPolls))
    .catch((err) => response.json(err));
};

module.exports.findPoll = (request, response) => {
  Polls.findOne({ _id: request.params.id })
    .then((onePoll) =>
      response.json( onePoll )
    )
    .catch((err) =>
      response.json({ message: "Something went wrong", error: err })
    );
};

module.exports.updatePoll = (request, response) => {
  Polls.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    { new: true }
  )
   .then((updatedpoll) => res.json(updatedpoll))
   .catch(err => response.status(400).json(err))
}

module.exports.deletePoll = (request, response) => {
  Polls.deleteOne({ _id: request.params.id })
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))

}