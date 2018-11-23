const Router = require('koa-router');
const token = 'test';
const crypto = require('crypto');
let router = new Router();

router.prefix('/');

/* 验证微信服务器 start */
/*router.get('/', (ctx, next) => {
    let query = ctx.query;
    console.log(query);
    let signature = query.signature;
    let timestamp = query.timestamp;
    let nonce = query.nonce;
    let echostr = query.echostr;

    let str = getSha1([token, timestamp, nonce].sort().join(''));
    if (str === signature) {
        ctx.body = echostr;
    } else {
        ctx.body = 'error';
    }
});

function getSha1(str) {
    let sha1 = crypto.createHash("sha1");
    sha1.update(str);
    return sha1.digest("hex");
}*/
/* 验证微信服务器 end */




module.exports = router;