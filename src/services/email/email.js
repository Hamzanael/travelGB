const nodemailer = require('nodemailer')
const { email, password, targetEmail } = require('../../config/settings/email.settings')
const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: email,
        pass: password,
    },
    secure: true,
})
const mailData = {
    from: email,
    to: targetEmail,
    subject: 'New Customer wants to contact us',
    text: '',
    html: '',
}

function sendEmail(customer) {
    mailData.text = customer.subject
    mailData.html = 'Customer Name :' + customer.name + '<br>' + 'Customer email: ' + customer.email + ' <br>' + 'Message: ' + customer.message
    transporter.sendMail(mailData, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
}

module.exports = sendEmail