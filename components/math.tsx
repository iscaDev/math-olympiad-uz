import katex from "katex";
export default function MathText({
  children,
  block = false,
}: {
  children: string;
  block?: boolean;
}) {
  return (
    <span
      className={block ? "math-block" : "math-inline"}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children.slice(0, 8000), {
          displayMode: block,
          throwOnError: false,
          trust: false,
          maxSize: 20,
          maxExpand: 1000,
          output: "htmlAndMathml",
        }),
      }}
    />
  );
}
