"use client"
import Button from '@/components/button'
import Loading from '@/components/loading';
import Navbar from '@/components/navbar'
import React, { ChangeEvent, useState } from 'react';

interface QuestionAndAnswer {
  question: string;
  answer?: string; // Optional since answers might not be immediately following questions
}


const BulkAdd = () => {
  const [data, setData] = useState("");
  const [myArrayList, setMyArrayList] = useState<QuestionAndAnswer[] | []>([]);
  const [loader, setLoader] = useState(false)

  function extractQuestionsAndAnswers(data: any) {
    const filteredArr = data.split("Question:").filter((str: string) => str.includes("Answer:"));

    const questionAnswerArray = filteredArr.map((str: string) => {
      const [questionPart, answerPart] = str.split("Answer:");
      const question = questionPart?.trim().replace(/\n/g, '');
      const answer = answerPart?.trim().replace(/\n/g, '');
      if (question && answer) {
        return { question, answer };
      }
    });
    return questionAnswerArray
  }
  const handleSubmit = () => {
    const questionAnswers = extractQuestionsAndAnswers(data);
    if (questionAnswers && questionAnswers?.length > 0) {
      setMyArrayList(questionAnswers)
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    setMyArrayList((prev: any) => {
      let obj = [...prev];
      obj[index][e.target.name] = e.target.value
      return obj;
    })
  };

  const sendDataToDB = async () => {
    setLoader(true);
    try {
      await Promise.all(myArrayList.map(async (data) => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        });
        // Handle response if needed
      }));
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoader(false); // Executed after all data has been sent or if an error occurs
    }
  };


  return (
    <main>
      <Navbar />
      <div className="mt-3 m-4">
        <p className='text-center mt-3 font-bold text-xl'>Add Data In Bulk</p>
        <p className='text-center text-orange-500'>make sure question should start with Question: while answer should start with Answer:</p>
        <textarea value={data} onChange={(e) => setData(e.target.value)} rows={10} name="answer" id="answer" className="mt-5 block w-full rounded-md border-0 py-2 px-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:purple-blue-600 focus:border-none sm:text-sm sm:leading-6 " placeholder="Enter your Input to convert " />
        <Button onClick={handleSubmit} className='w-40 mt-5 md:float-end' type='danger' title={"Convert"} ></Button>
        <p className='mt-10 text-orange-500 font-bold text-lg'>Genreated Data is : -</p>
        <div>
          {myArrayList?.map((item: any, index: number) => {
            return (<>
              <div className='mt-10 flex w-full gap-4'>
                <div key={index} className='mt-5 text-bold bg-orange-500 w-10 h-10 flex justify-center items-center text-white rounded-full'>
                  {index + 1}</div>
                <div className='w-full'>
                  <input value={item.question} onChange={(e) => handleChange(e, index)} type="text" name="question" id="question" className="mt-2 block w-full rounded-md border-0 py-2 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 focus:border-none sm:text-sm sm:leading-6 " placeholder="Enter title for Question" />
                  <textarea value={item.answer} onChange={(e) => handleChange(e, index)} rows={10} name="answer" id="answer" className="mt-2 block w-full rounded-md border-0 py-2 px-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:purple-blue-600 focus:border-none sm:text-sm sm:leading-6 " placeholder="Enter your answer for the above question....." />
                </div>
              </div>
            </>)
          })}
        </div>
        {myArrayList?.length > 0 &&
          <div className='w-full flex  justify-end'>
            {loader ? <Loading /> :
              <button className='mt-5 bg-orange-500 text-white p-2 w-full rounded-lg ' onClick={sendDataToDB}>SUBMIT</button>}
          </div>
        }
      </div>
    </main>
  )
}

export default BulkAdd
