import React, { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

export const apiKey=process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const summarizeText = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "system",
              content:
                "Summarize it in one-third in points(output in markdown format): " +
                text,
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

      setSummary(response.data.choices[0].message.content);
    } catch (error) {
      console.error("API request failed", error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        cols="50"
      />
      <button onClick={summarizeText}>Summarize</button>
      <div className="prose mx-auto">{summary && <Markdown>{summary}</Markdown>}</div>
    </div>
  );
}

export default Summarizer;
