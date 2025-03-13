// Performance tracking utility for educational insights

// Define performance thresholds (in milliseconds)
export const performanceThresholds = {
    "Morning Routine": {
      "Brush Teeth": { easy: 10000, medium: 20000 }, // 10-20 seconds is normal
      "Eat Breakfast": { easy: 15000, medium: 30000 },
      "Get Dressed": { easy: 20000, medium: 40000 },
      "Go Outside": { easy: 15000, medium: 30000 },
    },
    "Afternoon Routine": {
      "Eat Lunch": { easy: 15000, medium: 30000 },
      Playtime: { easy: 15000, medium: 30000 },
      "Rest Time": { easy: 10000, medium: 20000 },
      "Tidy Up Toys": { easy: 25000, medium: 45000 },
    },
    "Night Routine": {
      "Brush Teeth": { easy: 15000, medium: 30000 },
      "Change Clothes": { easy: 20000, medium: 40000 },
      "Story Time": { easy: 10000, medium: 20000 },
      Sleep: { easy: 8000, medium: 15000 },
    },
  }
  
  // Define educational insights based on performance
  export const educationalInsights = {
    "Morning Routine": {
      "Brush Teeth": {
        needsHelp:
          "Your child might need additional help with fine motor skills. Try using larger toothbrushes or practice hand-eye coordination games.",
        resources: [
          { title: "Fine Motor Skills Development", url: "/resources/fine-motor-skills" },
          { title: "Making Brushing Fun", url: "/resources/brushing-teeth-games" },
        ],
      },
      "Eat Breakfast": {
        needsHelp:
          "Your child might benefit from additional help with timing and coordination. Consider practicing catching games outside of mealtimes.",
        resources: [
          { title: "Hand-Eye Coordination Activities", url: "/resources/coordination-games" },
          { title: "Healthy Breakfast Ideas", url: "/resources/breakfast-ideas" },
        ],
      },
      "Get Dressed": {
        needsHelp:
          "Your child might need help with pattern matching and categorization. Try simple matching games with clothing items.",
        resources: [
          { title: "Pattern Recognition Activities", url: "/resources/pattern-games" },
          { title: "Self-Dressing Skills", url: "/resources/dressing-skills" },
        ],
      },
      "Go Outside": {
        needsHelp: "Your child might benefit from additional help with spatial awareness and problem-solving.",
        resources: [
          { title: "Spatial Awareness Games", url: "/resources/spatial-games" },
          { title: "Outdoor Exploration Activities", url: "/resources/outdoor-activities" },
        ],
      },
    },
    "Afternoon Routine": {
      "Eat Lunch": {
        needsHelp:
          "Your child might need help with balance and stability concepts. Try balance beam activities or stability exercises.",
        resources: [
          { title: "Balance Activities for Kids", url: "/resources/balance-activities" },
          { title: "Mindful Eating Practices", url: "/resources/mindful-eating" },
        ],
      },
      Playtime: {
        needsHelp:
          "Your child might benefit from organization and categorization activities. Try sorting games with toys.",
        resources: [
          { title: "Organizational Skills for Kids", url: "/resources/organization-skills" },
          { title: "DIY Sensory Boxes", url: "/resources/sensory-boxes" },
        ],
      },
      "Rest Time": {
        needsHelp: "Your child might need additional help with calming techniques and self-regulation.",
        resources: [
          { title: "Calming Techniques for Children", url: "/resources/calming-techniques" },
          { title: "Creating a Relaxing Environment", url: "/resources/relaxing-environment" },
        ],
      },
      "Tidy Up Toys": {
        needsHelp: "Your child might benefit from time management and prioritization activities.",
        resources: [
          { title: "Time Management for Kids", url: "/resources/time-management" },
          { title: "Making Cleanup Fun", url: "/resources/fun-cleanup" },
        ],
      },
    },
    "Night Routine": {
      "Brush Teeth": {
        needsHelp:
          "Your child might need help with comprehension and following instructions. Try simple question-and-answer games.",
        resources: [
          { title: "Improving Listening Skills", url: "/resources/listening-skills" },
          { title: "Question Games for Kids", url: "/resources/question-games" },
        ],
      },
      "Change Clothes": {
        needsHelp: "Your child might benefit from memory and recognition activities. Try memory matching games.",
        resources: [
          { title: "Memory Games for Children", url: "/resources/memory-games" },
          { title: "Bedtime Routine Tips", url: "/resources/bedtime-routine" },
        ],
      },
      "Story Time": {
        needsHelp: "Your child might need additional help with decision-making and preferences.",
        resources: [
          { title: "Decision-Making Activities", url: "/resources/decision-making" },
          { title: "Bedtime Stories Collection", url: "/resources/bedtime-stories" },
        ],
      },
      Sleep: {
        needsHelp: "Your child might benefit from additional help with transition activities and winding down.",
        resources: [
          { title: "Bedtime Transition Activities", url: "/resources/bedtime-transition" },
          { title: "Creating a Sleep-Friendly Environment", url: "/resources/sleep-environment" },
        ],
      },
    },
  }
  
  // Function to save performance data to localStorage
  export const savePerformanceData = (routine, task, timeSpent, attempts = 1) => {
    try {
      // Get existing data or initialize empty object
      const existingData = localStorage.getItem("routineRushPerformance")
      const performanceData = existingData ? JSON.parse(existingData) : {}
  
      // Initialize routine and task if they don't exist
      if (!performanceData[routine]) {
        performanceData[routine] = {}
      }
  
      if (!performanceData[routine][task]) {
        performanceData[routine][task] = {
          attempts: 0,
          totalTime: 0,
          history: [],
        }
      }
  
      // Update data
      const taskData = performanceData[routine][task]
      taskData.attempts += attempts
      taskData.totalTime += timeSpent
  
      // Add to history (keep last 10 attempts)
      taskData.history.push({
        timestamp: new Date().toISOString(),
        timeSpent,
        attempts,
      })
  
      // Keep only the last 10 entries
      if (taskData.history.length > 10) {
        taskData.history = taskData.history.slice(-10)
      }
  
      // Save back to localStorage
      localStorage.setItem("routineRushPerformance", JSON.stringify(performanceData))
  
      // Also dispatch an event for potential parent dashboard integration
      window.dispatchEvent(
        new CustomEvent("game-performance-update", {
          detail: {
            routine,
            task,
            timeSpent,
            attempts,
            averageTime: taskData.totalTime / taskData.attempts,
          },
        }),
      )
  
      return true
    } catch (error) {
      console.error("Error saving performance data:", error)
      return false
    }
  }
  
  // Function to get performance insights
  export const getPerformanceInsights = () => {
    try {
      const existingData = localStorage.getItem("routineRushPerformance")
      if (!existingData) return []
  
      const performanceData = JSON.parse(existingData)
      const insights = []
  
      // Analyze each routine and task
      Object.entries(performanceData).forEach(([routine, routineTasks]) => {
        Object.entries(routineTasks).forEach(([task, data]) => {
          // Calculate average time
          const averageTime = data.totalTime / data.attempts
  
          // Get thresholds for this task
          const thresholds = performanceThresholds[routine]?.[task]
          if (!thresholds) return
  
          // Determine if child needs help
          if (averageTime > thresholds.medium) {
            const insight = {
              routine,
              task,
              averageTime,
              attempts: data.attempts,
              needsHelp:
                educationalInsights[routine]?.[task]?.needsHelp ||
                `Your child might need additional help with ${task.toLowerCase()}.`,
              resources: educationalInsights[routine]?.[task]?.resources || [],
            }
  
            insights.push(insight)
          }
        })
      })
  
      return insights
    } catch (error) {
      console.error("Error getting performance insights:", error)
      return []
    }
  }
  
  // Function to clear all performance data (for testing or reset)
  export const clearPerformanceData = () => {
    localStorage.removeItem("routineRushPerformance")
  }
  
  