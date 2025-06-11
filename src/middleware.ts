import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { aj } from './app/api/arcjet/route';
import {detectBot, shield, } from '@arcjet/next';
const isProtectedRoute = createRouteMatcher(["/api/clerk"])
;

//only allowing bots searchengine and googlecrawler and not allowing others
const validate = aj
      .withRule(shield({mode : "LIVE"}))
      .withRule(detectBot({mode:"LIVE",allow : ['CATEGORY:SEARCH_ENGINE',"GOOGLE_CRAWLER"]}))

export default clerkMiddleware(async (auth,req)=>{
  const decision = await validate.protect(req);
  console.log(decision)
  if(decision.isDenied()){
    throw new Error("Forbidden")
  }
  if(isProtectedRoute(req)){
     await auth.protect();
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
