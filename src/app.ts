import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express()

app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = [
  envVars.FRONTEND_URL,
  envVars.FRONTEND_URL_2
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      // Allow requests like Postman, curl
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      // ✅ Allow anyway, remove error to prevent "Not allowed by CORS"
      return callback(null, true);

      // If you want strict blocking, use this instead:
      // return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to MyShop System Backend"
  })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app
