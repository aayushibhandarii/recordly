import Navbar from "@/components/Navbar";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Layout({children}:{children : React.ReactNode}){
    const user = await currentUser();
    if(!user){
        return auth.protect();
    }
    return(
            <div className="w-full h-screen">
                <Navbar imageUrl={user.imageUrl}/>
                {children}
            </div>
        
    )
}