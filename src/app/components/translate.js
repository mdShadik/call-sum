import React, {useRef, useState} from 'react';
import axios from 'axios';
import {apiKey} from "@/app/components/summarize";
import LoadingBar from 'react-top-loading-bar'
import Modal from "@/app/components/modal";
import ResultsModal from "@/app/components/resultsModal";
import AudioPlayer from "@/app/components/audioPlayer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Translate() {

    const notify = (errorMessage = "Error! Please Try Again!") => toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const [audioFile, setAudioFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [progress, setProgress] = useState(0)
    const [barColor, setBarColor] = useState('#f11946')
    const [btnToggle, setBtnToggle] = useState(true)
    const [audioUrl, setAudioUrl] = useState("");
    const [showResultsModal, setShowResultsModal] = useState(false)
    const [summary, setSummary] = useState("");
    const fileInputRef = useRef();


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if(!(file.type==="audio/wav" || file.type==="audio/mpeg")){
            fileInputRef.current.value=null
            notify("File Type MisMatched")
            setBtnToggle(true)
            setAudioUrl("")
            return
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            console.log('test:' + url)
        }
        setAudioFile(file);
        setBtnToggle(false)
    };

    const handleTranscribe = async () => {
        if (audioFile) {
            const formData = new FormData();
            formData.append('file', audioFile);
            formData.append('model', 'whisper-1')
            try {
                const transcription = await transcribeAudio(formData);
                setTranscription(transcription);
                if(transcription!=null) {
                    await summarizeText(transcription)
                }
            } catch (error) {
                console.error('Error transcribing audio:', error);
                notify();
                setTimeout(function() {
                    window.location.reload();
                }, 5000);
            }
        }
    };

    const transcribeAudio = async (formData) => {
        setProgress(30)
        const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
        try {
            setProgress(50)
            setBarColor('#fff')
            setBtnToggle(true)
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${openaiApiKey}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setBarColor('#08fd48')
            const data = response.data;
            setProgress(70)
            if (data.text) {
                return data.text;
            } else {
                throw new Error('Transcription not found in responses');
            }
        } catch (error) {
            console.log(error)
            if(error.response && error.response.status===401){
                notify("API Request Failed!")
            }
            else if(error.response && error.response.status===429){
                notify("Rate Limit Exceed!!! Please Try Again Later!")
            }else {
                notify()
                setTimeout(function () {
                    window.location.reload()
                }, 5000)
            }
        }
    };

    const summarizeText = async (transcription) => {

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    messages: [
                        {
                            role: "system",
                            content:
                                "The given text is from call recording. Summarize it in short in one-third in not more than 4 points. Extract short key insights from call recordings text.(output in markdown format): " +
                                transcription,
                        },
                    ],
                    model: "gpt-3.5-turbo",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
            setProgress(100)

            setSummary(response.data.choices[0].message.content);
            setShowResultsModal(true)
            setBtnToggle(false)
        } catch (error) {
            console.error("API request failed", error);


            if(error.response && error.response.status===429){
                notify("Rate Limit Exceed!!! Please Try Again Later!")
            }else {
                notify()
                setTimeout(function() {
                    window.location.reload();
                }, 5000);
            }
        }
    };



    return (

        <div>
            <Modal show={showResultsModal} setShow={setShowResultsModal}>
                <div className="flex flex-col">
                    <div className="flex gap-3 mx-auto text-xl sm:mt-0 mt-20 justify-center items-center">
                        <div className="text-cyan-50">Listen</div>
                        <AudioPlayer audioUrl={audioUrl} />
                    </div>
                    <ResultsModal  summary={summary} transcription={transcription}/>
                </div>

            </Modal>
            <ToastContainer
            />
            {/* Same as */}

            <LoadingBar
                color={barColor}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />


            <div className="flex sm:mt-32 m-20 mb-0 justify-center items-center text-center">
                <h1 className="text-cyan-50 sm:text-4xl text-2xl">
                    Summarize your call recordings
                </h1>
            </div>
            <div className="flex justify-center items-center text-center p-4">
                <p className="text-gray-400 sm:text-xl">
                    Extract key insights from your call recordings!
                </p>
            </div>
            <div className="flex sm:mt-32 m-20 mb-0 justify-center items-center text-center">
            <input ref={fileInputRef} className="file:bg-cyan-950 file:rounded-2xl file:shadow-black file:shadow-sm sm:file:px-14 file:px-3 file:py-5 sm:file:py-7 file:text-cyan-50 file:border-0 text-cyan-50 sm:text-3xl sm:border-b-2 border-b border-amber-50 hover:file:bg-cyan-900 file:duration-200" type="file" accept=".wav,.mp3" onChange={handleFileChange} />

            </div>
            <div className="flex gap-3 mx-auto text-cyan-50 text-xl my-5 justify-center items-center">
                {audioUrl && (<div>Listen</div>)}
                <AudioPlayer audioUrl={audioUrl} />
            </div>

            <div className="flex mt-2 justify-center items-center text-center">
                <button className="bg-cyan-950 sm:rounded-3xl rounded-xl shadow-black shadow-sm sm:px-14 px-5 sm:py-7 py-4 mt-3 md:text-3xl text-cyan-50 hover:bg-cyan-900  duration-200 disabled:bg-gray-900 disabled:text-gray-400" disabled={btnToggle} onClick={handleTranscribe}>Summarize this Call Recording</button>
            </div>
        </div>
    );
}

export default Translate;

