//声明http变量
var http = require('http');
var fs=require('fs');
http.createServer(function(request,response){
/*    console.log(request.url);//获取路径
    console.log(request.method);//获取请求的方法名
    console.log(request.headers);//获取请求头*/
    getFile(request.url.slice(1),response);

    function getFile(filename,response){
        fs.readFile(filename,function(err,data){
            if(data==null||err){
                response.end("file undefind")
            }else{
                response.writeHead(200,
                    {
                        'Content-Length':data.length,
                        'Content-Type':getContentType(filename)+';charset="UTF-8"'
                    });
                response.write(data);
                response.end();
            }
        });
    }
    function getContentType(filename){
        if(filename.indexOf('.html')!=-1){//此处不能用filename.indexOf('.html')；
            return 'text/html'
        }else if(filename.indexOf('.css')!=-1){
            return 'text/css '
        }else if(filename.indexOf('.js')!=-1){
            return 'text/javascript '
        }
    }
}).listen(8080);//在对应的端口上实现监听