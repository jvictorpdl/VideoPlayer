'use client'

import { useVideo } from "@/context/VideoContext"
import styled from 'styled-components';

const StyledSpan = styled.span`
  display: inline-block;
  max-width: 800px; /* Define a largura máxima dos itens */
  margin: 0 auto; /* Centraliza os itens horizontalmente */
  cursor: pointer;
`;

export function ListVideos() {
    const { list, handleVideo } = useVideo();
  
    return (
        <div className='flex gap-4'>
            {list.map((video, index) => (
                <StyledSpan onClick={() => handleVideo(video)} key={index}>
                    <img 
                        src={video.imageURL} 
                        alt={video.description} 
                        className="w-80 h-32 rounded-lg justify-center"
                    />
                    <p>{video.description}</p>
                </StyledSpan>
            ))}
        </div>
    )
}
