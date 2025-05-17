import React, { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Hash, 
  X, 
  Image, 
  MessageSquare,
  Upload,
  Check
} from 'lucide-react';
import { AIGenerationRequest, Platform } from '../../types';

interface AIContentGeneratorProps {
  onGenerate: (request: AIGenerationRequest) => Promise<string>;
  onApply: (content: string) => void;
  platform: Platform;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ 
  onGenerate, 
  onApply, 
  platform 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceType, setSourceType] = useState<'keywords' | 'image'>('keywords');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'friendly' | 'urgent'>('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  
  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    
    const newKeyword = keywordInput.trim();
    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
    }
    
    setKeywordInput('');
  };
  
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };
  
  const handleGenerate = async () => {
    if ((sourceType === 'keywords' && keywords.length === 0) || 
        (sourceType === 'image' && !imageUrl)) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const request: AIGenerationRequest = {
        type: sourceType,
        keywords: sourceType === 'keywords' ? keywords : undefined,
        image_url: sourceType === 'image' ? imageUrl : undefined,
        target_platform: platform,
        tone: tone,
        max_length: 280 // Example default max length
      };
      
      // For demo, simulate AI generation
      const content = await onGenerate(request);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const simulateImageUpload = () => {
    // Just for demo purposes - in a real app, you would integrate file uploads
    setImageUrl('https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Sparkles size={20} className="text-teal-500 mr-2" />
        <h3 className="text-lg font-medium">AI Content Generator</h3>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button
          type="button"
          onClick={() => setSourceType('keywords')}
          className={`flex items-center px-3 py-2 rounded-md text-sm ${
            sourceType === 'keywords'
              ? 'bg-teal-100 text-teal-800 font-medium'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Hash size={16} className="mr-1" />
          Keywords
        </button>
        <button
          type="button"
          onClick={() => setSourceType('image')}
          className={`flex items-center px-3 py-2 rounded-md text-sm ${
            sourceType === 'image'
              ? 'bg-teal-100 text-teal-800 font-medium'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Image size={16} className="mr-1" />
          Image
        </button>
      </div>
      
      {sourceType === 'keywords' ? (
        <div className="mb-6">
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
            Add Keywords
          </label>
          <div className="flex mb-2">
            <input
              id="keyword"
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
              placeholder="Type a keyword and press Enter"
              className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Add
            </button>
          </div>
          
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-teal-100 text-teal-800"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="ml-1 text-teal-600 hover:text-teal-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">Add some keywords to generate content</p>
          )}
        </div>
      ) : (
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Upload or Provide Image URL
          </label>
          
          {imageUrl ? (
            <div className="relative mb-3 border rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Source for AI generation" 
                className="w-full h-40 object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-gray-700 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex mb-3">
              <input
                id="image"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={simulateImageUpload}
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Upload size={16} className="mr-1" />
                Upload
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
          Content Tone
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value as any)}
          className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || 
                 (sourceType === 'keywords' && keywords.length === 0) || 
                 (sourceType === 'image' && !imageUrl)}
        className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium 
          ${
            isGenerating || 
            (sourceType === 'keywords' && keywords.length === 0) || 
            (sourceType === 'image' && !imageUrl)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500'
          }`}
      >
        {isGenerating ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={16} className="mr-2" />
            Generate Content
          </>
        )}
      </button>
      
      {generatedContent && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Generated Content</h4>
            <button
              type="button"
              onClick={() => onApply(generatedContent)}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded hover:bg-teal-200"
            >
              <Check size={12} className="mr-1" />
              Apply
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {generatedContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;