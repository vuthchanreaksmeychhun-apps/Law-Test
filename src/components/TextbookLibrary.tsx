import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, Bookmark, BookmarkCheck, Type, Settings, ChevronRight, Share2, Compass, Moon, Sun, Library } from 'lucide-react';
import { Textbook, TextbookChapter } from '../types';
import { MOCK_TEXTBOOKS } from '../mockData';

interface TextbookLibraryProps {
  onBackToHome: () => void;
}

export default function TextbookLibrary({ onBackToHome }: TextbookLibraryProps) {
  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<TextbookChapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Customization controls
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Record<string, boolean>>({});

  const handleSelectBook = (book: Textbook) => {
    setSelectedBook(book);
    setSelectedChapter(book.chapters[0]);
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const filteredBooks = MOCK_TEXTBOOKS.filter(book => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           book.titleKh.includes(searchQuery) || 
           book.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Render font size classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-xs leading-normal';
      case 'lg': return 'text-sm leading-relaxed';
      case 'xl': return 'text-base leading-loose';
      default: return 'text-xs md:text-sm leading-relaxed';
    }
  };

  // Render reading theme classes
  const getThemeClass = () => {
    switch (theme) {
      case 'sepia': return 'bg-[#FAF4E8] text-[#433422] border-[#E8DFC8]';
      case 'dark': return 'bg-slate-900 text-slate-100 border-slate-800';
      default: return 'bg-white text-slate-800 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans" id="textbook-library-container">
      {/* Header */}
      <div className="bg-[#0B1B3D] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <button 
            onClick={selectedBook ? () => setSelectedBook(null) : onBackToHome}
            className="p-1 hover:bg-slate-800 rounded-full transition-colors"
            id="book-back-button"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
          </button>
          <div>
            <h1 className="text-base font-bold tracking-tight">
              {selectedBook ? 'Bilingual E-Reader' : 'Law Textbooks'}
            </h1>
            <p className="text-[10px] text-amber-300 font-mono">
              {selectedBook ? 'អានសៀវភៅច្បាប់' : 'បណ្ណាល័យសៀវភៅច្បាប់'}
            </p>
          </div>
        </div>
        <Library className="w-5 h-5 text-amber-400" />
      </div>

      {selectedBook && selectedChapter ? (
        /* Dynamic E-Reader view */
        <div className={`flex-1 flex flex-col min-h-0 ${theme === 'dark' ? 'bg-slate-950' : 'bg-[#FAF9F5]'}`}>
          {/* Customization Toolbar */}
          <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between shadow-sm shrink-0">
            {/* Font Size Selectors */}
            <div className="flex items-center space-x-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <button 
                onClick={() => setFontSize('sm')} 
                className={`px-2 py-1 rounded text-[10px] font-bold ${fontSize === 'sm' ? 'bg-[#0B1B3D] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('base')} 
                className={`px-2 py-1 rounded text-[10px] font-bold ${fontSize === 'base' ? 'bg-[#0B1B3D] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('lg')} 
                className={`px-2 py-1 rounded text-[10px] font-bold ${fontSize === 'lg' ? 'bg-[#0B1B3D] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                A+
              </button>
            </div>

            {/* Reading Theme Selectors */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full border ${theme === 'light' ? 'border-[#0B1B3D] bg-white' : 'border-slate-200 bg-white'}`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              </button>
              <button 
                onClick={() => setTheme('sepia')}
                className={`p-1.5 rounded-full border ${theme === 'sepia' ? 'border-amber-600 bg-[#FAF4E8]' : 'border-slate-200 bg-[#FAF4E8]'}`}
                title="Sepia Mode"
              >
                <Compass className="w-3.5 h-3.5 text-amber-800" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full border ${theme === 'dark' ? 'border-amber-400 bg-slate-900' : 'border-slate-200 bg-slate-900'}`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Book chapters layout container */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Horizontal chapter navigator */}
            <div className="bg-slate-100 border-b border-slate-200 p-2 overflow-x-auto shrink-0 flex space-x-1.5 scrollbar-none">
              {selectedBook.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${
                    selectedChapter.title === chapter.title
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Chapter {index + 1}
                </button>
              ))}
            </div>

            {/* Reading canvas */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className={`p-5 rounded-2xl border shadow-sm space-y-4 ${getThemeClass()}`}>
                
                {/* Meta details */}
                <div className="border-b border-dashed border-slate-200/50 pb-3 flex justify-between items-start">
                  <div>
                    <h3 className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{selectedBook.title}</h3>
                    <h4 className="text-xs font-bold text-[#0B1B3D] dark:text-amber-400 mt-1">{selectedChapter.title}</h4>
                    <h5 className="text-[11px] font-bold text-red-600 mt-0.5">{selectedChapter.titleKh}</h5>
                  </div>
                  
                  <button 
                    onClick={() => toggleBookmark(selectedChapter.title)}
                    className="p-1 rounded-full hover:bg-slate-100/10 transition-colors shrink-0"
                  >
                    {bookmarkedArticles[selectedChapter.title] ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Main e-reader text lines */}
                <div className={`${getFontSizeClass()} space-y-4 font-serif`}>
                  <div className="space-y-1 bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                    <p className="font-semibold text-[11px] tracking-wide text-red-600 font-mono">ENGLISH TEXT / អង់គ្លេស៖</p>
                    <p className="text-slate-700 dark:text-slate-200">{selectedChapter.content}</p>
                  </div>

                  <div className="space-y-1 bg-amber-500/5 p-3 rounded-xl border-l-2 border-amber-400">
                    <p className="font-semibold text-[11px] tracking-wide text-amber-600 font-mono">KHMER TEXT / ភាសាខ្មែរ៖</p>
                    <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-sans">{selectedChapter.contentKh}</p>
                  </div>
                </div>

                {/* Footer specs inside page */}
                <div className="pt-3 border-t border-slate-200/40 flex justify-between text-[8px] text-slate-400 font-mono">
                  <span>Author: {selectedBook.author}</span>
                  <span>Published: {selectedBook.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid list of books */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Search bar */}
          <div className="bg-white p-3 border-b border-slate-200 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search official law books, articles, Civil Code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition"
                id="book-search-input"
              />
            </div>
          </div>

          {/* Luxury bookshelf grid */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" id="bookshelf-scroll">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Bilingual Official Codes</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className="bg-white hover:bg-slate-50 rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col group"
                >
                  {/* Luxury Digital Book Cover (Simulated leather textured rectangle) */}
                  <div className={`aspect-[3/4] rounded-xl ${book.coverColor} p-3.5 relative shadow-md flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                    
                    {/* Golden Book Bind Spine (Simulated left line) */}
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25 border-r border-amber-400/20 shadow-inner"></div>
                    
                    {/* Golden Khmer Royal Ornament silhouette icon top center */}
                    <div className="flex justify-center opacity-40">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                    </div>

                    {/* Book Cover Text content */}
                    <div className="pl-2 space-y-1 text-center my-auto">
                      <h4 className="text-[11px] font-extrabold text-amber-400 tracking-tight leading-tight line-clamp-2">
                        {book.titleKh}
                      </h4>
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent w-3/4 mx-auto my-1"></div>
                      <h5 className="text-[9px] text-white/90 font-medium line-clamp-2 leading-tight">
                        {book.title}
                      </h5>
                    </div>

                    {/* Gold Leaf Stamp bottom corner */}
                    <div className="flex justify-between items-end pl-2 text-[7px] text-amber-400 font-mono">
                      <span>{book.year}</span>
                      <span className="bg-amber-400/20 border border-amber-400/30 px-1 py-0.5 rounded leading-none">OFFICIAL</span>
                    </div>
                  </div>

                  {/* Metadata below book */}
                  <div className="mt-3 text-left space-y-0.5">
                    <h4 className="text-xs font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors line-clamp-1">{book.title}</h4>
                    <p className="text-[9px] text-slate-400 truncate">Category: {book.category}</p>
                    <p className="text-[9px] text-slate-400 font-mono">{book.chapters.length} Chapters bilingual</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
