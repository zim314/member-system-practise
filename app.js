import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import member from './models/member.js';
import bcrypt from 'bcrypt';

const app = express();
const saltRounds = 12;

mongoose
    .connect('mongodb://127.0.0.1:27017/memberSystem')
    .then(() => console.log('以連接到mongodb'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('home'));

app.get('/create', (req, res) => res.render('create'));

app.post('/create', async (req, res) => {
    try {   
        const { email, password, username, age } = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newMember = new member({email, password: hashPassword, username, age});
        newMember.save();
        res.send('新增完成');
    } catch { console.log('create錯誤') }
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const databaseUser = await member.findOne({email}).exec();
        if( !databaseUser ) {
            res.send('您尚未註冊');
        } else {
            const rightPassword = await bcrypt.compare(password, databaseUser.password);
            if(rightPassword) {
                res.send('登入成功');
            } else {
                res.send('密碼錯誤');
            }
        }
    } catch {  console.log('login錯誤') };
});

app.get('/info', (req, res) => res.render('info'));

app.listen(3535, () => console.log('正在聆聽伺服器 port: 3535'));