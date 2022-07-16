const express = require('express');

const { userExist } = require('../middlewares/users.middleware');

//controllers
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);

router
  .route('/:id')
  .get(userExist, getUserById)
  .patch(userExist, updateUser)
  .delete(userExist, deleteUser);

module.exports = { usersRouter: router };