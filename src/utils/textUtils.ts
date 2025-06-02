export const calculateStats = (text: string) => {
  // Word count (handle multiple spaces between words)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  // Character count
  const characters = text.length;
  
  // Character count without spaces
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  
  // Sentence count (handles multiple punctuation marks)
  const sentences = text.trim() 
    ? text.split(/[.!?]+/).filter(sentence => sentence.trim() !== '').length 
    : 0;
  
  // Paragraph count
  const paragraphs = text.trim() 
    ? text.split(/\n+/).filter(para => para.trim() !== '').length 
    : 0;
  
  // Reading time calculation (assuming average reading speed of 225 words per minute)
  const readingTime = words / 225;
  
  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
};