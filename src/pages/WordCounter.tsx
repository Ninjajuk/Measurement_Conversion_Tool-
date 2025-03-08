import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const countWords = (text: string): number => {
    const words = text.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
  };

  const wordCount = countWords(text);

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        rows={10}
        cols={50}
      />
      <p>Word Count: {wordCount}</p>
    </div>
  );
};

export default WordCounter;