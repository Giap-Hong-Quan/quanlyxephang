import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import router from './routes/index.js';
import { swaggerDocs } from './config/swagger.js';
import seedData from './config/seed.js';
import { errorHandle } from './middlewares/errorMiddleware.js';
// dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Gọi swagger
swaggerDocs(app);
app.use('/api',router);
app.use(errorHandle);
connectDB();
seedData();

const port=process.env.PORT || 5003;
app.listen(port,()=>{
    console.log(`Server chạy thành công với ${port}`);
})

