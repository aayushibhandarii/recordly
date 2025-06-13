import Image from 'next/image'
import { AlignRight,Upload } from 'lucide-react'
import Link from 'next/link'
import RecordScreen from './RecordScreen'
import HeaderSelect from './HeaderSelect'
import HeaderSearch from './HeaderSearch'
function Header(
  {userprofile,heading,subheading}:
  {
    userprofile : string | null,
    heading : string,
    subheading : string
}) {
  return(
    <>
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
              <Link href={"/upload"}className='flex items-center text-[13px] space-x-1 border-1 border-shadow rounded-2xl py-1.5 px-4' >
                <Upload size={15} />
                <span>Upload a video</span>
              </Link>
            </div>
            <RecordScreen />
          </div>
        </div>
        <div className='flex justify-between'>
          <HeaderSearch />
          <div className='flex flex-none space-x-1 items-center bg-white rounded-2xl p-2'>
            <div className='flex items-center max-w-fit'>
              <AlignRight size={13} />
              <HeaderSelect />
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Header
