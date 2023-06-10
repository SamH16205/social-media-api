const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true, ref: "user"},
   },{timestamps: true})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true, ref: "user"},
    reactions: [reactionSchema]
    },{timestamps: true})
    
    const Thought = model('thought', thoughtSchema);

    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
      });

    module.exports = Thought;