import Image from 'next/image'
import { AlignRight, Search, Upload, Video } from 'lucide-react'
import Navbar from './Navbar'
function Header(
  {userprofile,heading,subheading}:
  {
    userprofile? : string,
    heading : string,
    subheading : string
}) {
  return(
    <>
      <Navbar />
      <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
      <div className='flex justify-between mb-5'>
          <div className='flex items-center space-x-2'>
            <div>
              {userprofile && <Image alt="logo" width="30" height="30" src={userprofile} className='rounded-full'/>}
            </div>
            
            <div className='flex flex-col'>
              <span className='text-[13px] text-gray'>{subheading}</span>
              <span className='font-bold'>{heading}</span>
            </div>
          </div>
          <div className='flex space-x-4 '>
            <div>
              <button className='flex items-center text-[13px] space-x-1 border-1 border-shadow rounded-2xl py-1.5 px-4'>
                <Upload size={15} />
                <span>Upload a video</span>
              </button>
            </div>
            <div>
              <button className='flex items-center text-[13px] space-x-1 rounded-2xl py-1.5 px-4 text-white bg-brown'>
                <Video size={15} />
                <span>Record a video</span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <form className='flex-1 flex max-w-xl bg-white rounded-2xl p-2 text-gray space-x-1 text-[13px]'>
            <Search size={20}/>
            <input className="w-full focus:outline-none" placeholder='Search for prople, tags, folders, Spaces, and Looms'/>
          </form>
          <div className='flex flex-none space-x-1 items-center bg-white rounded-2xl p-2'>
            <div className='flex items-center max-w-fit'>
              <AlignRight size={13} />
              <select name="viewtime" id="viewtime" className='text-[13px]'>
                <option value={"Most viewed"}>Most viewed</option>
                <option value={"Most recent"}>Most recent</option>
                <option value={"Oldest first"}>Oldest first</option>
                <option value={"Least viewed"}>Least viewed</option>
              </select>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Header
