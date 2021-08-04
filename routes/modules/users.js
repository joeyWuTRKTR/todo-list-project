const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功')
  res.redirect('/users/login')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符!' })
  }
  // 如果出現註冊錯誤
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
      if (user) { // 該郵箱已註冊
        errors.push({ message: '該帳號已經註冊' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }// 該郵箱尚未被註冊，寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
  })
})

module.exports = router