import * as cheerio from 'cheerio';
import * as https from 'https';
console.log('------start--------')

let op = {
    host: 'sttrackandtrace.startrack.com.au',
    path: '/?txtConsignmentNumber=AOQCAPG001',
    method: 'GET',
    port: 443,
    headers: {},
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
};
let data: string[];
let req = https.request(op, (response) => {
    response.setEncoding('utf8')
    if ( response.statusCode === 200) {
        response.on('data', (chunk:string)=>{
            data.push(chunk)
        }).on('end', ()=>{
            let body=data.toString();
            console.log('-------body:',body)
        }).on('error', (err)=>{
            console.error('--------error:',err)
        })

    }
})
req.end();
console.log('--------end--------')
