import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import app from "./app.js";


dotenv.config({
    path: "./.env"
});


connectDb().then(() =>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
}).catch((err) =>{
    console.log("error in connecting DB",err);
});