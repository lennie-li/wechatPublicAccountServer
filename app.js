const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
global.accessToken = '';
global.jsapiTicket = '';




let app = new Koa();
app.use(bodyParser({enableTypes:['json','form','text']}));

//routers
const index = require('./routers/index');
const home = require('./routers/home');


app.use(index.routes(),index.allowedMethods());
app.use(home.routes(),home.allowedMethods());

//static
app.use(serve(__dirname + '/static'));


const security = require('./common/security');
security.getNecessary();




// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

module.exports = app;


