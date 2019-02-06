const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

//Get the connection to Heroku Database
let db = require('./sql_conn.js');

//We use this create the SHA256 hash
const crypto = require("crypto");
const nodemailer = require("nodemailer");
function sendEmail(from, receiver, subj, message) {
  //research nodemailer for sending email from node.
  // https://nodemailer.com/about/
  // https://www.w3schools.com/nodejs/nodejs_email.asp
  //create a burner gmail account
  //make sure you add the password to the environmental variables
  //similar to the DATABASE_URL and PHISH_DOT_NET_KEY (later section of the lab)

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
           user: 'andyburner787@gmail.com',
           pass: EMAIL_PASSWORD
       }
   });

   let mailOptions = {
    from: from, // sender address
    to: receiver, // list of receivers
    subject: subj, // Subject line
    html: message // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
        console.log('Email sent: ' + message);
        console.log(err)       
    } else {
        console.log('Email not sent');
        console.log(info);    
    }
 });

  //fake sending an email for now. Post a message to logs.
}
/**
 * Method to get a salted hash.
 * We put this in its own method to keep consistency
 * @param {string} pw the password to hash
 * @param {string} salt the salt to use when hashing
 */
function getHash(pw, salt) {
    return crypto.createHash("sha256").update(pw + salt).digest("hex");
}



module.exports = {
    db, getHash, sendEmail
};