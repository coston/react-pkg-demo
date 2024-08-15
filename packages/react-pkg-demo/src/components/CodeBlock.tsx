import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { CSSProperties } from "react";

const copyButtonStyle: CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "rgba(255, 255, 255, 0.2)",
  border: "none",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background 0.3s",
};

function CodeBlock({
  style,
  language,
  value,
}: {
  style: any;
  language: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter style={style} language={language}>
        {value}
      </SyntaxHighlighter>
      <button style={copyButtonStyle} onClick={handleCopy}>
        {copied ? (
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            fill="green"
          >
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            fill="currentColor"
          >
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}

export default CodeBlock;
