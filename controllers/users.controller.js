
//models
const { User } =require('../models/user.model');

//utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const getAllUsers = catchAsync(async (req, res, next) =>{
    const users = await User.findAll({
        attributes: { exclude: ['password']},
    });

    res.status(200).json({
        status: 'success',
        users,
    });
});

const createUser = catchAsync(async(req, res, next) =>{
    const { name, email, password, status } = req.body;

    const newUser= await User.create({
        name, 
        email,
        password,
        status,
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser,
    });
});

const getUserById = catchAsync(async( req, res, next ) =>{
    const {user} = req;

    res.status(200).json({
        user,
    });
});


const updateUser = catchAsync(async(req, res, next) =>{
    const { user }  = req;   
    const { name } = req.body;

    await user.update({ name });

    res.status(200).json({status: 'success'});
});


const deleteUser = catchAsync(async(req, res, next) =>{
    const { user } = req;

    await user.update({
        status : 'deleted',
    });

    res.status(204).json({status : 'success'});
});


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};