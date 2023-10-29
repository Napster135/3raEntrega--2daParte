const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const config = require('./config')

sgMail.setApiKey(config.SENDGRID_API_KEY);

exports.sendEmail = async function (to, subject, text) {
  const mailOptions = {
    from: "victorpacheco119@gmail.com", 
    to,
    subject,
    text,
  };

  try {
    const result = await sgMail.send(mailOptions);
    console.log("Correo enviado correctamente:", result);
    return result;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
