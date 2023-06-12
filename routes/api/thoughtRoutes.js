const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtcontroller');

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

module.exports = router;