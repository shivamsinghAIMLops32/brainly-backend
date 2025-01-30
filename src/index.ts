import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.config';
const app = express();

dotenv.config();

app.use(express.json());
app.post('/api/v1/signup',(req, res) => {

});

app.post('/api/v1/signin',(req, res) => {});

app.post('/api/v1/content',(req,res)=>{});
app.get('/api/v1/content',(req,res)=>{});
app.delete('/api/v1/content',(req,res)=>{});
app.post('/api/v1/brain/share',(req,res)=>{});
app.get('/api/v1/brain/:shareLink',(req,res)=>{});

const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);

})