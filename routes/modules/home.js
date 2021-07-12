// include express and express router
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find() // find data from database
    .lean()  // transfer data into js
    .sort({ _id: 'asc' }) // ascending data into the database
    .then(todos => res.render('index', { todos })) // render template
    .catch(error => console.log(error)) // show the error
})

module.exports = router