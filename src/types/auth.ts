import { JwtPayload } from "jwt-decode";

export type AppUser = JwtPayload & {
  role: "ADMIN" | "MEMBER";
};