import { useState } from "react"

const handleFileUpload = (files) => {
    // Simulate file upload process
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: Math.floor(file.size / 1024), // Convert to KB on and for the backend 
      progress: 100,
      url: URL.createObjectURL(file)
    }));
    
    setUploadedImages(prev => [...prev, ...newFiles]);
  };
  
  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic would go here
    console.log('Form submitted', formData, uploadedImages);

    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Add Sensory Box</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUploader 
                uploadedImages={uploadedImages}
                currentUpload={currentUpload}
                onFileUpload={handleFileUpload}
                onRemoveImage={handleRemoveImage}
              />
            </div>
            
            <div>
              <FormFields 
                formData={formData}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              type="button" 
              className="px-4 py-2 text-gray-500 mr-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Publish Sensory Box
            </button>
          </div>
        </form>
      </div>
    );
  };
  

