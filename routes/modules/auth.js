const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', {
  // 向 facebook 要求的資料
  scope: ['email', 'public_profile']
}))

// 傳回來的資料能順利登入 => request
// 若登入失敗，重新導向登入頁 
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router