import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cvData = request.cookies.get("cvData");

  // Check if the user is trying to access the protected route "cv-board"
  if (request.nextUrl.pathname === "/cv-board") {
    // If cvData is not present in cookies, redirect to "need-assessment"
    if (!cvData) {
      return NextResponse.redirect(new URL("/need-assessment", request.url));
    }
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/cv-board"],
};