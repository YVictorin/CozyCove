import Phaser from "phaser"

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene")
  }

  create() {
    const { width, height } = this.cameras.main

    // Add background
    this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

    // Add title
    const title = this.add
      .text(width / 2, height / 4, "Cozy Routines", {
        fontFamily: "Arial",
        fontSize: "64px",
        color: "#3B82F6",
        stroke: "#1E40AF",
        strokeThickness: 6,
      })
      .setOrigin(0.5)

    // Add subtitle
    this.add
      .text(width / 2, height / 4 + 70, "Build Your Best Day!", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#60A5FA",
      })
      .setOrigin(0.5)

    // Add character
    const character = this.add.image(width / 2, height / 2, "character").setScale(2)

    // Animate character
    this.tweens.add({
      targets: character,
      y: height / 2 - 20,
      duration: 1000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    })

    // Create buttons
    const buttonStyle = {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#FFFFFF",
    }

    // Morning routine button
    const morningButton = this.add
      .rectangle(width / 2, height - 200, 250, 60, 0x3b82f6)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height - 200, "Morning Routine", buttonStyle).setOrigin(0.5)

    // Afternoon routine button
    const afternoonButton = this.add
      .rectangle(width / 2, height - 130, 250, 60, 0x8b5cf6)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height - 130, "Afternoon Routine", buttonStyle).setOrigin(0.5)

    // Night routine button
    const nightButton = this.add
      .rectangle(width / 2, height - 60, 250, 60, 0x1e40af)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height - 60, "Night Routine", buttonStyle).setOrigin(0.5)

    // Button hover effects
    const buttons = [morningButton, afternoonButton, nightButton]
    buttons.forEach((button) => {
      button.on("pointerover", () => {
        button.setScale(1.05)
      })

      button.on("pointerout", () => {
        button.setScale(1)
      })
    })

    // Button click handlers
    morningButton.on("pointerdown", () => {
      this.game.events.emit("routineChange", "Morning Routine")
      this.scene.start("MorningRoutineScene")
    })

    afternoonButton.on("pointerdown", () => {
      this.game.events.emit("routineChange", "Afternoon Routine")
      this.scene.start("AfternoonRoutineScene")
    })

    nightButton.on("pointerdown", () => {
      this.game.events.emit("routineChange", "Night Routine")
      this.scene.start("NightRoutineScene")
    })

    // Add badges button
    const badgesButton = this.add.rectangle(width - 100, 50, 150, 50, 0xf59e0b).setInteractive({ useHandCursor: true })
    this.add.text(width - 100, 50, "Badges", buttonStyle).setOrigin(0.5)

    badgesButton.on("pointerdown", () => {
      this.scene.start("BadgeScene")
    })

    // Add safe space button
    const safeSpaceButton = this.add.rectangle(100, 50, 150, 50, 0x10b981).setInteractive({ useHandCursor: true })
    this.add.text(100, 50, "Safe Space", buttonStyle).setOrigin(0.5)

    safeSpaceButton.on("pointerdown", () => {
      this.scene.start("SafeSpaceScene")
    })
  }
}

