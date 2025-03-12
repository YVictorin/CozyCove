import Phaser from "phaser";
import { getDistance, getVector } from '../../utils/movementUtils';


export default class MorningRoutineScene extends Phaser.Scene {
  // Private fields
  #character = null;
  #toothbrush = null;
  #currentTask = 0;
  #tasks = ["Brush Teeth", "Eat Breakfast", "Get Dressed", "Go Outside"];
  #taskText = null;
  #progressBar = null;
  #taskCompleted = false;
  #taskTimer = null;

  constructor() {
    super("MorningRoutineScene");
  }

  create() {
    const { width, height } = this.cameras.main;

    // Add background
    this.add.image(width / 2, height / 2, "background").setDisplaySize(width, height);

    // Set up the first task
    this.#setupBrushTeethTask();

    // Add task text
    this.#taskText = this.add
      .text(width / 2, 50, this.#tasks[this.#currentTask], {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#3B82F6",
        stroke: "#1E40AF",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Add progress bar
    this.#progressBar = this.add.graphics();
    this.#updateProgressBar();

    // Add back button
    const backButton = this.add
      .rectangle(100, 50, 150, 50, 0xef4444)
      .setInteractive({ useHandCursor: true });

    this.add.text(100, 50, "Back", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);

    backButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });

