var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();
var transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'rgrang816@west-mec.org',
      pass: process.env.NODEMAILER_PASS,
    },
  })
);

const sendEmail = (target, subject, contents,base=baseEmail) => {
  var mailOptions = {
    from: 'rgrang816@west-mec.org',
    to: target,
    subject: subject,
    html: base.replace('swapOut',contents),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
  });
};
const sendBulkEmail = (targets,subject,contents,base=baseEmail) =>{
  targets.forEach((target)=>{sendEmail(target,subject,contents,baseEmail)})
}



const baseEmail=`
<html>
<head>
  <style>
    #body {
      text-decoration:none;
      list-style-type:none;
    }
    li{
      text-decoration:none;
      list-style-type:none;
      display:inline-block;
    }
  </style>
</head>
<body>
  <ul id='body'>
    swapOut
  </ul>
</body>
</html>`


// Define a function to create the email content
function sendTeacherEmail(programName, participants) {
  // Start with a header
  let emailContent = `<p>Hello [Instructor Name],</p>
    <p>Below is a list of participants who attended your [Program Name] program:</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>`;
  // Loop through the participants
  participants.forEach(participant => {
    // If the participant visited the program matching programName, add their details to the email
    if (participant.visitedProgram === programName) {
      emailContent += `
        <tr>
          <td>${participant.name}</td>
          <td>${participant.email}</td>
        </tr>`;
    }
  });
  // Add a footer
  emailContent += `
      </tbody>
    </table>
    <p>Thank you!</p>`;
  // Return the completed email content
  return emailContent;
}


module.exports = { sendEmail,sendBulkEmail,sendTeacherEmail};