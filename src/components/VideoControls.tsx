'use client'
import { useVideo } from '@/context/VideoContext'
import { convertNumberToTime } from '@/utils/convertNumberToTime'
import { Expand, Pause, Play } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { AudioContainer } from './AudioContainer'

export function VideoControls() {
  const { totalTime, isPlaying, togglePlay, toggleExpanded, isExpanded } = useVideo()

  return (
    <div className="flex items-center gap-2 w-full h-10 bg-gray-800">
      <button onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</button>
      <AudioContainer />
      <ProgressBar />
      <span>{convertNumberToTime(totalTime)}</span>
      <button
        onClick={toggleExpanded}
        className={isExpanded ? 'hidden' : 'block'} 
      >
        <Expand />
      </button>
      <button
        onClick={toggleExpanded}
        className={isExpanded ? 'block' : 'hidden'} 
      >
        <span className="text-white">Exit Fullscreen</span>
      </button>
    </div>
  )
}
