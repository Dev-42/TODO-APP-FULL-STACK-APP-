const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    id : {type : Number , required : true},
    task : {type: String , required : true},
    completed : {type : Boolean , required : true}
})

const TodoModel = mongoose.model('todo' , TodoSchema)

module.exports = {TodoModel}
