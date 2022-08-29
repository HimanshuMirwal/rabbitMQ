const amqp = require("amqplib/callback_api");
function Send(DATATOSEND)
{
    // 1. Connect ampq to rabbitMQ server.
    amqp.connect("amqp://localhost",(connErr, connect)=>{
    if(connErr){
        throw connErr
    }
    
    // 2. Create a channel.
    connect.createChannel((channelError,channel)=>{
        if(channelError){
            throw channelError
        }

        const QUEUE = "users";

        // 3. Create a queue.
        channel.assertQueue(QUEUE);
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(DATATOSEND)));
        console.log("data added to queue ,"+QUEUE)
    })
})
}
module.exports={Send}