const db = require("../model/index")
const Todo = db.todo

exports.createTodo = async (req, res, next) => {
    try {
        const createdTodo = await Todo.create(req.body)
        res.status(201).json(createdTodo)
    } catch (err) {
        next(err)
    }
}

exports.getTodos = async (req, res, next) => {
    try {
        const foundTodos = await Todo.findAll()
        res.status(200).json(foundTodos)
    } catch (err) {
        next(err)

    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findByPk(req.params.id)
        if (!todo) {
            res.status(404).send()
        }
        res.status(200).json(todo)
    } catch (err) {
        next(err)
    }
}