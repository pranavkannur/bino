import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { COOKIE_NAME } from "../utils/session";

export function  requireUser(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error:any) {
        return res.status(401).json({ message: "Unauthorized  try again" });
    }
}