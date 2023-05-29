require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index")
const cors = require("cors")

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());


app.use(express.json());

app.use("/",route);

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        app.listen(PORT,()=>{
            console.log(`Server starting on ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}
start()