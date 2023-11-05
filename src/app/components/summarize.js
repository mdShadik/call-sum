import React from "react";
import Markdown from "react-markdown";

export const apiKey=process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function Summarizer(props) {

  return (
    <div className="">
      <div>
          <div className="prose mx-auto my-10 text-cyan-900 text-xl text-justify border p-5">{props.summary && <Markdown>{props.summary}</Markdown>}</div>
      </div>
    </div>

  );
}

export default Summarizer;
