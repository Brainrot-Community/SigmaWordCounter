import React from 'react';
import Header from './components/Header';
import WordCounter from './components/WordCounter';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <WordCounter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;