import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Live, { LiveSectionTypes } from "./Live";
import Layout, { LayoutTypes } from "./Layout";
import { monoDarkSyntaxTheme } from "../themes/dark";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";

export function Composite({
  color,
  packageName,
  markdown,
  icon,
  scope,
}: LiveSectionTypes &
  Omit<LayoutTypes, "children"> & { markdown?: string }): JSX.Element {
  return (
    <Layout color={color} icon={icon} packageName={packageName}>
      {markdown ? (
        <ReactMarkdown
          components={{
            pre: "div", // Override pre element to prevent ReactMarkdown from wrapping code blocks in pre tags
            code: ({ node, inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const code = String(children).replace(/\n$/, "");
              console.log({ node, inline, className, children, props });

              if (node.position.start.line === node.position.end.line) {
                return InlineCode({ children });
              } else if (language === "jsx") {
                return <Live code={code} color={color} scope={scope} />;
              } else {
                return (
                  <CodeBlock
                    style={monoDarkSyntaxTheme}
                    language={language}
                    value={code}
                    {...props}
                  ></CodeBlock>
                );
              }
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </ReactMarkdown>
      ) : null}
    </Layout>
  );
}
