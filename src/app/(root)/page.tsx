import Card from '@/components/Card'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <>
    <Header subheading="Public library" heading="All Videos"/>
    <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
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

export default page
