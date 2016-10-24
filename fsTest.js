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

// open a file 
console.log(" --- going to Asynchronous open file ----")

fs.open("test.txt","r+",function(err,data){
	if(err){
		return console.error(err);
	}
	console.log("-- File opened successfully !: ");
});


console.log("---- going to get file information---");
fs.stat("test.txt",function(err,status){
	if(err){
		return console.error(err);
	}

	console.log(status);
	console.log('--- get file status successfully');

	// check file status
	console.log(" -- is file? "+ status.isFile());
	console.log(" -- is directory? "+ status.isDirectory());
});

console.log("====== Program end ======")

