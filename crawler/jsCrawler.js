var request=require('request');
var cheerio=require('cheerio');
var URL=require('url-parse');


var page="http://www.baidu.com";
console.log("Visiting page:"+page);
request(page,function(error,response,body){
    if(error){
        console.error("Error:"+error);
    }

    //check status code
    console.log("Status code:"+response.statusCode);
});
