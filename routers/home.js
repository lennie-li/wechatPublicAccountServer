const Router = require('koa-router');
let router = new Router();
const {getAccessToken, getJsapiTicket, getSignature, getNecessary} = require('../common/security');

router.prefix('/home');

//返回前端申请微信jsSKD权限所需的签名
router.post('/getJsSDK', (ctx, next) => {
    let url = ctx.request.body.url;
    console.log(ctx.request.body);
    let res;
    if(url){
        res = getSignature(url);
        console.log(res);
        ctx.body = res;
    }
});


module.exports = router;