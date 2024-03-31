"use client"
import React, { useState } from 'react'
import AddDialog from './addDialog';
import Button from './button';
import Link from 'next/link';
import NewQuestionDialog from './newQuestionDialog';

const Navbar = ({ setQuestions }: any) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState<Record<string, string>>({});
    const [newData, setNewData] = useState({ question: "", answer: "" });
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpenDialog(prev => !prev)
    };

    const validate = () => {
        let errorData: Record<string, string> = {}
        if (!newData.question) {
            errorData.question = "Can not be empty"
        }
        if (!newData.answer) {
            errorData.answer = "Can not be empty"
        }
        return errorData
    }

    const sendDataToDb = async () => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api`, {
            method: "POST", headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newData)
        });
        const jsonData = await resp.json();
        if (jsonData.success) {
            setQuestions((prev: any) => ([newData, ...prev]));
            setNewData({ question: "", answer: "" });
            setLoading(false)
            handleClose();
        } else {
            setLoading(false)
            setError({ question: "something went wrong!" })
        }
    }

    const handleSuccess = () => {
        setLoading(true)
        const rData = validate();
        if (Object.keys(rData)?.length > 0) {
            setLoading(false)
            return setError(rData)
        }
        sendDataToDb()
    };


    return (
        <>
            <div className='bg-orange-800 text-white p-5 bg-gradient-to-r from-orange-600 to-orange-700 flex justify-between'>
                <Link href={"/"}><p className='font-bold mt-1'>Question Bank</p></Link>
                <Button className="max-w-40 text-orange-900 bg-orange-500" type="de" title={"Add New"} onClick={handleClose}></Button>
            </div>
            <NewQuestionDialog setQuestions={setQuestions} openDialog={openDialog} handleClose={handleClose} />
        </>
    )
}

export default Navbar
