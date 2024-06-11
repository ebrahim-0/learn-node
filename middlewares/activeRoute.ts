import { Request, Response, NextFunction } from "express";

export function activeRoute(req: Request, res: Response, next: NextFunction) {
  console.log("activeRoute");

  res.locals.isActiveRoute = (route: string) => req.originalUrl === route;
  next();
}
