'use client'
import videos, { IVideo } from '@/data/video';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IVideoPlayerContext {
  togglePlay: () => void
  updateTime: () => void
  isPlaying: boolean
  currentTime: number
  totalTime: number
  isExpanded: boolean
  toggleExpanded: () => void
  setNewTime: (time: number) => void
  volume: number
  updateVolume: (volume: number) => void
  list: IVideo[]
  selectedVideo?: IVideo
  handleVideo: (video: IVideo) => void
}

interface VideoProviderProps {
  children: ReactNode
}

const INITIAL_STATE: IVideoPlayerContext = {
  togglePlay: () => {},
  updateTime: () => {},
  isPlaying: false,
  currentTime: 0,
  totalTime: 0,
  isExpanded: false,
  toggleExpanded: () => {},
  setNewTime: () => {},
  volume: 0,
  updateVolume: () => {},
  list: [],
  handleVideo:() => {}, 
}

const VideoContext = createContext<IVideoPlayerContext>(
  INITIAL_STATE as IVideoPlayerContext,
)

export function VideoProvider({ children }: VideoProviderProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [totalTime, setTotalTime] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [selectedVideo, setSelectedVideo] = useState<IVideo>(videos[0])

  useEffect(() => {
    const video = document.getElementById('video') as HTMLVideoElement
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    setTotalTime(video.duration)

    video.volume = 1

    const draw = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      if (isPlaying) {
        requestAnimationFrame(draw)
      }
    }

    if (isPlaying) {
      draw()
      video.play()
    } else {
      video.pause()
    }

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [isPlaying, selectedVideo])

   const handleVideo = (video : IVideo) => {
      setSelectedVideo(video)
      setIsPlaying(false)
   }
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const updateTime = () => {
    const video = document.getElementById('video') as HTMLVideoElement

    setCurrentTime(video.currentTime)
  }

  const setNewTime = (time: number) => {
    const video = document.getElementById('video') as HTMLVideoElement

    if (!video) return

    video.currentTime = time
    setCurrentTime(time)
  }

  const updateVolume = (volume: number) => {
    const video = document.getElementById('video') as HTMLVideoElement

    if (!video) return

    video.volume = volume
    setVolume(volume)
  }

  const toggleExpanded = () => {
    if (isExpanded) {
      setIsExpanded(isExpanded)
    } else {
      setIsExpanded(!isExpanded)
    }
    
  }

  return (
    <VideoContext.Provider
      value={{
        isPlaying,
        togglePlay,
        updateTime,
        currentTime,
        totalTime,
        isExpanded,
        toggleExpanded,
        setNewTime,
        volume,
        updateVolume,
        list: videos,
        selectedVideo,
        handleVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}

export const useVideo = () => {
  return useContext(VideoContext)
}
