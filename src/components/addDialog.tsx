import React, { ReactNode, useState } from 'react'
import Button from './button';
import Image from 'next/image';
import Loading from './loading';

const AddDialog = ({ children, open, onClose, onSuccess, title, isLoading }: { children: ReactNode, open: boolean, onClose: () => void; onSuccess: () => void; title: string; isLoading?: boolean }) => {
    if (!open) {
        return null;
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 my-auto sm:w-full w-full sm:max-w-lg ">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <Image alt='test' width={30} height={30} src={"./dialog.svg"} />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <h3 className="font-bold text-xl mt-2 leading-6 text-gray-900" id="modal-title ">{title}</h3>
                                    <div className="mt-2 w-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-2 py-3 flex justify-start sm:justify-end sm:px-6">
                            <div className='flex gap-2'>
                                <Button className='w-40' type='danger' title={"cancel"} onClick={onClose}></Button>
                                {isLoading ? <Loading className="ml-2" /> :
                                    <Button className='w-40 bg-orange-500 text-white :hover:bg-red-600' type='de' title={"Add Question"} onClick={onSuccess} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDialog
