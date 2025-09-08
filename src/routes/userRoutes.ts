import { Router, Request, Response, NextFunction } from "express";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("User route");
});

export default userRouter;