    // Set up task timer (30 seconds per task)
    this.#taskTimer = this.time.addEvent({
      delay: 30000,
      callback: this.#failTask,
      callbackScope: this,
    });
  }

  update() {
    if (this.#currentTask === 0 && !this.#taskCompleted) {
      this.#updateBrushTeethTask();
    }
  }

  // Private methods
  #setupBrushTeethTask() {
    // Create character
    this.#character = this.physics.add.sprite(400, 300, "character").setScale(1.5);

    // Create toothbrush that runs away
    this.#toothbrush = this.physics.add.sprite(500, 300, "toothbrush").setScale(1.5);

    // Add collision between character and toothbrush
    this.physics.add.overlap(this.#character, this.#toothbrush, this.#catchToothbrush, undefined, this);

    // Add instructions
    this.add
      .text(400, 150, "Catch the runaway toothbrush!", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#3B82F6",
      })
      .setOrigin(0.5);

    // Add controls
    this.add
      .text(400, 550, "Use arrow keys to move", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#64748B",
      })
      .setOrigin(0.5);

    // Set up keyboard controls
    this.input.keyboard.createCursorKeys();
  }

  #updateBrushTeethTask() {
    const cursors = this.input.keyboard.createCursorKeys();
    const speed = 200;
  
    // Get movement direction based on arrow keys, -1 for down and left
    const movement = new Phaser.Math.Vector2(
      (cursors.left.isDown ? -1 : 0) + (cursors.right.isDown ? 1 : 0),
      (cursors.up.isDown ? -1 : 0) + (cursors.down.isDown ? 1 : 0)
    ).normalize().scale(speed);
  
    this.#character.setVelocity(movement.x, movement.y);
  
    // Get character and toothbrush positions as vectors
    const charVec = new Phaser.Math.Vector2(this.#character.x, this.#character.y);
    const brushVec = new Phaser.Math.Vector2(this.#toothbrush.x, this.#toothbrush.y);
  
    // Move toothbrush away if character is too close
    if (getDistance(brushVec, charVec) < 200) {
      const newVelocity = getVector(brushVec, charVec).normalize().scale(150);
      this.#toothbrush.setVelocity(newVelocity.x, newVelocity.y);
    } else {

      if (Phaser.Math.Between(0, 100) < 5) { 
        
        // Apply random movement to the toothbrush occasionally.
        this.#toothbrush.setVelocity(
          Phaser.Math.FloatBetween(-100, 100), 
          Phaser.Math.FloatBetween(-100, 100));  // making the toothbrush move unpredictably within the range [-100, 100].
      }
    }
  }
  

  #catchToothbrush() {
    if (this.#taskCompleted) return;

    this.#taskCompleted = true;
    this.#toothbrush.setVelocity(0, 0);
    this.#character.setVelocity(0, 0);

    // Show success message
    const successText = this.add
      .text(400, 300, "Great job! You caught the toothbrush!", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#10B981",
        backgroundColor: "#ECFDF5",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    // Animate success message
    this.tweens.add({
      targets: successText,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.#completeTask();
        });
      },
    });

    // Reset task timer
    this.#taskTimer.remove();
  }

  #completeTask() {
    this.#currentTask++;
    this.game.events.emit("progress", this.#currentTask / this.#tasks.length);

    if (this.#currentTask >= this.#tasks.length) {
      // All tasks completed, show badge and return to menu
      this.#showCompletionBadge();
    } else {
      // Move to next task
      this.#taskCompleted = false;
      this.#cleanupCurrentTask();
      this.#setupNextTask();

      // Update task text
      this.#taskText.setText(this.#tasks[this.#currentTask]);

      // Update progress bar
      this.#updateProgressBar();

      // Reset task timer
      this.#taskTimer = this.time.addEvent({
        delay: 30000,
        callback: this.#failTask,
        callbackScope: this,
      });
    }
  }

  #failTask() {
    // Show failure message
    const failureText = this.add
      .text(400, 300, "Time's up! Let's try again.", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#EF4444",
        backgroundColor: "#FEF2F2",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    // Animate failure message
    this.tweens.add({
      targets: failureText,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.#resetCurrentTask();
        });
      },
    });
  }

  #resetCurrentTask() {
    this.#cleanupCurrentTask();

    // Reset task state
    this.#taskCompleted = false;

    // Set up current task again (only handling task 0 here as a sample)
    if (this.#currentTask === 0) {
      this.#setupBrushTeethTask();
    }

    // Reset task timer
    this.#taskTimer.remove();
    this.#taskTimer = this.time.addEvent({
      delay: 30000,
      callback: this.#failTask,
      callbackScope: this,
    });
  }

  #cleanupCurrentTask() {
    // Clean up current task objects for task 0
    if (this.#currentTask === 0) {
      if (this.#character) this.#character.destroy();
      if (this.#toothbrush) this.#toothbrush.destroy();
    }
    // Additional cleanups for other tasks can be added here
  }

  #setupNextTask() {
    // Set up the next task based on currentTask
    if (this.#currentTask === 1) {
      // Eat Breakfast task placeholder
      this.#setupPlaceholderTask("Catch the jumping cereal!");
    } else if (this.#currentTask === 2) {
      // Get Dressed task placeholder
      this.#setupPlaceholderTask("Catch your wild clothes!");
    } else if (this.#currentTask === 3) {
      // Go Outside task placeholder
      this.#setupPlaceholderTask("Open the door and solve the puzzle!");
    }
  }

  #setupPlaceholderTask(instructions) {
    // Placeholder for tasks not fully implemented
    const { width, height } = this.cameras.main;

    // Add instructions text
    this.add
      .text(width / 2, height / 2, instructions, {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#3B82F6",
        backgroundColor: "#EFF6FF",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    // Add a complete button to simulate task completion
    const completeButton = this.add
      .rectangle(width / 2, height / 2 + 100, 200, 60, 0x10b981)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2, height / 2 + 100, "Complete Task", {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);

    completeButton.on("pointerdown", () => {
      this.#taskCompleted = true;
      this.#completeTask();
    });
  }

  #updateProgressBar() {
    const { width } = this.cameras.main;
    const barWidth = 400;
    const barHeight = 20;
    const x = width / 2 - barWidth / 2;
    const y = 80;

    this.#progressBar.clear();
    // Draw progress bar background
    this.#progressBar.fillStyle(0xdddddd);
    this.#progressBar.fillRect(x, y, barWidth, barHeight);

    // Draw current progress
    const progress = this.#currentTask / this.#tasks.length;
    this.#progressBar.fillStyle(0x3b82f6);
    this.#progressBar.fillRect(x, y, barWidth * progress, barHeight);
  }

  #showCompletionBadge() {
    const { width, height } = this.cameras.main;

    // Show badge image
    const badge = this.add.image(width / 2, height / 2, "badge").setScale(0);

    // Add badge text
    const badgeText = this.add
      .text(width / 2, height / 2 + 100, "Morning Champion Badge", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#3B82F6",
        stroke: "#1E40AF",
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Animate badge appearance
    this.tweens.add({
      targets: badge,
      scale: 3,
      duration: 1000,
      ease: "Bounce.easeOut",
    });

    this.tweens.add({
      targets: badgeText,
      alpha: 1,
      duration: 1000,
      delay: 500,
    });

    // Add continue button
    const continueButton = this.add
      .rectangle(width / 2, height - 100, 200, 60, 0x3b82f6)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0);

    const continueText = this.add
      .text(width / 2, height - 100, "Continue", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: [continueButton, continueText],
      alpha: 1,
      duration: 500,
      delay: 1500,
    });

    continueButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }
}
