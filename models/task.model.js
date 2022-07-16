const { db, DataTypes } = require('../utils/database.util');

//create table

const Task = db.define('task', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allownull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allownull: false,
    },
    tittle: {
        type: DataTypes.STRING,
        allownull: false,        
    },
    limitDate: {
        type: DataTypes.DATE,
        allownull: false,
    },
    startDate:{
        type: DataTypes.DATE,
        allownull: false,
    },
    finishDate:{
        type: DataTypes.DATE,
        allownull: false,
    },
    status:{
        type: DataTypes.STRING,
        allownull: false,
        defaultValue: 'active',
    },
});

module.exports = { Task };