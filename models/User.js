const {Schema, model} = require('mongoose')

const userSchema = new Schema({
username: {type: String, required: true, unique: true, trimmed: true},
email: {type: String, required: true, unique: true, trimmed: true},
thoughts: [
{
    type: Array,
    ref: "thought"
}
],
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
    ]
})

const User = model('user', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

module.exports = User;