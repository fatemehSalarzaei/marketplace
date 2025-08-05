export default function HtmlBlock({ html }: { html: string }) {
  return (
    <div
      className="prose max-w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
