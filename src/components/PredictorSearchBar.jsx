import React, { useRef, useState } from 'react';
import { lang } from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import gemni_Ai from '../utils/gemniAi';
import { fixedPrompt } from '../utils/constants';

function PredictorSearchBar() {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState('');

  const handleGemniSearchClick = async () => {
    const userPrompt = searchText.current.value;
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setGeminiResponse('');

    try {
      const model = gemni_Ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(fixedPrompt + userPrompt);
      const response = await result.response;
      const text = await response.text();

      setGeminiResponse(text);
      searchText.current.value = '';
    } catch (error) {
      console.error("Gemini error:", error);
      setGeminiResponse("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-center mt-10 min-h-[70vh] px-4'>

      <form
        className=' bg-black p-6 w-full max-w-2xl rounded-xl shadow-md grid grid-cols-12 gap-4 opacity-80'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          placeholder={lang[langKey].predictorPlaceholder}
          className='col-span-9 p-3 rounded-lg text-black focus:outline-none bg-white'
        />
        <button
          className='col-span-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50'
          onClick={handleGemniSearchClick}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : lang[langKey].search}
        </button>
      </form>


      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-gray-700 animate-pulse">
          <div className="w-5 h-5 border-2 border-t-2 border-gray-700 rounded-full animate-spin"></div>
          <span>Analyzing symptoms...</span>
        </div>
      )}


      {!isLoading && geminiResponse && (
        <div className='mt-6 w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg text-gray-800 whitespace-pre-line'>
          {geminiResponse}
        </div>
      )}
    </div>
  );
}

export default PredictorSearchBar;
