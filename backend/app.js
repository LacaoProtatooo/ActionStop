import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import figurineRoutes from "./routes/figurine_route.js";
import manufacturerRoutes from "./routes/manufacturer_route.js";
import promoRoutes from "./routes/promo_route.js";

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));

// Middleware
// app.use(cookieParser());
// app.use(cors());

// Router Connection
app.use("/api/figurines", figurineRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/promos", promoRoutes);

export default app;