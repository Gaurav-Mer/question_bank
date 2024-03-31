import Navbar from '@/components/navbar'
import TakeTest from '@/components/takeTest'
import React from 'react'

const TestPage = () => {
    return (
        <main>
            <Navbar />
            <div className="mt-3 m-4">
                <TakeTest />
            </div>
        </main>
    )
}

export default TestPage
