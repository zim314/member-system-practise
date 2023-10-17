import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017').then(() => console.log('以連接到mongodb'))

const app = express()


app.get('/', (req, res) => {
    res.send('歡迎來到首頁')
})

app.listen(3535, () => console.log('正在聆聽伺服器 port: 3535'))