import Phaser from "phaser";

export default class SafeSpaceScene extends Phaser.Scene {
  // Private fields
  #items = [];
  #draggedItem = null;
  #itemPositions = {};

  constructor() {
    super("SafeSpaceScene");
  }

  create() {
    const { width, height } = this.cameras.main;

    // Add background with calming tint
    this.add
      .image(width / 2, height / 2, "background")
      .setDisplaySize(width, height)
      .setTint(0xe0f2fe);

    // Add title
    this.add
      .text(width / 2, 50, "Safe Space Builder", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#0EA5E9",
        stroke: "#0369A1",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Add description
    this.add
      .text(width / 2, 100, "Drag and drop items to build your safe space", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#0EA5E9",
      })
      .setOrigin(0.5);

    // Create room outline
    const roomWidth = 600;
    const roomHeight = 400;
    const roomX = width / 2 - roomWidth / 2;
    const roomY = height / 2 - roomHeight / 2 + 50;

    this.add
      .rectangle(width / 2, height / 2 + 50, roomWidth, roomHeight, 0xffffff)
      .setStrokeStyle(4, 0x0ea5e9);

    // Add draggable items
    const itemTypes = [
      { key: "bed", name: "Bed", x: 100, y: 500 },
      { key: "toy", name: "Fidget Spinner", x: 200, y: 500 },
      { key: "toothbrush", name: "Lamp", x: 300, y: 500 },
      { key: "cereal", name: "Weighted Blanket", x: 400, y: 500 },
      { key: "clothes", name: "Bookshelf", x: 500, y: 500 },
      { key: "door", name: "Music Player", x: 600, y: 500 },
    ];

    itemTypes.forEach((itemType) => {
      // Create the draggable item
      const item = this.add
        .image(itemType.x, itemType.y, itemType.key)
        .setScale(1.2)
        .setInteractive({ draggable: true });

      // Add item label
      this.add
        .text(itemType.x, itemType.y + 40, itemType.name, {
          fontFamily: "Arial",
          fontSize: "14px",
          color: "#0EA5E9",
        })
        .setOrigin(0.5);

      // Save the initial position for later resets
      this.#itemPositions[item.name] = { x: itemType.x, y: itemType.y };

      // Store the item
      this.#items.push(item);
    });

    // Set up drag events
    this.input.on("dragstart", (pointer, gameObject) => {
      this.#draggedItem = gameObject;
      gameObject.setTint(0xadd8e6);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.clearTint();
      this.#draggedItem = null;

      // Check if the item is dropped inside the room
      if (
        gameObject.x > roomX &&
        gameObject.x < roomX + roomWidth &&
        gameObject.y > roomY &&
        gameObject.y < roomY + roomHeight
      ) {
        // Place item inside the room
        gameObject.setDepth(1);
      } else {
        // Return item to its original position
        gameObject.x = this.#itemPositions[gameObject.name].x;
        gameObject.y = this.#itemPositions[gameObject.name].y;
        gameObject.setDepth(0);
      }
    });

    // Add reset button
    const resetButton = this.add
      .rectangle(width - 100, height - 50, 150, 50, 0xf97316)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width - 100, height - 50, "Reset", {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);
    resetButton.on("pointerdown", () => {
      this.#resetItems();
    });

    // Add save button
    const saveButton = this.add
      .rectangle(width - 300, height - 50, 150, 50, 0x10b981)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width - 300, height - 50, "Save Space", {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);
    saveButton.on("pointerdown", () => {
      this.#saveSpace();
    });

    // Add back button
    const backButton = this.add
      .rectangle(100, 50, 150, 50, 0xef4444)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(100, 50, "Back", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);
    backButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }

  // Private method to reset items to their original positions
  #resetItems() {
    this.#items.forEach((item) => {
      item.x = this.#itemPositions[item.name].x;
      item.y = this.#itemPositions[item.name].y;
      item.setDepth(0);
    });
  }

  // Private method to save the safe space
  #saveSpace() {
    const { width, height } = this.cameras.main;

    // Show success message
    const successText = this.add
      .text(width / 2, height / 2, "Safe Space Saved!", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#10B981",
        stroke: "#047857",
        strokeThickness: 6,
        backgroundColor: "#ECFDF5",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setDepth(10);

    // Animate the success message
    this.tweens.add({
      targets: successText,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        successText.destroy();
      },
    });

    // In a complete implementation, additional logic would be added to persist the configuration
  }
}
