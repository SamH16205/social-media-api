const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
  updateThought
} = require('../../controllers/thoughtcontroller');

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

module.exports = router;