/**
 * Created by Mr.yang on 2017/3/7.
 */
var fs=require('fs');
var http=require('http');
var url = require('url');
var server=http.createServer();
var fale=false;
server.on('request',function(request,response){

    request.on('data',function(data){
        console.log(data.toString())

        //var uesrname = data.toString().split('&')[0].split('=');
        //var password = data.toString().split('&')[1].split('=');
        //if(uesrname[1]=='pingfang'&& password[1]=='123'){
        //    console.log('true')
        //    fale=true;
        //}else{
        //    fale=false;
        //    console.log('false')
        //}
    })
    //if(fale){
    //    response.writeHead(302,{
    //        //location:'http://localhost:63342/myInspinia2/index.html#/index/main'
    //    })
    //}else{
    //    response.writeHead(302,{
    //        //location:'http://localhost:63342/myInspinia2/index.html#/login'
    //    })
    //}
    response.end();
    //var urlPath = url.parse(req.url).pathname;
    // if(urlPath === '/jsonp'){
    //    res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    //          var data = {
    //                "name": "Monkey"
    //            };
    //    data = JSON.stringify(data);
    //    var callback = 'test'+'('+data+');';
    //    res.end(callback);
    // }
    // else{
    //     res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    //     res.end('Hell World\n');
    //  }
})
server.listen(8088,'127.0.0.1',function(){
    console.log('服务器启动在8088')
})