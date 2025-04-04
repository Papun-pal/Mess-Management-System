import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/auth.errorHandler.js";




const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Frontend during development
      "http://localhost:8000", // Backend during development
      "https://anglemess.onrender.com", // Production frontend
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], 
}));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());



//routs import
import userRouts from "./routes/user.routes.js";
import adminRouts from "./routes/admin.routes.js"
import currentBillRoutes from "./routes/currentbill.routes.js";
import gasBillRoutes from "./routes/gasbill.routes.js";
import weeklyFundRoutes from "./routes/weeklyFund.routes.js";
import mealListRoutes from "./routes/meallist.routes.js";
import productRoutes from "./routes/product.routes.js";

app.use("/api/v1/users", userRouts);
app.use("/api/v1/admin", adminRouts);
app.use("/api/v1/currentBills", currentBillRoutes);
app.use("/api/v1/gasBills", gasBillRoutes);
app.use("/api/v1/weeklyFund", weeklyFundRoutes);
app.use("/api/v1/mealList", mealListRoutes);
app.use("/api/v1/productList", productRoutes);


app.use(errorHandler);


export default app;
