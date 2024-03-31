import React from 'react'
import Image from 'next/image'

const TakeTest = () => {
    return (
        <div className='md:p-4 max-w-screen-md mx-auto'>
            <div className='flex gap-4 p-2 rounded-3xl justify-center items-center  bg-gradient-to-r from-orange-700 to-orange-400'>
                <div className="flex items-center justify-center h-12 w-12 bg-orange-200 rounded-full sm:h-10 sm:w-10">
                    <Image alt="Dialog" width={30} height={30} src="./exam.svg"  />
                </div>
                <p className='text-white font-bold '>Are you Ready</p>
            </div>
            <div className='border-purple-200 border p-5 mt-10 shadow-sm shadow-blue-100 rounded-xl'>
                <div className="flex items-start space-x-2">
                    <div className="flex items-center justify-center h-12 w-12 bg-orange-200 rounded-full sm:h-10 sm:w-10">
                        <Image alt="Dialog" width={30} height={30} src="./answer.svg"  />
                    </div>
                    <p className="flex-1  font-bold text-orange-800">
                        <span className="block leading-6 subpixel-antialiased text-wrap">Do you find yourself struggling more than usual with the current COVID-19 situation?</span>
                    </p>
                </div>
                <textarea placeholder='Write your answer here ' className='text-orange-700 w-full rounded-lg mt-10 p-4 focus:border-x-indigo-100' rows={7} />
                <div className='flex justify-end gap-5 mt-3'>
                    <button className='text-orange-600 font-bold p-2 rounded-md capitalize'>skip</button>
                    <button className='bg-orange-600 text-white p-2 rounded-md capitalize'>submit</button>

                </div>
            </div>
        </div>
    )
}

export default TakeTest
