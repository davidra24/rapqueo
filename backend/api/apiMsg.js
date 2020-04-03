require('dotenv/config');
const msgClient = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendMsg = (req, res) => {
  const { to, body } = req.body;
  msgClient.messages
    .create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${to}`,
      body
    })
    .then(result => {
      console.log(result.accountSid);
      res.send(result);
    });
};

module.exports = { sendMsg };
