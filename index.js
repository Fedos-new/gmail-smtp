const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.yandex.ru",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {

    let {name, email, subject, message} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'MY PORTFOLIO SITE', // sender address
        to: "fedluky@gmail.com", // list of receivers  smtp.yandex.ru
        subject: "Письмо от HR", // Subject line
        // text: "Привет, это проверочное письмо!!! С созданного тобой сервера", // plain text body
        html: `<b>Сообщение с вашего portfolio page</b>
   <p>name: ${name}</p>
   <p>email: ${email}</p>
   <p>subject: ${subject}</p>
   <p>message: ${message}</p> `, // html body
    });

    res.send("Ok")
})


let port = process.env.PORT || 3010

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
