
import { JwtPayload } from "jsonwebtoken";

export interface AuthUser {
  userId: string;
  email: string;
  role: "ADMIN" | "OFFICER" | "PUBLIC";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser | JwtPayload;
    }
  }
}

export {};