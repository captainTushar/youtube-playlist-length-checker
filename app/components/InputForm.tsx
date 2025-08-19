"use client"

import type React from "react"

import { useState } from "react"

interface InputFormProps {
  onSubmit: (playlistUrl: string) => void
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Paste YouTube playlist URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>
      <button
        type="submit"
        disabled={!url.trim()}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Check Playlist Length
      </button>
    </form>
  )
}

export default InputForm
