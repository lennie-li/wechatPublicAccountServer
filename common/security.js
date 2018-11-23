const crypto = require('crypto');
const request = require('request');

//sha1加密
function getSha1(str) {
    let sha1 = crypto.createHash("sha1");
    sha1.update(str);
    return sha1.digest("hex");
}

//获取全局access_token
function getAccessToken(){
    return new Promise(function(resolve, reject){
        let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9e0a91f75d45e9a4&secret=4f2540128bca6e0ac2943bb823c2d85b';
        request(url,function(error, response, body){
            if(!error && response.statusCode === 200){
                body = JSON.parse(body);
                if(body.access_token && body.expires_in){
                    console.log(`刷新access_token成功:${body.access_token}`);
                    global.accessToken = body.access_token;
                    resolve();
                } else {
                    reject(body.errmsg);
                }
            } else {
                reject(error);
            }
        });
    });
}

/* jsSDK 认证 start */

//获取jsapi_ticket
function getJsapiTicket(){
    return new Promise((resolve, reject) => {
        let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${global.accessToken}&type=jsapi`;
        request(url,function(error, response, body){
            if(!error && response.statusCode === 200){
                body = JSON.parse(body);
                if(body.ticket && body.expires_in){
                    console.log(`刷新jsapi_ticket成功:${body.ticket}`);
                    global.jsapiTicket = body.ticket;
                    resolve();
                } else {
                    reject(body.errmsg);
                }
            } else {
                reject(error);
            }
        });
    });
}

//生成随机字符串
function getRandomStr(length=20){
    let res = '';
    let str = 'abcdefghijklmnopqretuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(let i = 0; i < length; i++){
        let random = Math.floor(Math.random() * length);
        res += str.charAt(random);
    }
    return res;
}

//后台生成签名
function getSignature(url){
    let noncestr = getRandomStr();
    let jsapi_ticket = global.jsapiTicket;
    let timestamp = +new Date();
    let data = {
        noncestr,
        jsapi_ticket,
        timestamp,
        url
    };
    let arr = ['noncestr','jsapi_ticket','timestamp','url'].sort();
    let res = '';
    arr.forEach(v => {
        res += `${v}=${data[v]}&`;
    });
    res = getSha1(res.slice(0,-1));
    return {
        signature:res,
        timestamp,
        noncestr
    }
}
/* jsSDK 认证 end */

async function getNecessary(){
    try{
        await getAccessToken();
    } catch (e){
        console.log(e);
    }
    try{
        await getJsapiTicket();
    } catch (e) {
        console.log(e);
    }
}
module.exports = {
    getAccessToken,
    getJsapiTicket,
    getSignature,
    getNecessary
};