const { Thought, Reaction, User } = require('../models')

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find()
  
        res.json(thoughts);
      } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
      }
    },

    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOne({username: req.body.username})
        user.thoughts.push(thought._id)
        user.save()
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete(req.params.thoughtId);
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addReaction(req,res){
        try{
            const reaction = await Reaction.create(req.body)
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            thought.reactions.push(reaction)
            thought.save()
            res.status(200).json(reaction);
        }catch{
          res.status(500).json(err);
        }
      },

      async removeReaction(req,res){
        try{
          thought = await Thought.findOne({_id: req.params.thoughtId})
          reaction = await Reaction.findOneAndDelete({_id: req.body.reactionId})
          console.log(reaction)
          // remove reaction from thought
          thought.reactions.splice(thought.reactions.indexOf(reaction),1)
          thought.save()
          // remove reaction from reaction db
          res.status(200).json(reaction);
        }catch{
          res.status(500).json(err);
        }
      },

      async updateThought(req,res){
        try{
          const updatedThought = await req.body
          await Thought.findByIdAndUpdate(req.params.thoughtId, updatedThought)
          res.status(200).json(updatedThought)
        }catch{
          res.status(500).json(err);
        }
      }
  };
  