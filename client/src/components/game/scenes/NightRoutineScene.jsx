import Phaser from "phaser"

export default class NightRoutineScene extends Phaser.Scene {
  constructor() {
    super("NightRoutineScene")
  }

  create() {
    const { width, height } = this.cameras.main

    // Add background with darker color for night theme
    const background = this.add.rectangle(width / 2, height / 2, width, height, 0x1e293b)

    // Add stars to the background
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(20, width - 20)
      const y = Phaser.Math.Between(20, height - 20)
      const size = Phaser.Math.FloatBetween(1, 3)

      const star = this.add.circle(x, y, size, 0xffffff)

      // Make stars twinkle
      this.tweens.add({
        targets: star,
        alpha: 0.3,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
      })
    }

    // Add moon
    this.add.circle(width - 100, 100, 40, 0xf9fafb)

    // Add title
    this.add
      .text(width / 2, 50, "Night Routine", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#A5B4FC",
        stroke: "#4F46E5",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Add tasks list
    const tasks = ["Brush Teeth", "Change Clothes", "Story Time", "Sleep"]
    const taskY = 150

    tasks.forEach((task, index) => {
      // Create task button
      const taskButton = this.add
        .rectangle(width / 2, taskY + index * 80, 300, 60, 0x4f46e5)
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

    // Add dark background
    const background = this.add.rectangle(width / 2, height / 2, width, height, 0x1e293b)

    // Add stars
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(20, width - 20)
      const y = Phaser.Math.Between(20, height - 20)
      const size = Phaser.Math.FloatBetween(1, 3)

      const star = this.add.circle(x, y, size, 0xffffff)

      this.tweens.add({
        targets: star,
        alpha: 0.3,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
      })
    }

    // Add task title
    this.add
      .text(width / 2, 50, taskName, {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#A5B4FC",
        stroke: "#4F46E5",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Add task description based on the task name
    let description = ""
    let image = ""

    if (taskName === "Brush Teeth") {
      description = "Answer the toothbrush's questions to convince it to help you!"
      image = "toothbrush"
    } else if (taskName === "Change Clothes") {
      description = "Find your pajamas among the costume battle!"
      image = "clothes"
    } else if (taskName === "Story Time") {
      description = "Choose a storybook to read before bed!"

      // Add story options
      const stories = ["The Day I Ate the Moon 🪐", "The Toothbrush That Fought Back 🪥", "The Lava Floor Adventure 🌋"]

      stories.forEach((story, index) => {
        const storyButton = this.add
          .rectangle(width / 2, 250 + index * 70, 400, 50, 0x6366f1)
          .setInteractive({ useHandCursor: true })

        this.add
          .text(width / 2, 250 + index * 70, story, {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#FFFFFF",
          })
          .setOrigin(0.5)

        storyButton.on("pointerover", () => {
          storyButton.setScale(1.05)
        })

        storyButton.on("pointerout", () => {
          storyButton.setScale(1)
        })

        storyButton.on("pointerdown", () => {
          this.showTaskComplete(taskName)
        })
      })

      // Skip the rest of the function for Story Time
      image = ""
    } else if (taskName === "Sleep") {
      description = "Tap to turn off the lights and go to sleep."
      image = "bed"

      // Add special handling for Sleep task
      const sleepButton = this.add
        .rectangle(width / 2, height / 2 + 100, 200, 60, 0x4f46e5)
        .setInteractive({ useHandCursor: true })

      this.add
        .text(width / 2, height / 2 + 100, "Go to Sleep", {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#FFFFFF",
        })
        .setOrigin(0.5)

      sleepButton.on("pointerdown", () => {
        // Fade to black
        this.cameras.main.fadeOut(3000)

        // After fade, show completion
        this.time.delayedCall(3000, () => {
          this.cameras.main.fadeIn(1000)
          this.showTaskComplete(taskName)
        })
      })

      // Skip the rest of the function for Sleep
      image = "bed"
    }

    // Add description
    if (description) {
      this.add
        .text(width / 2, 120, description, {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#A5B4FC",
        })
        .setOrigin(0.5)
    }

    // Add placeholder image
    if (image && taskName !== "Sleep") {
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
    }

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
      this.create() // Recreate the main night routine screen
    })
  }

  showTaskComplete(taskName: string) {
    const { width, height } = this.cameras.main

    // Clear existing UI
    this.children.removeAll()

    // Add dark background
    const background = this.add.rectangle(width / 2, height / 2, width, height, 0x1e293b)

    // Add stars
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(20, width - 20)
      const y = Phaser.Math.Between(20, height - 20)
      const size = Phaser.Math.FloatBetween(1, 3)

      const star = this.add.circle(x, y, size, 0xffffff)

      this.tweens.add({
        targets: star,
        alpha: 0.3,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
      })
    }

    // Show success message
    const successText = this.add
      .text(width / 2, height / 2, "Great job!", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#A5B4FC",
        stroke: "#4F46E5",
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
      .rectangle(width / 2, height - 100, 200, 60, 0x6366f1)
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
      this.create() // Return to main night routine screen
    })
  }
}

