// Importe os estilos necessários
import { useVideo } from '@/context/VideoContext'
import { Volume, VolumeX, Volume1, Volume2 } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components';

const VolumeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
  }
`;

export function AudioContainer() {
  const { volume, updateVolume } = useVideo()
  const [isMute, setIsMute] = useState<boolean>(false)
  const [currentVolume, setCurrentVolume] = useState<number>(volume)

  const alterMute = (mute: boolean) => {
    if (mute) {
      setCurrentVolume(volume)
      updateVolume(0)
    } else {
      updateVolume(currentVolume)
    }
    setIsMute(mute)
  }

  return (
    <div className="flex flex-row h-full items-center">
      <VolumeButton onClick={() => alterMute(!isMute)}>
        {volume === 0 ? (
          <VolumeX />
        ) : volume < 0.33 ? (
          <Volume />
        ) : volume < 0.66 ? (
          <Volume1 />
        ) : (
          <Volume2 />
        )}
      </VolumeButton>
      <div className="flex items-center overflow-hidden">
        <VolumeSlider
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e) => updateVolume(Number(e.target.value) / 100)}
        />
      </div>
    </div>
  )
}
