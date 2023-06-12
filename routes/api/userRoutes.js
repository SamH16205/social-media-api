const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  deleteUser,
  addFollower,
  removeFollower,
  updateUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

router.route('/:userId/friends/:friendId').post(addFollower).delete(removeFollower)

module.exports = router;