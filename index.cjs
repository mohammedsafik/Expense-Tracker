console.log("HELLO")

const expess=require('express')

const app=expess()
app.get('/',(request,response)=>{
  response.send(("VANAKAM"),)
})
app.get('/java',(request,response)=>{
  response.send(("JAVA"),)
})

app.listen(9999)