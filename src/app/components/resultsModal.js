import React from "react";
import Markdown from "react-markdown";
import Link from "next/link";
import {ArrowLongRightIcon} from "@heroicons/react/20/solid";

const ResultsModal = ({summary, transcription}) => {
    return (
        <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8 text-cyan-50">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 ">
                <div className="w-full">
                    <h1 className="text-4xl font-semibold leading-9 ">Summarized Text: </h1>
                    <div className="text-base leading-6 mt-4 text-justify border-2 p-5  prose prose-invert"><Markdown>{summary}</Markdown></div>

                </div>
                <div className="w-full lg:mt-0 mt-8">
                    <h1 className="text-4xl font-semibold leading-9">Transcribed Text:  </h1>
                    <div className="text-base leading-6 mt-4 text-justify  border-2 p-5 prose prose-invert"> <Markdown>{transcription}</Markdown></div>
                </div>
            </div>
            <button aria-label="view catalogue"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none mt-6 md:mt-8 text-xl font-semibold leading-none flex items-center hover:underline">
                <a href='/'>Convert Next</a>
                <ArrowLongRightIcon className="w-8 h-8 "/>
            </button>
        </div>
    );
};

export default ResultsModal;
