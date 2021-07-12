// include express and express router
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')


// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name  // take "name" from req.body
  const todo = new Todo({ name })
  return todo.save() // store in database
    .then(() => res.redirect('/')) // finish creation, lead to index
    .catch(error => console.log(error))
})

// Read
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // seach by id
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body // catch the name of input
  return Todo.findById(id) // find data from mongoDB(module exported from todo.js)
    .then(todo => {  // if query successed, store data
      todo.name = name
      todo.isDone = isDone === 'on' // boolean return true or false
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) // if store successed, return index page
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove()) // remove the data
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router