import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { PiTerminalThin } from "react-icons/pi";
import CopyButton from "./CopyButton";
import { icons } from "@/lib/icon";

const MarkdownPreview = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <Markdown
      rehypePlugins={[rehypeHighlight]}
      className={cn("space-y-6", className)}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-4xl font-bold" />;
        },
        h2: ({ node, ...props }) => {
          return <h1 {...props} className="text-2xl font-bold" />;
        },
        h3: ({ node, ...props }) => {
          return <h1 {...props} className="text-xl font-bold" />;
        },
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");

          if (match?.length) {
            let Icon = PiTerminalThin;
            const isMatch = icons.hasOwnProperty(match[1]);
            if (isMatch) {
              Icon = icons[match[1] as keyof typeof icons];
            }

            const id = (Math.floor(Math.random() * 100) + 1).toString();
            //  지금은 카피버튼의 아이디를 랜덤으로 만들어서 주고있는데, 블락마다 숫자를 순차적으로 증가시켜 아이디를 주는 방법이 더 안전할 듯 하다.
            // id를 codeblock-1 codeblock-2 이런식으로 주는게 가장 안전할 듯.
            // useState나 useRef(current. 헷갈리면 코딩알려주는 누나 유튜브 보기)를 사용해서.
            return (
              <div className="bg-gradient-dark text-gray-300 border rounded-md">
                <div className="px-5 py-2 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon />

                    <span>
                      {
                        // @ts-ignore
                        node?.data?.meta
                      }
                    </span>
                  </div>
                  <CopyButton id={id} />
                </div>
                <div className="overflow-x-auto w-full">
                  <div className="p-5" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <code className="bg-red-700 rounded-md px-2 ring-2 ring-red-200">
                {children}
              </code>
            );
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownPreview;
