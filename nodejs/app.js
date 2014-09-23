
/*
@desc node.js   socket.io   推送示例
@see  socket.io  http://socket.io/#how-to-use  http://www.xiaocai.name/post/cf1f9_7b6507
@see  express http://express.jsbin.cn/api.html
*/



//var app = require("http").createServer(handler),
var app = require("express")(),
        server = require("http").createServer(app),
        io = require("socket.io").listen(server),
        fs = require("fs")

server.listen(1234)

//使用express
app.get("/", function(req, res){
        res.sendfile(__dirname + '/index.html');
});


/*
function handler(req, res) {
        fs.readFile(__dirname + '/index.html',
                function (err, data) {
                        if (err) {
                                res.writeHead(500);
                                return res.end('error loading index.html');
                        }

                        res.writeHead(200);
                        res.end(data);
                });
}
*/
var users = [];

io.sockets.on('connection', function(socket){

        users.push(socket);

        socket.on('login', function(data){
                io.sockets.emit("conn", data);
        });


        //推送消息 
        socket.on("pushMessage", function(data, fn){
                for (var i in users) {
                        users[i].emit('pullMessage', data);
                } 
                fn('发送成功');
        });

});
