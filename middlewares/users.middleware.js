const  { User} = require('../models/user.model');

//utils

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const userExist = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'active' }, });


    if(!user){
        return next(new AppError('User not exists', 404));
    }
    

    req.user = user;

    next();
});

module.exports = { userExist };



