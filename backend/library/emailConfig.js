const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hiranthathsara.official@gmail.com',
    pass: 'iqph bqbi yrbu blsi',
  },
});

module.exports = transporter;
