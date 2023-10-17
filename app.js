import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('歡迎來到首頁')
})

app.listen(3535, () => console.log('正在聆聽伺服器 port: 3535'))