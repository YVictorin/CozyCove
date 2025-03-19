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
    <div className="p-4 bg-[#F9f9f9] rounded-3xl shadow-md">
      {/* Activity Toolbox */}
      <h2 className="text-2xl font-semibold mb-4 text-[#26A5B3]">Activity Toolbox</h2>
      <div className="flex flex-wrap border p-4 mb-4 border-[#999999] rounded-lg">
        {toolboxItems.map((item) => (
          <div
            key={item.id}
            draggable="true"
            onDragStart={(e) => handleDragStartToolbox(e, item.id)}
            className="m-2 p-2 border rounded cursor-move border-[#999999]"
          >
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-2" />
            <p className="text-center text-[#666666]">{item.title}</p>
          </div>
        ))}
      </div>

      {/* My Schedule */}
      <h2 className="text-2xl font-semibold mb-4 text-[#26A5B3]">My Schedule</h2>
      <div className="print-area">
        <div
          className="border-2 border-dashed p-4 min-h-[200px] flex flex-wrap border-[#999999] rounded-lg"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToolbox}
        >
          {schedule.map((item, index) => (
            <div
              key={index}
              className="m-2 p-2 border rounded relative border-[#999999] cursor-move"
              draggable="true"
              onDragStart={() => handleDragStartSchedule(index)}
              onDragOver={(e) => handleDragOverSchedule(e, index)}
            >
              <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-2" />
              <p className="text-center text-[#666666]">{item.title}</p>
              <button
                className="absolute top-0 right-0 p-1 text-red-500 print-hidden"
                onClick={() => handleRemoveItem(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <button
        className="mt-6 bg-[#fa507e] text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
        onClick={printSchedule}
      >
        Print Schedule
      </button>
    </div>
  );
};

export default VisualSchedule;
