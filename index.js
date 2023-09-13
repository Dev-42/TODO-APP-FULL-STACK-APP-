const express = require('express')
const {connection} = require('./db')
const {TodoModel} = require('./Todo.model')

const app = express()
app.use(express.json())

// Todo application Routes
// 1) Get application route
app.get('/' , async(req,res) => {
    const dataDB = await TodoModel.find(req.query)
    res.send({dataDB})
    // res.send("End")
})
//2) Post application routes
app.post('/' , async(req,res) => {
    const{id,task,completed} = req.body

    const todo = new TodoModel({
        id : id,
        task : task,
        completed : completed
    })
    try{
        await todo.save()
        const todos = await TodoModel.find()
        res.send({todos})
    }catch(error){
        res.status(500).send("Error saving the todo")
    }
})

// 3) Put application route

app.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const payload = req.body;

    try {
        const todo = await TodoModel.findByIdAndUpdate(userId, payload, { new: true });
        // Use { new: true } to return the updated document
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.send({ todo });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating the todo");
    }
});

// 4) Delete application route

app.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const todo = await TodoModel.findByIdAndDelete(userId);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.send({ todo });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting the todo");
    }
});



app.listen(8080, async() => {
    try{
        await connection
        console.log("Connected to DB successfully")
    }catch(e){
        console.log("Error connecting to DB")
        console.log(e)
    }
    console.log("Server started successfully")
})