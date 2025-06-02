import Card from "@/components/Card";
import Header from "@/components/Header";
import { auth, currentUser } from "@clerk/nextjs/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
export default async function ProfilePage(){
  const user = await currentUser();
  if(!user){
    return auth.protect();
  }
  const email = user.emailAddresses[0].emailAddress;
  const fname = user.firstName;
  const lname = user.lastName;
  console.log(user)
    return(
        <>
            <Header subheading={email} heading={fname+" "+lname} userprofile={user.imageUrl} />
            <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto'>
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / ><Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                    <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / >
                  </div>
                  
                </div>
        </>
    )
}