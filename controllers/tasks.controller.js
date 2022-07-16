
const { Task } = require('../models/task.model');

//utils

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');



const getAllTasks = catchAsync(async(req, res, next) => {
    const tasks = await Task.findAll();

    res.status(200).json({
        status: 'success',
        tasks,
    });
});

const createTask = catchAsync(async(req, res, next) => {
      const { userId, tittle, limitDate, startDate } =req.body;

      const newTask = await Task.create({
        userId,
        tittle,
        limitDate,
        startDate,
      });

      res.status(201).json({
        status: 'success',
        newTask,
    });
});


getTasksByStatus = catchAsync(async(req, res, next) =>{
    const { status } = req.params;

    const statusValid = ['active', 'completed', 'cancelled', 'late'];

    const isValid = statusValid.find(val => val === status)

    if(!isValid){
        return next(new AppError('The status is active, completed, late or cancellled', 400));
    }

    const tasks = await Task.findAll({ where: { status} });

    res.status(200).json({
        status: 'success',
        tasks,
    });
});

const updateTask = catchAsync(async (req, res, next) => {
    const { task } = req;
    const { finishDate } = req.body;

    const limitDateNum = new Date(task.limitDate).getTime();
    const finishDateNum = new Date(finishDate).getTime();
  
    const remainingTime = limitDateNum - finishDateNum;
  
    if (remainingTime > 0) {
      await task.update({ finishDate, status: 'completed' });
    } else if (remainingTime < 0) {
      await task.update({ finishDate, status: 'late' });
    }
  
    res.status(200).json({
      status: 'success',
      task,
    });
  });
  
  const deleteTask = catchAsync(async (req, res, next) => {
    const { task } = req;
  
    await task.update({ status: 'cancelled' });
  
    res.status(200).json({
      status: 'success',
    });
  });
  
  module.exports = {
    getAllTasks,
    createTask,
    getTasksByStatus,
    updateTask,
    deleteTask,
  }; 


