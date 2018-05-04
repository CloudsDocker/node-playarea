import * as https from 'https';
import * as querystring from 'querystring';
import { request } from 'https';
import * as fs from 'fs';

console.log('--------- start -----------')
let clients: TestClient[]
let clickableParties: TestParty[] = [];
let allClientIds: string[]
let streamData: any[] = [];
let TestpartyIDs: string[] = [];
const postData = querystring.stringify({
    client_id: 'xxxxxx', //SIT
    grant_type: 'password',
    username: '11111',
    password: '22222',
    scope: 'xxxx'
});

let options = {
    host: `sit.xxx.com`,
    port: 443,
    path: `/abc/v1/oauth2/token`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
}

let access_token: string = '';
let req = request(options, function (rsp) {
    rsp.setEncoding('utf8');
    rsp.on('data', (chunk) => {
        streamData.push(chunk);
    })
        .on('end', () => {
            let body = streamData.toString();
            access_token = JSON.parse(body).access_token || '';
            getClients(access_token);
        })
        .on('error', (e) => { })
});
req.write(postData);
req.end();


function getParties(token: string): string[] {
    let op_get = getRequestOp(token);
    let accounts: string[] = ['111', '222', '333', '444', '555', '666', '77'];
    let accountsIDs: string[] = [];
    accounts.forEach(account => {


        const path = `/api/app1/channel/v1/accounts/${account}/Other/endpoint?param1=value1`
        op_get.path = path;
        let streamData2: string[] = [];
        let request_get = request(op_get, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk: string) => {
                streamData2.push(chunk)
            })
                .on('end', () => {
                    let body = streamData2.toString();
                    let parties: TestParty[] = JSON.parse(body).data || [];

                    clickableParties.concat(parties.filter((item: TestParty) => (allClientIds || []).indexOf(item.contactId) > -1) || [])
                    console.log(parties.map(Testparty => Testparty.contactId));
                    accountsIDs.concat(parties.map(Testparty => Testparty.contactId));

                })
                .on('error', (e) => {
                })
        })
        request_get.end();
    })

    return accountsIDs;
}

function getClientsFromDisk() {
    fs.readFile('./clients.json', 'utf8', (err, data) => {
        let clientsJson: TestClient[] = JSON.parse(data).data;
        allClientIds = clientsJson.map((item) => item.contactId);
    })
}


function getClients(token: string) {
    let op_get = getRequestOp(token);
    const path = '/api/app1/channel/v1/endpoints1?param1=value1'
    op_get.path = path;
    let streamData: string[] = [];
    let body222 = '';
    let request_get = request(op_get, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
            if (chunk) {
                streamData.push(chunk)
                body222 += chunk;
                fs.appendFile('./rawDataOfFile.txt', chunk + '\n', err => console.error('----error during write line:', err));
            }
        })
            .on('end', () => {
                let body = streamData.toString();
                fs.writeFile('./allClients.json', body, (err) => {
                })
                let clients: TestClient[] = JSON.parse(body222).data || [];
                allClientIds = clients.map(item => item.contactId);
                getParties(token);
            })
            .on('error', (e) => {
            })
    })
    request_get.end();
}

function getRequestOp(token: string) {
    return {
        host: 'sit.xxx.com',
        port: 443,
        path: ``,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }
}

interface TestParty {
    contactId: string,
    firstName: string
}

interface TestClient {
    contactId: string,
    contactName: string
}
console.log('--------- done -----------')
