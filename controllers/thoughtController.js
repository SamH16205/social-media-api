const { Thought } = require('../models')

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
  };
  