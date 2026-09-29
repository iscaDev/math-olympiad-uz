import MathText from './math';
export default function MathProse({ text, className = '' }: { text: string; className?: string }) {
  // Text remains escaped by React. Only bounded LaTeX goes through KaTeX.
  const pieces = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);
  return <div className={`math-prose ${className}`}>{pieces.map((piece, i) =>
    piece.startsWith('$$') && piece.endsWith('$$') ? <MathText block key={i}>{piece.slice(2, -2)}</MathText> :
    piece.startsWith('$') && piece.endsWith('$') ? <MathText key={i}>{piece.slice(1, -1)}</MathText> : <span key={i}>{piece}</span>
  )}</div>;
}
