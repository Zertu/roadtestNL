// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
const config = require("./config");
// Read more at http://twil.io/secure
const { accountSid, authToken, to, from } = config
const client = require("twilio")(accountSid, authToken);
module.exports = {
    call: function () {
        if (accountSid, authToken, to, from) {
            client.calls.create({
                url: "http://demo.twilio.com/docs/voice.xml",
                to,
                from,
            })
                .then(call => console.log(call.sid));
        } else {
            throw new Error('Invalid accountSid, authToken, to, from')
        }
    }
} 