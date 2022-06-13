import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from "mongoose";


import { apiRoutes } from './src/api/apiHelper.js';



const app = express()
const port = 3008
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
// initDatabase()
apiRoutes(app)

mongoose.connect('mongodb://localhost:27017/paymentDB',(err)=>
{
  if(!err)
  {
    console.log("DB Conntected")
  }
  else
  {
    console.log("DB Not Connetected")
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))