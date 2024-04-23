'use client'

import { useVideo } from '@/context/VideoContext'
import videos from '@/data/video'
import { VideoControls } from './VideoControls'

export function VideoPlayer() {
  const { selectedVideo, updateTime, isExpanded } = useVideo()
  return (
    <div className="flex flex-col flex-1 justify-center">
      
      <video
        id="video"
        className="w-full"
        src={selectedVideo?.videoURL}
        hidden
        onTimeUpdate={updateTime}
      />
      <canvas
        data-expand={isExpanded ? 'true' : 'false'}
        id="canvas"
        className="flex w-full h-full data-[expand=true]:w-screen data-[expand=true]:h-screen data-[expand=true]:z-50 data-[expand=true]:absolute top-0 left-0"
      />
      <VideoControls />
      <h1>{selectedVideo?.description}</h1>
    </div>
  )
}
