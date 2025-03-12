import { useEffect, useRef } from "react"

export default function PhaserGame() {
  const gameRef = useRef(null)

  useEffect(() => {
    if (!gameRef.current) return

    let game = null

    // Dynamically import Phaser
    const initPhaser = async () => {
      try {
        const Phaser = await import("phaser")

        // Simple game configuration
        const config = {
          type: Phaser.default.AUTO,
          parent: gameRef.current,
          width: 800,
          height: 600,
          backgroundColor: "#f8fafc",
          physics: {
            default: "arcade",
            arcade: {
              gravity: { y: 0 },
              debug: false,
            },
          },
          scene: {
            preload: function () {
              // Load assets
              this.load.image("background", "/placeholder.svg?height=600&width=800")
              this.load.image("character", "/placeholder.svg?height=100&width=80")
              this.load.image("toothbrush", "/placeholder.svg?height=50&width=20")
              this.load.image("cereal", "/placeholder.svg?height=40&width=40")

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

                // Dispatch progress event
                window.dispatchEvent(new CustomEvent("game-progress", { detail: { progress: value } }))
              })

              // Clean up loader graphics when complete
              this.load.on("complete", () => {
                progressBar.destroy()
                progressBox.destroy()
                loadingText.destroy()

                // Dispatch complete progress event
                window.dispatchEvent(new CustomEvent("game-progress", { detail: { progress: 1 } }))
              })
            },
            create: function () {
              const { width, height } = this.cameras.main

              // Set routine
              window.dispatchEvent(
                new CustomEvent("game-routine-change", {
                  detail: { routine: "Morning Routine" },
                }),
              )

              // Add background
              this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

              // Add title
              this.add
                .text(width / 2, height / 4, "Cozy Routines", {
                  fontFamily: "Arial",
                  fontSize: "64px",
                  color: "#3B82F6",
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
                window.dispatchEvent(
                  new CustomEvent("game-routine-change", {
                    detail: { routine: "Morning Routine" },
                  }),
                )
                this.showMorningRoutine()
              })

              afternoonButton.on("pointerdown", () => {
                window.dispatchEvent(
                  new CustomEvent("game-routine-change", {
                    detail: { routine: "Afternoon Routine" },
                  }),
                )
                this.showAfternoonRoutine()
              })

              nightButton.on("pointerdown", () => {
                window.dispatchEvent(
                  new CustomEvent("game-routine-change", {
                    detail: { routine: "Night Routine" },
                  }),
                )
                this.showNightRoutine()
              })
            },

            // Add custom methods to the scene
            showMorningRoutine: function () {
              const { width, height } = this.cameras.main

              // Clear existing UI
              this.children.removeAll()

              // Add background
              this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

              // Add title
              this.add
                .text(width / 2, 50, "Morning Routine", {
                  fontFamily: "Arial",
                  fontSize: "32px",
                  color: "#3B82F6",
                })
                .setOrigin(0.5)

              // Add task
              this.add
                .text(width / 2, 100, "Brush Teeth", {
                  fontFamily: "Arial",
                  fontSize: "24px",
                  color: "#3B82F6",
                })
                .setOrigin(0.5)

              // Add instructions
              this.add
                .text(width / 2, 150, "Catch the runaway toothbrush!", {
                  fontFamily: "Arial",
                  fontSize: "20px",
                  color: "#3B82F6",
                })
                .setOrigin(0.5)

              // Add character
              const character = this.physics.add.sprite(400, 300, "character").setScale(1.5)

              // Add toothbrush
              const toothbrush = this.physics.add.sprite(500, 300, "toothbrush").setScale(1.5)

              // Set up keyboard controls
              const cursors = this.input.keyboard.createCursorKeys()

              // Update function for character movement
              this.input.keyboard.on("keydown", (event) => {
                const speed = 200

                if (event.key === "ArrowLeft") {
                  character.setVelocityX(-speed)
                } else if (event.key === "ArrowRight") {
                  character.setVelocityX(speed)
                } else if (event.key === "ArrowUp") {
                  character.setVelocityY(-speed)
                } else if (event.key === "ArrowDown") {
                  character.setVelocityY(speed)
                }
              })

              this.input.keyboard.on("keyup", (event) => {
                if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
                  character.setVelocityX(0)
                } else if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                  character.setVelocityY(0)
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
                this.scene.restart()
              })
            },

            showAfternoonRoutine: function () {
              const { width, height } = this.cameras.main

              // Clear existing UI
              this.children.removeAll()

              // Add background
              this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height)

              // Add title
              this.add
                .text(width / 2, 50, "Afternoon Routine", {
                  fontFamily: "Arial",
                  fontSize: "32px",
                  color: "#8B5CF6",
                })
                .setOrigin(0.5)

              // Add tasks
              const tasks = ["Eat Lunch", "Playtime", "Rest Time", "Tidy Up Toys"]

              tasks.forEach((task, index) => {
                this.add
                  .text(width / 2, 150 + index * 70, task, {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#8B5CF6",
                  })
                  .setOrigin(0.5)
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
                this.scene.restart()
              })
            },

            showNightRoutine: function () {
              const { width, height } = this.cameras.main

              // Clear existing UI
              this.children.removeAll()

              // Add dark background
              this.add.rectangle(width / 2, height / 2, width, height, 0x1e293b)

              // Add stars
              for (let i = 0; i < 50; i++) {
                const x = Math.random() * width
                const y = Math.random() * height
                const size = Math.random() * 2 + 1

                const star = this.add.circle(x, y, size, 0xffffff)

                this.tweens.add({
                  targets: star,
                  alpha: 0.3,
                  duration: Math.random() * 2000 + 1000,
                  yoyo: true,
                  repeat: -1,
                })
              }

              // Add title
              this.add
                .text(width / 2, 50, "Night Routine", {
                  fontFamily: "Arial",
                  fontSize: "32px",
                  color: "#A5B4FC",
                })
                .setOrigin(0.5)

              // Add tasks
              const tasks = ["Brush Teeth", "Change Clothes", "Story Time", "Sleep"]

              tasks.forEach((task, index) => {
                this.add
                  .text(width / 2, 150 + index * 70, task, {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#A5B4FC",
                  })
                  .setOrigin(0.5)
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
                this.scene.restart()
              })
            },
          },
        }

        // Create the game instance
        game = new Phaser.default.Game(config)

        // Handle mute toggle
        const handleMuteToggle = (e) => {
          if (game.sound) {
            game.sound.mute = e.detail.muted
          }
        }

        // Handle calming mode toggle
        const handleCalmingToggle = (e) => {
          if (e.detail.calming) {
            game.scene.pause()
          } else {
            game.scene.resume()
          }
        }

        window.addEventListener("game-mute-toggle", handleMuteToggle)
        window.addEventListener("game-calming-toggle", handleCalmingToggle)
      } catch (error) {
        console.error("Error initializing Phaser:", error)
      }
    }

    initPhaser()

    return () => {
      // Clean up event listeners and destroy game on unmount
      window.removeEventListener("game-mute-toggle", () => {})
      window.removeEventListener("game-calming-toggle", () => {})
      if (game) game.destroy(true)
    }
  }, [])

  return <div ref={gameRef} className="w-full h-full" />
}

