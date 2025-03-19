import React, { useState } from "react";

import breakfast from "../assets/images/breakfast.avif";
import school from "../assets/images/school.jpg";
import play from "../assets/images/play.avif";
import homework from "../assets/images/homework.avif";
import dinner from "../assets/images/dinner.jpg";
import bedtime from "../assets/images/bedtime.jpg";
import brush from "../assets/images/brush.jpg";
import cloth from "../assets/images/cloth.webp";
import shoes from "../assets/images/shoes.jpg";
import hair from "../assets/images/hair.webp";
import shower from "../assets/images/shower.jpg";
import lunch from "../assets/images/lunch.avif";
import snack from "../assets/images/snack.webp";
import pj from "../assets/images/pj.webp";
import wash from "../assets/images/wash.jpg";

const VisualSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const toolboxItems = [
    { id: "breakfast", title: "Breakfast", imageUrl: breakfast },
    { id: "school", title: "School", imageUrl: school },
    { id: "play", title: "Play", imageUrl: play },
    { id: "homework", title: "Homework", imageUrl: homework },
    { id: "dinner", title: "Dinner", imageUrl: dinner },
    { id: "bedtime", title: "Bedtime", imageUrl: bedtime },
    { id: "brush teeth", title: "Brush Teeth", imageUrl: brush },
    { id: "get dressed", title: "Get Dressed", imageUrl: cloth },
    { id: "put on shoes", title: "Put on Shoes", imageUrl: shoes },
    { id: "comb hair", title: "Comb Hair", imageUrl: hair },
    { id: "shower", title: "Bathtime", imageUrl: shower },
    { id: "lunch", title: "Lunch", imageUrl: lunch },
    { id: "snack time", title: "Snack", imageUrl: snack },
    { id: "put on pjs", title: "PJ Time", imageUrl: pj },
    { id: "wash hands", title: "Wash Hands", imageUrl: wash },
  ];

  const handleDragStartToolbox = (e, itemId) => {
    e.dataTransfer.setData("text/plain", itemId);
  };

  const handleDropToolbox = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const item = toolboxItems.find((item) => item.id === itemId);
    if (item) {
      setSchedule((prevSchedule) => [...prevSchedule, item]);
    }
  };

  const handleDragStartSchedule = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOverSchedule = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSchedule = [...schedule];
    const draggedItem = newSchedule[draggedIndex];

    newSchedule.splice(draggedIndex, 1);
    newSchedule.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setSchedule(newSchedule);
  };

  const handleRemoveItem = (index) => {
    setSchedule((prevSchedule) => prevSchedule.filter((_, i) => i !== index));
  };

  // Touch events for mobile
  const handleTouchStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleTouchMove = (e, index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newSchedule = [...schedule];
    const draggedItem = newSchedule[draggedIndex];
    
    newSchedule.splice(draggedIndex, 1);
    newSchedule.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setSchedule(newSchedule);
  };

  const handleAddItem = (itemId) => {
    const item = toolboxItems.find((item) => item.id === itemId);
    if (item) {
      setSchedule((prevSchedule) => [...prevSchedule, item]);
    }
  };

  const printSchedule = () => {
    const printContent = document.querySelector(".print-area");
    if (!printContent) return;

    const newWindow = window.open("", "", "width=800,height=600");

    newWindow.document.write(`
      <html>
        <head>
          <title>Print Schedule</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            .schedule-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
            .schedule-item { border: 1px solid #999; padding: 10px; border-radius: 8px; text-align: center; }
            img { width: 100px; height: 100px; display: block; margin: auto; }
            p { margin-top: 5px; font-size: 16px; }
            .print-hidden{display: none !important;}
          </style>
        </head>
        <body>
          <h2>My Child's Visual Schedule</h2>
          <div class="schedule-container">${printContent.innerHTML}</div>
          <script>
            window.onload = function() {
              setTimeout(() => { 
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    newWindow.document.close();
  };

  return (
    <div className="p-1 sm:p-4 bg-[#F9f9f9] rounded-lg sm:rounded-3xl shadow-md">
      {/* Activity Toolbox */}
      <h2 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-4 text-[#26A5B3] text-center">
        Activity Toolbox
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2 border p-1 sm:p-4 mb-2 sm:mb-4 border-[#999999] rounded-lg">
        {toolboxItems.map((item) => (
          <div
            key={item.id}
            draggable="true"
            onDragStart={(e) => handleDragStartToolbox(e, item.id)}
            onClick={() => handleAddItem(item.id)} // For mobile tap
            className="flex flex-col items-center p-1 sm:p-2 border rounded cursor-pointer border-[#999999] hover:bg-gray-100 transition-colors"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-8 h-8 sm:w-16 sm:h-16 object-cover rounded"
            />
            <p className="text-center text-[#666666] text-xs sm:text-sm mt-1 line-clamp-1">{item.title}</p>
          </div>
        ))}
      </div>

      {/* My Schedule */}
      <h2 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-4 text-[#26A5B3] text-center">
        My Schedule
      </h2>
      <div className="print-area">
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2 border-2 border-dashed p-1 sm:p-4 min-h-[120px] sm:min-h-[200px] border-[#999999] rounded-lg"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToolbox}
        >
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-1 sm:p-2 border rounded relative border-[#999999] cursor-move hover:bg-gray-50 transition-colors"
              draggable="true"
              onDragStart={() => handleDragStartSchedule(index)}
              onDragOver={(e) => handleDragOverSchedule(e, index)}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={(e) => handleTouchMove(e, index)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-8 h-8 sm:w-16 sm:h-16 object-cover rounded" 
              />
              <p className="text-center text-[#666666] text-xs sm:text-sm mt-1 line-clamp-1">{item.title}</p>
              <button
                className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center print-hidden"
                onClick={() => handleRemoveItem(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-3 sm:mt-6">
        <button
          className="bg-[#fa507e] text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full hover:bg-cyan-500 transition-colors text-xs sm:text-base"
          onClick={printSchedule}
        >
          Print Schedule
        </button>
      </div>
    </div>
  );
};

export default VisualSchedule;