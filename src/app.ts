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

const app = express();

/* ============================
   TRUST PROXY (IMPORTANT)
============================ */
app.set("trust proxy", 1);

/* ============================
   BODY PARSERS
============================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============================
   COOKIE & SESSION
============================ */
app.use(cookieParser());

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: envVars.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

/* ============================
   PASSPORT
============================ */
app.use(passport.initialize());
app.use(passport.session());

/* ============================
   CORS
============================ */
const allowedOrigins = [
  envVars.FRONTEND_URL,
  envVars.FRONTEND_URL_2,
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked by CORS:", origin);
      // ⚠️ Currently allowing all
      return callback(null, true);
    },
    credentials: true,
  })
);

/* ============================
   ROUTES
============================ */
app.use("/api/v1", router);

/* ============================
   ROOT
============================ */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to MyShop System Backend",
  });
});

/* ============================
   ERROR HANDLERS
============================ */
app.use(globalErrorHandler);
app.use(notFound);

export default app;
