import React, { useRef, useState } from 'react';
import { lang } from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import gemni_Ai from '../utils/gemniAi';
import { getFixedPrompt } from '../utils/prompt';


function PredictorSearchBar() {

  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState('');
const userData = useSelector((store) => store?.user?.loggedInUser);
const { dogAge, dogGender, dogBreed } = userData || {};



  const handleGemniSearchClick = async () => {
    const userPrompt = searchText.current.value;
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setGeminiResponse('');

    try {
      
     const prompt = getFixedPrompt({ dogBreed, dogAge, dogGender });
      const result = await gemni_Ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(prompt + userPrompt);
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
    <div className='flex flex-col items-center mt-10 min-h-[70vh] px-4 bg-gray-50'>

      <form
        className='bg-white p-6 w-full max-w-2xl rounded-2xl shadow-lg grid grid-cols-12 gap-4 border border-gray-200'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          placeholder={lang[langKey].predictorPlaceholder}
          className='col-span-9 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800'
        />
        <button
          type="button"
          onClick={handleGemniSearchClick}
          disabled={isLoading}
          className={`col-span-3 ${
            isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50`}
        >
          {isLoading ? 'Analyzing...' : lang[langKey].search}
        </button>
      </form>

      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-gray-600">
          <div className="w-5 h-5 border-2 border-t-2 border-gray-600 rounded-full animate-spin"></div>
          <span>Analyzing symptoms...</span>
        </div>
      )}

      {!isLoading && geminiResponse && (
        <div className='mt-6 w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg text-gray-800 whitespace-pre-line border border-gray-200'>
          {geminiResponse}
        </div>
      )}
    </div>
  );
}

export default PredictorSearchBar;
