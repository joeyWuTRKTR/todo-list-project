const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then(user => {
      if (user) { // 該郵箱已註冊
        console.log('This account is already registed!')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else { // 該郵箱尚未被註冊，寫入資料庫
        console.log('this user is not registed yet!')
        return User.create({
          name,
          email,
          password
        })
      }
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router