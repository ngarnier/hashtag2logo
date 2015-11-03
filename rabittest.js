
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    var msg = {
    	lol:"dsds",
    	talk:"90"
    };

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
    console.log(" [x] Sent '%s'", JSON.stringify(msg));
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});