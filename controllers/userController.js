const {User} = require('../models');
const { findByIdAndUpdate } = require('../models/User');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find()
          // .populate({ path: 'tags', select: '-__v' });
  
        res.json(users);
      } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
      }
    },
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          // .populate({ path: 'tags', select: '-__v' });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete(req.params.userId);
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async addFollower(req, res){
      try{
        const user = await User.findOne({ _id: req.params.userId })
        user.friends.push(req.params.friendId)
        res.status(200).json(user);
        user.save()
      }catch{
        res.status(500).json(err);
      }
    },

    async removeFollower(req, res){
      try{
        const user = await User.findOne({ _id: req.params.userId })
        user.friends.splice(user.friends.indexOf(req.params.friendId),1)
        res.status(200).json(user);
        user.save()
      }catch{
        res.status(500).json(err);
      }
    },

    async updateUser(req,res){
      try{
        const updatedUser = await req.body
        await User.findByIdAndUpdate(req.params.userId, updatedUser)
        res.status(200).json(updatedUser)
      }catch{
        res.status(500).json(err);
      }
    }
      }