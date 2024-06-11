import express, { Request, Response, NextFunction } from "express";
import path from "path";
import ProductLayoutRouter from "./routes/ProductLayoutRouter";
import productsApiRouter from "./routes/ProductsApiRouter";
import { activeRoute } from "./middlewares/activeRoute";
import ErrorMiddleware from "./middlewares/Error";
import NotFoundMiddleware from "./middlewares/NotFound";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import compression from "compression";

const app = express();

// ** Middlewares

app.use(morgan("dev"));

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many requests, please try again later.",
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(
  helmet({
    // contentSecurityPolicy: {
    //   directives: {
    //     "img-src": [
    //       "'self'",
    //       "https://picsum.photos",
    //       "https://fastly.picsum.photos",
    //     ],
    //   },
    // },
    contentSecurityPolicy: false,
    xFrameOptions: {
      action: "deny",
    },
  })
);

// ** Convert request body to JSON
app.use(express.json());

// ** Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ** Static files
app.use(express.static(path.join(__dirname, "public")));

// ** Active Route Middleware
app.use(activeRoute);

// ** Routes
app.use("/products", ProductLayoutRouter);
app.use("/api/products", productsApiRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("Pages/index", {
    title: "Product Api",
    description: "This is a simple product api with CRUD operations",
    isActiveRoute: res.locals.isActiveRoute,
  });
});

// app.get("*", (req: Request, res: Response) => {
//   res.render("Pages/notFound");
// });

app.use(NotFoundMiddleware.handle);
app.use(ErrorMiddleware.handle);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running => http://localhost:${PORT}`);
});
