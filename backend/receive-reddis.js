const amqp = require("amqplib/callback_api");
const nodemailer = require('nodemailer');
const modelEmailUSer = require("./models/emailUser");

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
 function Receive() {   
    amqp.connect("amqp://localhost",  (connErr, connect) => {
        if (connErr) {
            throw connErr
        }
         connect.createChannel( (channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            const arrayData = [];
            const QUEUE = "users";
            channel.assertQueue(QUEUE);

            channel.consume(QUEUE, (msg) => {
                const { email, subject, description, _id } = JSON.parse(msg.content.toString())._doc
                console.log("this is from rabbit consumer ",JSON.parse(msg.content.toString())._doc);
                let mailDetails = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: subject,
                    text: description
                };
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log("Error while sending email ",err);
                        modelEmailUSer.find({_id:new Object(_id)}).then(value=>{
                            value[0].response=err;
                            value[0].save()
                            .then(val=>console.log("ERRor while sending but value updated"))
                            .catch(Err=>console.log(Err))
                        }).catch(Err=>console.log("Err from receice-rabbit while updating, ",Err))
                    
                    } else {
                        console.log(data.response);
                        modelEmailUSer.find({_id:new Object(_id)}).then(value=>{
                            value[0].response=data.response;
                            value[0].save()
                            .then(val=>console.log("value updated"))
                            .catch(Err=>console.log(Err))
                        }).catch(Err=>console.log("Err from receice-rabbit while updating, ",Err))
                    }
                });
            },{
                noAck:true
            })
        })
    })
}
module.exports = { Receive };