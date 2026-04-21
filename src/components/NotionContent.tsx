import React from 'react';

const NotionBlock: React.FC<{ block: any }> = ({ block }) => {
  switch (block.type) {
    case 'p':
      return <p className="mb-4 text-gray-600 leading-relaxed">{block.text}</p>;
    case 'h1':
      return <h1 className="text-4xl font-bold uppercase tracking-widest mb-4 mt-8">{block.text}</h1>;
    case 'h2':
      return <h2 className="text-2xl font-bold uppercase tracking-widest mb-3 mt-6">{block.text}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold uppercase mb-2 mt-4">{block.text}</h3>;
    case 'li':
      return <li className="ml-6 mb-2 text-gray-600 list-disc">{block.text}</li>;
    case 'hr':
      return <hr className="my-8 border-gray-200" />;
    case 'image':
      return (
        <div className="my-6 max-w-full overflow-hidden">
           <img src={block.url} alt="Notion Image" className="max-w-full h-auto" />
        </div>
      );
    case 'video':
      return (
        <div className="my-6 aspect-video">
           <video src={block.url} controls className="w-full h-full object-cover" />
        </div>
      );
    default:
      return null;
  }
}

export default function NotionContent({ blocks }: { blocks?: any[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="notion-content">
      {blocks.map((b, i) => <NotionBlock key={i} block={b} />)}
    </div>
  );
}
