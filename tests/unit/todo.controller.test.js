const todoController = require('../../controller/todo.controller')
const httpMocks = require('node-mocks-http')
const db = require('../../model')
const todo = db.todo
const newTodo = require('../mock-data/new-todo.json')
const allTodos = require('../mock-data/all-todos.json')

todo.create = jest.fn()
todo.findAll = jest.fn()
todo.findByPk = jest.fn()

let req, res, next
beforeEach(function () {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe("todoController.getTodoById", function () {
    it("should have a getTodoById function", function () {
        expect(typeof todoController.getTodoById).toBe('function')
    })
    it("should call the getTodoById function", function () {
        req.params.id = '1'
        todoController.getTodoById(req, res, next)
        expect(todo.findByPk).toBeCalledWith('1')
    })
    it("should return 200 response and todo object", async function () {
        todo.findByPk.mockReturnValue(newTodo)
        await todoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })
    it("should handle error", async function () {
        const errorMessage = {message: "error in finding by id"}
        const rejectedPromise = Promise.reject(errorMessage)
        todo.findByPk.mockReturnValue(rejectedPromise)
        await todoController.getTodoById(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
    it("shoud return statusCode 404", async function () {
        todo.findByPk.mockReturnValue(null)
        await todoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe('todoController.getTodos', () => {
    it('should have getTodos method', () => {
        expect(typeof todoController.getTodos).toBe('function')
    })

    it("should call todo.getTodos function", () => {
        todoController.getTodos(req, res, next)
        expect(todo.findAll).toBeCalledWith()
    })

    it('should return 200 response code and all todos', async () => {
        todo.findAll.mockReturnValue(allTodos)
        await todoController.getTodos(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })

    it("it should handle error", async () => {
        const errorMessage = {message: "Data not found"}
        const rejectedPromise = Promise.reject(errorMessage)
        todo.findAll.mockReturnValue(rejectedPromise)
        await todoController.getTodos(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

})

describe("todoController.createTodo", () => {
    beforeEach(() => {
        req.body = newTodo
    })

    it("should have createTodo function", () => {
        expect(typeof todoController.createTodo).toBe("function")
    })

    it("should call todo.create function", () => {
        todoController.createTodo(req, res, next)
        expect(todo.create).toBeCalledWith(newTodo)
    })

    it("should return 201 response code", async () => {
        await todoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it("should return json body in response", async () => {
        todo.create.mockReturnValue(newTodo)
        await todoController.createTodo(req, res, next)
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it("should handle error", async () => {
        const errorMessage = {message: "Done property missing"}
        const rejectPromise = Promise.reject(errorMessage)
        todo.create.mockReturnValue(rejectPromise)
        await todoController.createTodo(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})