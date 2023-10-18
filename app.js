import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import member from './models/member.js';

mongoose
    .connect('mongodb://127.0.0.1:27017/memberSystem')
    .then(() => console.log('以連接到mongodb'));

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.render('home'));

app.get('/create', (req, res) => res.render('create'));

app.post('/create', (req, res) => {
    try {   
        const {email, password, username, age} = req.body;
        const newMember = new member({email, password, username, age});
        newMember.save();
        res.send('新增完成');
    } catch (e) { console.log('create錯誤', e) }
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
})

app.listen(3535, () => console.log('正在聆聽伺服器 port: 3535'));