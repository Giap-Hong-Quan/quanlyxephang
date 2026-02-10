import 'dotenv/config';
import express from 'express';
import http from "http";
import cors from 'cors';
import { connectDB } from './config/db.js';
import router from './routes/index.js';
import { swaggerDocs } from './config/swagger.js';
import seedData from './config/seed.js';
import { errorHandle } from './middlewares/errorMiddleware.js';
import { initSocket } from './socket.js';
// dotenv.config();
const app= express();
const server =http.createServer(app);
initSocket(server)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Gọi swagger
swaggerDocs(app);
app.use('/api',router);
app.use(errorHandle);
connectDB();
seedData();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5003;
    server.listen(port, () => {
        console.log(`Server chạy tại http://localhost:${port}`);
    });
}

export default app;