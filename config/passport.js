const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 1. Middleware 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 2. Strategy
  // usernameField => 把驗證username 改為驗證 email
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // 找不到使用者
        if (!user) {
          return done(null, false, { message: 'Email is not registered!' })
        }
        // 找到使用者，但是密碼錯誤
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        // 成功登入
        return done(null, user)
      })
      .catch(err => console.log(err))
  }))

  // 3. Sessions: serialize & deserialize => 節省 session 空間
  // 序列化 => 用使用者資料查id
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
  })
  // 反序列化 => 用id查使用者資料
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean() // 物件可能傳進前端樣板，因此把資料庫物件轉換成JavaScript原生物件
      .then(user => done(null, user))
      .catch(err => done(err, null)) // null表示user is empty
  })
}