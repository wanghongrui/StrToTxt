const fs = require('fs')
const Koa = require('koa')
const cors = require('koa-cors')

const app = new Koa()
app.use(cors())

app.use(async(ctx)=>{
    if(ctx.url==='/' && ctx.method === 'GET'){
        ctx.body='<h1>post 谢谢</h1>'
    }else if(ctx.url==='/' && ctx.method === 'POST'){
        let pastData=await parsePostData(ctx)
        ctx.body=pastData
    }else{
        ctx.body='<h1>404!</h1>'
    }
})
 
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata=""
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.addListener("end",function(){
				fs.writeFileSync('text.json',postdata)
                resolve({name: '写入完成'})
            })
        }catch(error){
            reject(error)
        }
    })
}
 
app.listen(3000,()=>{
    console.log('success on port 3000')
})
