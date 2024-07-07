import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js'
import router from './routes/users.routes.js'
//.env contents - create on laptop
//PORT=9999
//MONGODB_URI=mongodb+srv://jtp0330:{password here}@cluster-dev-01.t4qf4hc.mongodb.net/?retryWrites=true&w=majority&appName=cluster-dev-01

const app = express()

app.use(express.json(),cors({
    origin: 'http://localhost:5173'
}))
dotenv.config();

app.use('/api', router);

const PORT = process.env.PORT;
dbConnect()
app.listen(PORT, () => 
    console.log(`Listening on port: ${PORT}`)
);