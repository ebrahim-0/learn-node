import { NextFunction, Request, Response } from "express";

export default class NotFoundMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    console.log("NotFoundMiddleware");

    if (req.originalUrl.includes("/api")) {
      res.status(404).json({
        error: `API ${req.originalUrl} endpoint not found`,
      });
    } else {
      res.status(404).render("Pages/notFound", {
        title: "Not Found",
        message: `The Page ${req.originalUrl} you are looking for does not exist.`,
      });
    }

    next();
  }
}
