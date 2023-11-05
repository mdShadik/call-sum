import React from "react";
import Markdown from "react-markdown";

export const apiKey=process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function Summarizer(props) {

  return (
    <div className="">
        {/*<div>*/}
        {/*    <button className="bg-cyan-950 sm:rounded-3xl rounded-xl shadow-black shadow-sm sm:px-14 px-5 sm:py-7 py-4 md:text-3xl text-cyan-50 hover:bg-cyan-900  duration-200" onClick={props.summarizeText}>Summarize This Call Recording</button>*/}
        {/*</div>*/}
      <div>
          <div className="prose mx-auto my-10 text-cyan-900 text-xl text-justify border p-5">{props.summary && <Markdown>{props.summary}</Markdown>}</div>
      </div>
    </div>

  );
}

export default Summarizer;
