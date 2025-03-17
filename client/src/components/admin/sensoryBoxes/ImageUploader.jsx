import React from 'react';

const ImageUploader = ({ uploadedImages, currentUpload, onFileUpload, onRemoveImage }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-base font-medium mb-2">Add Images</h2>
      
      <div 
        className="border border-dashed border-blue-300 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-blue-50/10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="text-center">
          <div className="mb-3">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <p className="text-blue-500 text-sm">Drop your files here, or <span className="underline">Browse</span></p>
          </div>
        </div>
        <input 
          type="file" 
          id="fileInput" 
          multiple 
          className="hidden"
          onChange={handleFileInput}
        />
      </div>
      
      {uploadedImages.length > 0 && (
        <div className="mt-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="flex items-center border rounded-md p-2 mb-2">
              <div className="w-8 h-8 mr-3 bg-gray-100 rounded-md overflow-hidden">
                <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium">{image.name}</div>
                <div className="text-xs text-gray-500">{image.size} KB</div>
              </div>
              <button 
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => onRemoveImage(index)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {currentUpload && (
        <div className="mt-2">
          <div className="flex items-center border rounded-md p-2">
            <div className="w-8 h-8 mr-3 bg-gray-100 rounded-md overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium">{currentUpload.name}</div>
              <div className="mt-1 relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${currentUpload.progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{currentUpload.progress}% - {Math.floor(currentUpload.size / 1024)} KB/sec</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;