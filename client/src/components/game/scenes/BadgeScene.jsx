import Phaser from "phaser"

export default class BadgeScene extends Phaser.Scene {
  constructor() {
    super("BadgeScene")
  }

  create() {
    const { width, height } = this.cameras.main

    // Add background
    this.add
      .image(width / 2, height / 2, "background")
      .setDisplaySize(width, height)
      .setTint(0xfff7ed) // Light orange tint

    // Add title
    this.add
      .text(width / 2, 50, "Your Badges", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#F59E0B",
        stroke: "#D97706",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Add description
    this.add
      .text(width / 2, 100, "Collect badges by completing routines!", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#F59E0B",
      })
      .setOrigin(0.5)

    // In a full implementation, we would load the player's earned badges
    // For this demo, we'll show placeholder badges

    const badges = [
      { name: "Morning Champion", description: "Complete the morning routine 5 days in a row", earned: true },
      { name: "Routine Master", description: "Complete all routines in one day", earned: true },
      { name: "Nighttime Hero", description: "Complete the night routine 15 days in a row", earned: false },
      { name: "Routine Streak King", description: "Complete all routines for 20 days", earned: false },
    ]

    // Create badge display
    const badgeY = 180
    const badgeSpacing = 120

    badges.forEach((badge, index) => {
      // Create badge background
      const badgeBackground = this.add
        .circle(width / 2, badgeY + index * badgeSpacing, 50, badge.earned ? 0xfcd34d : 0xd1d5db)
        .setStrokeStyle(4, badge.earned ? 0xf59e0b : 0x9ca3af)

      // Add badge icon
      const badgeIcon = this.add
        .image(width / 2, badgeY + index * badgeSpacing, "badge")
        .setScale(badge.earned ? 1 : 0.8)
        .setTint(badge.earned ? 0xffffff : 0x9ca3af)

      // Add badge name
      this.add
        .text(width / 2, badgeY + index * badgeSpacing + 70, badge.name, {
          fontFamily: "Arial",
          fontSize: "20px",
          color: badge.earned ? "#F59E0B" : "#9CA3AF",
          fontWeight: "bold",
        })
        .setOrigin(0.5)

      // Add badge description
      this.add
        .text(width / 2, badgeY + index * badgeSpacing + 95, badge.description, {
          fontFamily: "Arial",
          fontSize: "14px",
          color: badge.earned ? "#F59E0B" : "#9CA3AF",
        })
        .setOrigin(0.5)

      // Add locked/unlocked status
      if (!badge.earned) {
        this.add
          .text(width / 2, badgeY + index * badgeSpacing, "LOCKED", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#4B5563",
            fontWeight: "bold",
          })
          .setOrigin(0.5)
      }
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
}

