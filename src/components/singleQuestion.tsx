import Image from 'next/image'
import React, { useRef, useState } from 'react'

const SingleQuestion = ({ item, handleDelete, handleEditData }: any) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className='border-purple-200 border p-5 mt-10 shadow-sm shadow-blue-100 rounded-xl'>
            <div className="flex items-start space-x-2">
                <div className="flex items-center justify-center h-12 w-12 bg-orange-200 rounded-full sm:h-10 sm:w-10">
                    <Image alt="Dialog" width={30} height={30} src="./answer.svg" />
                </div>
                <p className="flex-1  font-bold text-orange-800">
                    <span className="block leading-6 subpixel-antialiased text-wrap mt-2"> {item?.question}</span>
                </p>
            </div>
            <p className={` text-justify text-sm mt-2  text-gray-500  ${showMore ? "" : "line-clamp-1 blur-md	"} `} >
                {item?.answer}
            </p>
            <div className='flex justify-between'>
                {showMore ? (
                    <button className="text-orange-700 mt-2" onClick={() => setShowMore(false)}>Hide Answer</button>
                ) : (
                    <button className="text-orange-700 mt-2" onClick={() => setShowMore(true)}>Show Answer</button>
                )}

                <div className='mt-3 gap-4 flex'>
                    <button className="  text-blue-600  text-sm" onClick={() => handleEditData(item)}>Edit</button>
                    <button className="  text-red-600 p-1 rounded-lg text-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default SingleQuestion
