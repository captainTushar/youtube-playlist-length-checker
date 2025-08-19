"use client"

import { useState } from "react"
import InputForm from "@/app/components/InputForm"
import PlaylistInfo from "@/app/components/PlaylistInfo"
import Loader from "@/app/components/Loader"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [playlist, setPlaylist] = useState<{  title: string ;totalVideos: number; totalDuration: string;   totalSeconds: number; } | null>(null)

  const handleCheckLength = async (url: string) => {
    setLoading(true)
    setPlaylist(null)

    // Extract playlistId from URL
    const playlistId = new URL(url).searchParams.get("list")
    if (!playlistId) {
      alert("Invalid playlist URL")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/getPlaylistLength", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
      })

      const data = await res.json()
      setPlaylist(data)
    } catch (err) {
      console.error(err)
      alert("Failed to fetch playlist. Make sure your API key is correct.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse">
              YouTube Playlist
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-6">Length Checker</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Discover the total duration and video count of any YouTube playlist instantly
            </p>
          </div>

          {/* Main card */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-2xl">
            <InputForm onSubmit={handleCheckLength} />

            {loading && (
              <div className="flex justify-center items-center my-8">
                <Loader />
              </div>
            )}

            {playlist && (
              <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
                <PlaylistInfo
                  title="Playlist Analysis"
                  totalVideos={playlist.totalVideos}
                  totalDuration={playlist.totalDuration}
                  totalSeconds={playlist.totalSeconds}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
