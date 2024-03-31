import React, { useState } from 'react'
import AddDialog from './addDialog'

interface INewQiuestion {
    openDialog: boolean;
    setQuestions: any;
    handleClose: () => void;
    editData?: any
}
const NewQuestionDialog = ({ openDialog, setQuestions, handleClose, editData }: INewQiuestion) => {
    const [error, setError] = useState<Record<string, string>>({});
    const [newData, setNewData] = useState({ question: editData?.question ? editData?.question : "", answer: editData?.answer ? editData?.answer : "" });
    const [loading, setLoading] = useState(false);

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
        if (editData && Object.keys(editData)?.length > 0) {
            const resp = await fetch(`/api`, {
                method: "PATCH", headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ question: newData.question, answer: newData.answer, id: editData?._id })
            });
            const jsonData = await resp.json();
            if (jsonData.success) {
                setQuestions((prev: any) => {
                    let obj = [...prev];
                    const currIndex = obj.findIndex(data => data._id === jsonData?.data?._id);
                    if (currIndex > -1) {
                        obj[currIndex] = jsonData?.data
                    }
                    return obj
                });
            } else {
                setLoading(false)
                setError({ question: "something went wrong!" })
            }
        } else {
            const resp = await fetch(`/api`, {
                method: "POST", headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newData)
            });
            const jsonData = await resp.json();
            if (jsonData.success) {
                setQuestions((prev: any) => ([newData, ...prev]));
            } else {
                setLoading(false)
                setError({ question: "something went wrong!" })
            }
        }

        setNewData({ question: "", answer: "" });
        setLoading(false)
        handleClose();

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
        <div>
            <AddDialog isLoading={loading} title='Add new Question ' onSuccess={handleSuccess} open={openDialog} onClose={handleClose}>
                <label htmlFor="title" className="block mt-3 text-sm font-medium leading-6 text-gray-900">What is your Question Title ?</label>
                <input value={newData.question} onChange={(e) => setNewData(prev => ({ ...prev, [e.target.name]: e.target.value }))} type="text" name="question" id="question" className="mt-2 block w-full rounded-md border-0 py-2 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 focus:border-none sm:text-sm sm:leading-6 " placeholder="Enter title for Question" />
                {Object.keys(error)?.length > 0 && error?.hasOwnProperty("question") ?
                    <p className='text-sm mt-2  ml-2 text-red-600'>{error?.question}</p> : ""}

                <label htmlFor="title" className="block mt-5 text-sm font-medium leading-6 text-gray-900">Enter your Answer</label>
                <textarea value={newData.answer} onChange={(e) => setNewData(prev => ({ ...prev, [e.target.name]: e.target.value }))} rows={10} name="answer" id="answer" className="mt-2 block w-full rounded-md border-0 py-2 px-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:purple-blue-600 focus:border-none sm:text-sm sm:leading-6 " placeholder="Enter your answer for the above question....." />

                {Object.keys(error)?.length > 0 && error?.hasOwnProperty("answer") ?
                    <p className='text-sm mt-2  ml-2 text-red-600'>{error?.answer}</p> : ""}
            </AddDialog>
        </div>
    )
}

export default NewQuestionDialog
