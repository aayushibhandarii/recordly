import { ArcjetDecision, slidingWindow, validateEmail } from "@arcjet/next"
import { aj } from "../arcjet/route"
import { NextRequest } from "next/server"
import {currentUser } from "@clerk/nextjs/server"
import ip from "@arcjet/ip"
//to block those users that have used the email from sites that generate free emails 
const emailValidation = aj.withRule(
  validateEmail({mode:"LIVE",block : ["DISPOSABLE","INVALID","NO_MX_RECORDS"]})
)
//allow user to make max of 2 request of 2minute window
const rateLimit = aj.withRule(
  slidingWindow({
    mode : "LIVE",
    interval : "5m",
    max : 1,
    characteristics : ["fingerprint"]
  })
)
const protectedAuth = async (req : NextRequest):Promise<ArcjetDecision>=>{
    const user  = await currentUser();
    let userId : string;

    if(user){
        userId = user.id;
    }else{
        userId = ip(req) || "127.0.0.1" ;
    }

    if(req.nextUrl.pathname.startsWith("/sign-in")){
        //somebody is trying to sign in
        const body = await req.clone().json();
        if(typeof body.email === "string"){
            return emailValidation.protect(req,{email : body.email});
        }
    }
    return rateLimit.protect(req,{fingerprint:userId})
}
export async function GET(req : NextRequest){
    const decision = await protectedAuth(req);
    console.log("Arcjet decision", decision);
    if(decision.isDenied()){
        if(decision.reason.isEmail()){
            throw new Error("Email Validation failed");
        }
        if(decision.reason.isRateLimit()){
            throw new Error("Rate Limit exceeded");
        }
        if(decision.reason.isShield()){
            throw new Error("Shield turned on, protected against malicious actions")
        }
    }
}