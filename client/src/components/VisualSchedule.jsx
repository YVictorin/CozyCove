import React, { useState } from 'react';

import breakfast from '../assets/images/breakfast.avif';
import school from '../assets/images/school.jpg';
import play from '../assets/images/play.avif';
import homework from '../assets/images/homework.avif';
import dinner from '../assets/images/dinner.jpg';
import bedtime from '../assets/images/bedtime.jpg';
import brush from '../assets/images/brush.jpg';
import cloth from '../assets/images/cloth.webp';
import shoes from '../assets/images/shoes.jpg';
import hair from '../assets/images/hair.webp';
import shower from '../assets/images/shower.jpg';
import lunch from '../assets/images/lunch.avif';
import snack from '../assets/images/snack.webp';
import pj from '../assets/images/pj.webp';
import wash from '../assets/images/wash.jpg';







const VisualSchedule= () => {
    const [schedule, setSchedule] = useState([]);
    const [toolboxItems, setToolboxItems] = useState([
        { id: 'breakfast', title: 'Breakfast', imageUrl: breakfast },
        { id: 'school', title: 'School', imageUrl: school },
        { id: 'play', title: 'Play', imageUrl: play },
        { id: 'homework', title: 'Homework', imageUrl: homework },
        { id: 'dinner', title: 'Dinner', imageUrl: dinner },
        { id: 'bedtime', title: 'Bedtime', imageUrl: bedtime},
        { id:'brush teeth', title:'Brush teeth', imageUrl:brush},
        { id: 'get dressedl', title: 'Get dress', imageUrl: cloth},
        { id: 'put on shoes', title: 'Put on shoes', imageUrl: shoes },
        { id: 'comb hair', title: 'Comb hair', imageUrl: hair },
        { id: 'shower', title: 'Bathtime', imageUrl: shower },
        { id:'lunch', title:'Lunch', imageUrl:lunch},
        { id: 'snack time', title: 'Snack', imageUrl: snack },
        { id: 'put on pjs', title: 'PJ time', imageUrl: pj },
        { id: 'wash hands', title: 'Wash Hands', imageUrl: wash },

        
    ]);

    const handleDragStart = (e, itemId) => {
        e.dataTransfer.setData('text/plain', itemId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        const item = toolboxItems.find((item) => item.id === itemId);
        if (item) {
            setSchedule((prevSchedule) => [...prevSchedule, item]);
        }
    };

    const handleRemoveItem = (index) => {
        setSchedule((prevSchedule) => prevSchedule.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 bg-[#E3FFFF] rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#26A5B3]">Activity Toolbox</h2>
            <div className="flex flex-wrap border p-4 mb-4 border-[#999999] rounded-lg">
                {toolboxItems.map((item) => (
                    <div
                        key={item.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className="m-2 p-2 border rounded cursor-move border-[#999999]"
                    >
                        <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-2" />
                        <p className="text-center text-[#666666]">{item.title}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-[#26A5B3]">My Schedule</h2>
            <div className="print-area">
                <div
                    className="border-2 border-dashed p-4 min-h-[200px] flex flex-wrap border-[#999999] rounded-lg"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {schedule.map((item, index) => (
                        <div key={index} className="m-2 p-2 border rounded relative border-[#999999]">
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-2" />
                            <p className="text-center text-[#666666]">{item.title}</p>
                            <button
                                className="absolute top-0 right-0 p-1 text-red-500"
                                onClick={() => handleRemoveItem(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="bg-[#26A5B3] text-white p-2 rounded-md mt-4"
                onClick={() => window.print()}
            >
                Print Schedule
            </button>
        </div>
    );
};

export default VisualSchedule;