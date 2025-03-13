import Phaser from "phaser"

export default class AfternoonRoutineScene extends Phaser.Scene {
  constructor() {
    super("AfternoonRoutineScene")
  }

  create() {
    const { width, height } = this.cameras.main

    // Add background
    this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

    // Add title
    this.add
      .text(width / 2, 50, "Afternoon Routine", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#8B5CF6",
        stroke: "#5B21B6",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Add tasks list
    const tasks = ["Eat Lunch", "Playtime", "Rest Time", "Tidy Up Toys"]
    const taskY = 150

    tasks.forEach((task, index) => {
      // Create task button
      const taskButton = this.add
        .rectangle(width / 2, taskY + index * 80, 300, 60, 0x8b5cf6)
        .setInteractive({ useHandCursor: true })

      this.add
        .text(width / 2, taskY + index * 80, task, {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#FFFFFF",
        })
        .setOrigin(0.5)

      // Add hover effect
      taskButton.on("pointerover", () => {
        taskButton.setScale(1.05)
      })

      taskButton.on("pointerout", () => {
        taskButton.setScale(1)
      })

      // Add click handler
      taskButton.on("pointerdown", () => {
        // In a full implementation, this would start the specific mini-game
        this.showPlaceholderTask(task)
      })
    })

    // Add back button
    const backButton = this.add.rectangle(100, 50, 150, 50, 0xef4444).setInteractive({ useHandCursor: true })
    this.add
      .text(100, 50, "Back", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)

    backButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene")
    })
  }

  showPlaceholderTask(taskName) {
    const { width, height } = this.cameras.main

    // Clear existing UI
    this.children.removeAll()

    // Add background
    this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

    // Add task title
    this.add
      .text(width / 2, 50, taskName, {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#8B5CF6",
        stroke: "#5B21B6",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Add task description based on the task name
    let description = ""
    let image = ""

    if (taskName === "Eat Lunch") {
      description = "Tap quickly to stop your sandwich from bouncing off the plate!"
      image = "cereal" // Using cereal as placeholder
    } else if (taskName === "Playtime") {
      description = "Drag the toys back to their places!"
      image = "toy"
    } else if (taskName === "Rest Time") {
      description = "Tap the bed to make it stop jumping!"
      image = "bed"
    } else if (taskName === "Tidy Up Toys") {
      description = "Collect all the toys in under 1 minute!"
      image = "toy"
    }

    // Add description
    this.add
      .text(width / 2, 120, description, {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#8B5CF6",
      })
      .setOrigin(0.5)

    // Add placeholder image
    const taskImage = this.add.image(width / 2, height / 2, image).setScale(2)

    // Animate image
    this.tweens.add({
      targets: taskImage,
      y: height / 2 - 20,
      duration: 1000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    })

    // Add complete button
    const completeButton = this.add
      .rectangle(width / 2, height - 100, 200, 60, 0x10b981)
      .setInteractive({ useHandCursor: true })
   
    this.add
      .text(width / 2, height - 100, "Complete Task", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)

    completeButton.on("pointerdown", () => {
      this.showTaskComplete(taskName)
    })

    // Add back button
    const backButton = this.add.rectangle(100, 50, 150, 50, 0xef4444).setInteractive({ useHandCursor: true })
    this.add
      .text(100, 50, "Back", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)

    backButton.on("pointerdown", () => {
      this.create() // Recreate the main afternoon routine screen
    })
  }

  showTaskComplete(taskName) {
    const { width, height } = this.cameras.main

    // Show success message
    const successText = this.add
      .text(width / 2, height / 2, "Great job!", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#10B981",
        stroke: "#047857",
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setScale(0)

    // Animate success message
    this.tweens.add({
      targets: successText,
      scale: 1,
      duration: 500,
      ease: "Back.easeOut",
    })

    // Add continue button
    const continueButton = this.add
      .rectangle(width / 2, height - 100, 200, 60, 0x3b82f6)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0)

    const continueText = this.add
      .text(width / 2, height - 100, "Continue", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setAlpha(0)

    // Animate button appearance
    this.tweens.add({
      targets: [continueButton, continueText],
      alpha: 1,
      duration: 500,
      delay: 1000,
    })

    continueButton.on("pointerdown", () => {
      this.create() // Return to main afternoon routine screen
    })
  }
}

