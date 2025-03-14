import Phaser from "phaser"

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene")
  }

  preload() {
    // Show loading progress
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 270, 320, 50)

    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        color: "#ffffff",
      },
    })
    loadingText.setOrigin(0.5, 0.5)

    // Update progress bar as assets load
    this.load.on("progress", (value) => {
      progressBar.clear()
      progressBar.fillStyle(0x9966ff, 1)
      progressBar.fillRect(250, 280, 300 * value, 30)
      this.game.events.emit("progress", value)
    })

    // Load assets
    this.load.image("background", "/placeholder.svg?height=600&width=800")
    this.load.image("character", "/placeholder.svg?height=100&width=80")
    this.load.image("toothbrush", "/placeholder.svg?height=50&width=20")
    this.load.image("cereal", "/placeholder.svg?height=40&width=40")
    this.load.image("clothes", "/placeholder.svg?height=60&width=60")
    this.load.image("door", "/placeholder.svg?height=120&width=80")
    this.load.image("bed", "/placeholder.svg?height=100&width=150")
    this.load.image("toy", "/placeholder.svg?height=40&width=40")
    this.load.image("badge", "/placeholder.svg?height=80&width=80")

    // Load UI elements
    this.load.image("button", "/placeholder.svg?height=60&width=200")
    this.load.image("panel", "/placeholder.svg?height=400&width=300")

    // Clean up loader graphics when complete
    this.load.on("complete", () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      this.game.events.emit("progress", 1)
    })
  }

  create() {
    this.scene.start("MainMenuScene")
  }
}

