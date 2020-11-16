const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //스페이스(공간)을 없애주는 함수
    unique: 1 //중복방지
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { //관리자 혹은 유저의 위치 부여
    type: Number,
    default: 0
  },
  image: String,
  token: { //유효성 관리
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}
