import Phaser from 'phaser';

// Instead of handling x and y separately, vectors allow you to store position, direction, and velocity in a single object.

/**
 * Get the vector from one point to another.
 * This represents direction but not speed.
 */
export function getVector(from, to) {
  return from.clone().subtract(to);
}

/**
 * Get the distance between two points using the Pythagorean theorem.
 */
export function getDistance(from, to) {
  return getVector(from, to).length();
}

/**
 * Normalize a vector so it keeps only direction and removes magnitude.
 * A normalized vector always has a length of 1.
 */
export function normalizeVector(vector) {
  return vector.clone().normalize();
}

/**
 * Move a position in a given direction with speed.
 */
export function moveInDirection(position, direction, speed) {
  return position.clone().add(direction.clone().scale(speed));
}

/**
 * Move away from a target with randomness.
 * Adds a slight offset to make movement less predictable.
 */
export function moveAway(position, target, speed, randomness) {
  let direction = getVector(position, target); 
  direction = normalizeVector(direction);

  // This is the correct usage of RandomXY
  const randomOffset = new Phaser.Math.Vector2();
  Phaser.Math.RandomXY(randomOffset, randomness); //gives us a random x and y position 

  direction.add(randomOffset).normalize();
  return moveInDirection(position, direction, speed);
}

/**
 * Keep a position within a rectangular boundary.
 */
export function clampPosition(position, minX, maxX, minY, maxY) {
  return new Phaser.Math.Vector2(
    Phaser.Math.Clamp(position.x, minX, maxX), //clamps the x position
    Phaser.Math.Clamp(position.y, minY, maxY) //clampas the y position
  );
}
