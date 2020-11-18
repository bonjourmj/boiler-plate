const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');


// 서버에서 정보를 분석해서 가져옴
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World!')),

// 회원가입을 위한 라우트
app.post('/register', (req, res) => {

  // 회원가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 디비에 넣어준다

  const user = new User(req.body)

  // MongoDB에서 오는 메소드
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))