import React, {useRef, useState} from 'react';

function AudioPlayer({audioUrl}) {

    const audioRef = useRef();
    const [barColor, setBarColor] = useState('#839cad')


    return (
        <div>
            {audioUrl && (
                <div className="audio-player flex justify-center">
                    <audio className='webkit' ref={audioRef} controls  controlsList="nodownload noplaybackrate">
                        <style>
                            {
                                `
                            audio::-webkit-media-controls-panel {
                                background-color: #B1D4E0;
                                border: 1px solid #fff;
                                border-radius: 15%;
                            }
                            audio::-webkit-media-controls-mute-button {
                              background-color: #B1D4E0;
                              border-radius: 50%;
                              color:#fff;
                              
                            }
                            audio::-webkit-media-controls-mute-button:hover {
                              background-color: #839cad;
                              transition: 0.5s;
                              border-radius: 50%;
                              
                            }
                            
                            audio::-webkit-media-controls-play-button {
                              background-color: #B1D4E0;
                              border-radius: 50%;
                              color:#fff;
                              
                            }
                            
                            audio::-webkit-media-controls-play-button:hover {
                              background-color: #839cad;
                              transition: 0.5s;
                              border-radius: 50%;
                            }
                            audio::-webkit-media-controls-current-time-display {
                              color: #fff;
                              display: none;
                            }
                            audio::-webkit-media-controls-time-remaining-display {
                              color: #fff;
                              display: none;
                            }
                            audio::-webkit-media-controls-timeline {
                              background-color: #B1D4E0;
                              border-radius: 25px;
                              margin-left: 10px;
                              margin-right: 10px;
                            }
                            audio::-webkit-media-controls-volume-slider {
                              background-color: #B1D4E0;
                              border-radius: 25px;
                              padding-left: 8px;
                              padding-right: 8px;
                              
                            }
                            `
                            }
                        </style>
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default AudioPlayer;