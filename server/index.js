import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/index.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use("/api", router);

app.get("/", (_req, res) => {
    res.send("API Working...");
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URL;

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
});

mongoose.connect(uri)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.log("mongoDB connection failed: ", err.message));