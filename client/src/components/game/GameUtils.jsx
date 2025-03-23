// Shared game utilities and constants

// Define routines and tasks
export const routines = {
    "Morning Routine": [
      { name: "Brush Teeth", description: "Catch the runaway toothbrush!" },
      { name: "Eat Breakfast", description: "Catch the falling cereal in your bowl!" },
      { name: "Get Dressed", description: "Match the clothes to get dressed!" },
      { name: "Go Outside", description: "Find the key and unlock the door!" },
    ],
    "Afternoon Routine": [
      { name: "Eat Lunch", description: "Balance your sandwich on the plate!" },
      { name: "Playtime", description: "Put your toys back in their places!" },
      { name: "Rest Time", description: "Calm down the jumping bed!" },
      { name: "Tidy Up Toys", description: "Collect all the toys before time runs out!" },
    ],
    "Night Routine": [
      { name: "Brush Teeth", description: "Answer the toothbrush's questions!" },
      { name: "Change Clothes", description: "Find your pajamas among the clothes!" },
      { name: "Story Time", description: "Choose a story to read before bed!" },
      { name: "Sleep", description: "Turn off the lights and go to sleep." },
    ],
  }
  
  // Utility functions for game mechanics
  export const getTextColor = (routine) => {
    if (routine === "Morning Routine") return "text-blue-600"
    if (routine === "Afternoon Routine") return "text-purple-600"
    if (routine === "Night Routine") return "text-indigo-200"
    return "text-blue-600"
  }
  
  export const getBackgroundColor = (routine) => {
    if (routine === "Morning Routine") return "bg-blue-100"
    if (routine === "Afternoon Routine") return "bg-purple-100"
    if (routine === "Night Routine") return "bg-indigo-700"
    return "bg-blue-100"
  }
  
  // Questions for the Night Routine Brush Teeth game
  export const brushTeethQuestions = [
    {
      question: "Why do we brush our teeth?",
      options: ["To keep them clean", "To make them blue", "To make them fall out"],
      correct: 0,
    },
    {
      question: "How long should we brush?",
      options: ["5 seconds", "2 minutes", "1 hour"],
      correct: 1,
    },
    {
      question: "How often should we brush our teeth?",
      options: ["Once a month", "Twice a day", "Once a week" ],
      correct: 2,
    },
  ]
  
  // Stories for the Night Routine Story Time game
  export const bedtimeStories = [
    { title: "The Day I Ate the Moon 🪐", image: "moon" },
    { title: "The Toothbrush That Fought Back 🪥", image: "toothbrush" },
    { title: "The Lava Floor Adventure 🌋", image: "lava" },
  ]
  
  