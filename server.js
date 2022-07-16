const { app } = require('./app');

//models
const { User } =require('./models/user.model');
const { Task } =require('./models/task.model');

//utils

const { db } =require('./utils/database.util');

db.authenticate()
    .then(() => console.log('DB authenticated'))
    .catch(err => console.log(err));



//stablish model´s relations
User.hasMany(Task, {foreignKey: 'userId'});
Task.belongsTo(User);


db.sync()
    .then(() => console.log('DB synced'))
    .catch(err => console.log(err));

app.listen(4001, () =>{
    console.log('Express are running!!');
});



