var http=require('http')
http.createServer(function(req,res){
  res.writeHead(200,{'content-type':'text/plain'});
  res.end('Hello world\n');
}).listen(8090,'127.0.0.1');
console.log('server running at http://127.0.0.1');
