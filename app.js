import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import member from './models/member.js';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();
const saltRounds = 12;
const verifyUser = (req, res, next) => req.session.verified? next() : res.redirect('/login');

mongoose
    .connect('mongodb://127.0.0.1:27017/memberSystem')
    .then(() => console.log('以連接到mongodb'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'banana',
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }, 
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => res.render('home'));

app.get('/create', (_, res) => res.render('create'));

app.post('/create', async (req, res) => {
    try {   
        const { email, password, username, age } = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newMember = new member({email, password: hashPassword, username, age});
        newMember.save();
        res.send('新增完成');
    } catch { console.log('create錯誤') };
});

app.get('/login', (_, res) => res.render('login'));

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const databaseUser = await member.findOne({ email }).exec();
        if(!databaseUser) return res.send('您尚未註冊');

        const isPasswordCorrect = await bcrypt.compare(password, databaseUser.password);
        if(!isPasswordCorrect) return res.send('密碼錯誤');

        req.session.verified = email;
        res.redirect('/info');
    } catch {  console.log('login錯誤') };
});

app.get('/info',  verifyUser, async (req, res) => {
    const memberInfo = await member.findOne({ email: req.session.verified }).exec();
    res.render('info', { memberInfo })
});

app.listen(3535, () => console.log('正在聆聽伺服器 port: 3535'));