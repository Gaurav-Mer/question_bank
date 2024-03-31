"use client"
import React from 'react'

const Button = ({ title, onClick, type = "danger", className }: { title: String; onClick: () => void; type: "success" | "danger" | "success" | "de", className?: string }) => {
    const bg = type === "de" ? "bg-orange-200  hover:bg-orange-100" : type === "danger" ? "bg-red-700 hover:bg-red-800" : "bg-blue-600 hover:bg-orange-500"
    return (
        <button onClick={onClick} type="button" className={`inline-flex w-full justify-center rounded-md ${bg} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto ${className}`}>{title}</button>
    )
}

export default Button
