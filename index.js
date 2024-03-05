//importing requirements
const mongoose=require('mongoose')
const express=require('express')
const   {Expense} =require('./schema.js')
const bodyparser=require('body-parser')
const cors=require('cors')

//creating app
console.log("hello")
const app=express()
app.use(bodyparser.json())
app.use(cors())


//connection to database
async function connectdb(){
    try{
        await mongoose.connect('mongodb+srv://mohammedsafik:safi123@atlascluster.c8pcsid.mongodb.net/EXPENSETRACKER?retryWrites=true&w=majority&appName=AtlasCluster')
    console.log("DB CONNECTED")
    const port=process.env.PORT || 8000
    app.listen(port,()=>{
    console.log(`listening on port ${port}`)
    })
    }
    catch(error){
        console.log(error)
        console.log("NOT CONNECTED")
    }
}
connectdb()



//adding details
app.post('/add',async(request,response)=>{
    // console.log(request.body)
    // response.json({
    //     "status":"created"
    // })
   try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(200).json({
        "status":"successful"
    })
   }
   catch(error){
    console.log(error)
    response.status(404).json({
        "status":"unsuccessful"
    })
   }
})



//display the data
app.get('/get-expense',async(request,response)=>{
   try{
     const data=await Expense.find()
     console.log(data)
     response.json({
        "status":"successful",
         "data":data
       })
    //  response.status(200).json(data)
     
   }
   catch(error){
   response.json({
    "status":"unsuccessful"
   })
   }
    //localhost:8000/delete/65e69de1413ce2c12bef04c9
})



//deleting the data
 app.delete('/delete/:id',async(request,respone)=>{
  try{
    const data=await Expense.findById(request.params.id)
    // console.log(data) 
    if(data){
     await Expense.findByIdAndDelete(request.params.id)
     respone.status(200).json({
        "status":"deleted"
     })
     console.log("DELETED")
    }
    else{
        respone.status(404).json({
            "status":"failed",
            "message":"file not found"
        })
    }
  }
  catch(error){
    respone.status(500).json({
        "status":"Error Occured"
    })
  }
 })



//editing the data
app.patch('/edit/:id',async(request,response)=>{
    try{
     const data=await Expense.findById(request.params.id)
     if(data){
        await data.updateOne({
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.data
        })
        response.status(200).json({
            "status":"success"
        })
     }
    else{
        response.status(404).json({
            "status":"failed"
        })
    }
    }
    catch(error){
        console.log("ERROR")
    }
})