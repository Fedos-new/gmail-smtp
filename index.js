const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: '', // generated ethereal password
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
        to: "fedluky@gmail.com", // list of receivers
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
