'use client'

import { useVideo } from '@/context/VideoContext'
import styled from 'styled-components';

const ProgressBarInput = styled.input`
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

export function ProgressBar() {
  const { totalTime, currentTime, setNewTime } = useVideo()
  
  return (
    <ProgressBarInput
      type="range"
      min={0}
      max={totalTime}
      value={currentTime}
      onChange={(e) => setNewTime(Number(e.target.value))}
    />
  )
}
