import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body });

    if (!result.success) return res.status(400).json(result.error);

    next();
  };

export default validate;
