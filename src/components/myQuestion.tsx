"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Navbar from './navbar'
import QuestionListing from './questionListing'
import { useInView } from 'react-intersection-observer'
import Loading from './loading'

interface IQuestionL {
    QData: {
        _id: string;
        question: string;
        answer: string;
        createdAt: string;
        updatedAt: string;
    }
}

const MyQuestion = () => {
    const [questions, setQuestions] = useState<IQuestionL[] | []>([]);
    const [pageQuery, setPageQuery] = useState<number>(1);
    const { ref: infiniteRef, inView, } = useInView();
    const [showLoader, setShowLoader] = useState(true)


    const fetchAllQuestion = async (tType: string | null, signal: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api?page=${pageQuery}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            signal,
            cache: "no-cache"
        });

        if (response.status === 200) {
            const respData = await response.json();
            if (respData?.success) {
                setQuestions((prev: any) => {
                    if (prev.length > 0) {
                        const newData = [...prev, ...respData.data];
                        return newData;
                    } else {
                        return respData.data;
                    }
                });
                if (respData?.data?.length < 5) {
                    setShowLoader(false)
                }
            }

        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const params = new URLSearchParams(location.search);
        const tType = params.get("tType");
        fetchAllQuestion(tType, signal);
        return () => controller.abort();
    }, [pageQuery]);

    useEffect(() => {
        if (questions?.length > 0 && inView) {
            setPageQuery(prev => prev + 1)
        }
    }, [inView]);

    return (
        <>
            <Navbar setQuestions={setQuestions} />
            <div className="mt-3 m-4">
                <QuestionListing questions={questions} setQuestions={setQuestions} />
                <div ref={infiniteRef}>
                    {showLoader ?
                        <Loading /> : ""}
                </div>
            </div>
        </>
    )
}

export default MyQuestion
