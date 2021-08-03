// include express and express router
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Todo = require('../../models/todo')

// index
router.get('/index', (req, res) => {
  Todo.find() // find data from database
    .lean()  // transfer data into js
    .sort({ _id: 'asc' }) // ascending data into the database
    .then(todos => res.render('index', { todos })) // render template
    .catch(error => console.log(error)) // show the error
})

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // 找出id一樣的資料，比對資料和user
  // findOne不會轉換id & _id，只有findById才會自動轉換
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body // catch the name of input
  return Todo.findOne({ _id, userId }) // find data from mongoDB(module exported from todo.js)
    .then(todo => {  // if query successed, store data
      todo.name = name
      todo.isDone = isDone === 'on' // boolean return true or false
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`)) // if store successed, return index page
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove()) // remove the data
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router