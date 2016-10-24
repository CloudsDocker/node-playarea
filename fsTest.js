var fs=require('fs');

fs.readFile('hello.js', function(err,data){
	console.log("=========  start to read the file content Asynchronous=============")

	if(err){
		return console.error(err);
	}
	console.log("Asynchronous read:"+data.toString());

	console.log("=========  Done of read the file content Asynchronous=============")
});	


// synchroous read
var data =fs.readFileSync('hello.js');


console.log("---------  start to read the file content Synnchronous  ----------");
console.log("Synchrously read file: " + data.toString());

console.log("====== Program end ======")