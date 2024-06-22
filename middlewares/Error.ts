import { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("ErrorMiddleware");

    if (req.originalUrl.includes("/api")) {
      res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
      });
    } else {
      res.status(500).render("Pages/error", {
        title: "Error Page",
        status: 500,
        description: "Internal Server Error",
        message: err.message,
      });
    }

    next();
  }
}
