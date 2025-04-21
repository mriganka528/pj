// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/admin(.*)",        // Ensure Clerk runs on all /admin routes
    "/dashboard(.*)",    // Add other protected routes if needed
    "/((?!_next|favicon.ico|.*\\..*).*)", // Avoid static files, allow everything else
  ],
};
