"use client"
import React, { useState } from 'react'
import SingleQuestion from './singleQuestion'
import Image from 'next/image'
import Link from 'next/link'
import NewQuestionDialog from './newQuestionDialog'
import Swal from 'sweetalert2'


const QuestionListing = ({ setQuestions, questions }: any) => {
    const [editData, setEditData] = useState({ open: false, editData: {} });
    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this Question?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ea580c",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api`, {
                    method: "DELETE", headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });
                if (resp?.status === 200) {
                    const jsonData = await resp.json();
                    if (jsonData?.success) {
                        setQuestions((prev: any) => {
                            let obj = [...prev];
                            const myIndex = obj.findIndex(data => data?._id === id);
                            if (myIndex > -1) {
                                obj.splice(myIndex, 1)
                            }
                            return obj
                        })
                    }
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Question has been deleted.",
                        icon: "success",
                    });
                }

            }
        });
    };

    const handleEditData = (data: any) => {
        setEditData({ open: true, editData: data });
    }
    return (
        <div className='md:p-4 max-w-screen-md mx-auto'>
            <Link href={"/test"}>
                <div className='flex gap-4 p-2 rounded-3xl justify-center items-center  bg-gradient-to-r from-orange-700 to-orange-400'>
                    <div className="flex items-center justify-center h-12 w-12 bg-orange-200 rounded-full sm:h-10 sm:w-10">
                        <Image alt="Dialog" width={30} height={30} src="./exam.svg" />
                    </div>
                    <p className='text-white font-bold '>Take My Test</p>
                </div>
            </Link>
            {questions?.map((item: any) => {
                return (<SingleQuestion handleEditData={handleEditData} key={item.id} item={item} handleDelete={handleDelete} />
                )
            })}
            {editData.open && <NewQuestionDialog handleClose={() => setEditData({ open: false, editData: {} })} openDialog={editData.open} setQuestions={setQuestions} editData={editData.editData} />}
        </div>
    )
}

export default QuestionListing
