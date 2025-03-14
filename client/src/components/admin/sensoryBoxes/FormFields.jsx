import React from 'react';

const FormFields = ({ formData, onChange }) => {
  // Categories to add a Sensory box
  const categories = ["Dry Texture", "Wet Texture", "Relaxation", "Targeted Sensory", "Memory Keepsake"];
  const subCategories = ["Ready-made", "Build Your Own", "Bonding Activities"];
  
  //hard-coded choices for the tags 
    const tagOptions = [
    "Calming", "Educational", "Sensory", "Family", "DIY", "Parent-approved", 
    "Routine", "Emotion", "Creative", "Interactive", "Favorite"
  ];
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Sensory Box Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />
      </div>
      
      {/* JSX for the Category input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Category
        </label>
        <div className="relative">
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* JSX for the sub category input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Sub Category
        </label>
        <div className="relative">
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Select sub category</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>{subCategory}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={onChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product description"
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag, index) => (
            <div key={index} className="flex items-center">

                {/* the jsx needed for the tags section */}
              <button
                type="button"
                // if the form's tag was clicked on change the colot to blue
                className={`flex items-center gap-1 px-3 py-1 rounded-full border 
                  ${formData.tags?.includes(tag) 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    // finalize and update the ui wuth the remaining tags
                onClick={() => {
                  const updatedTags = formData.tags?.includes(tag)
                    ? formData.tags.filter(t => t !== tag)
                    : [...(formData.tags || []), tag];
                  
                  onChange({
                    target: {
                      name: 'tags',
                      value: updatedTags
                    }
                  });
                }}
              >
                {tag}
                {/* if a tag has been clicked on render an x button as well */}
                {formData.tags?.includes(tag) ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormFields;