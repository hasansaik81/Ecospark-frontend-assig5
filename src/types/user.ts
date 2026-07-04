// src/types/user.ts
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: "ADMIN" | "MEMBER" | string;
}