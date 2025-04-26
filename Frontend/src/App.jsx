import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import * as shiki from "shiki";
import axios from "axios";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [code, setCode] = useState(
    `#include<iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}`
  );
  const [review, setReview] = useState("");
  const [highlighter, setHighlighter] = useState(null);

  useEffect(() => {
    async function loadHighlighter() {
      const highlighter = await shiki.getHighlighter({
        theme: "nord",
        langs: ["cpp"],
        paths: {
          languages: "https://cdn.jsdelivr.net/npm/shiki@latest/languages/",
          themes: "https://cdn.jsdelivr.net/npm/shiki@latest/themes/",
          wasm: "https://cdn.jsdelivr.net/npm/shiki@latest/dist/",
        },
      });
      setHighlighter(highlighter);
    }

    loadHighlighter();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        "https://ai-code-reviewer.onrender.com/ai/get-review", // ✅ Correct URL
        { code }
      );

      setReview(response.data);
    } catch (error) {
      console.error("Error getting review:", error);
      setReview("Failed to get review. Please check the server.");
    }
  }

  function highlightCode(code) {
    if (!highlighter) return code;
    const tokens = highlighter.codeToThemedTokens(code, "cpp");
    return tokens
      .map((line) =>
        line
          .map(
            (token) =>
              `<span style="color: ${token.color ?? "white"}">${
                token.content
              }</span>`
          )
          .join("")
      )
      .join("\n");
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={highlightCode}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: "transparent", // handled by CSS
              color: "white",
              overflow: "auto",
              whiteSpace: "pre-wrap", // <-- updated
              wordBreak: "break-word", // <-- added
            }}
          />
        </div>
        <button className="review" onClick={reviewCode}>
          Review
        </button>
      </div>

      <div className="right">
        <h3>Review:</h3>
        <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
