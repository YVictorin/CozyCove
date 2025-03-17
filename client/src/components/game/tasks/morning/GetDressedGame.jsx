
import { useState, useEffect } from "react"

export default function GetDressedGame({ onCompleteTask }) {
  const [clothesItems, setClothesItems] = useState([])

  // Initialize clothes items
  useEffect(() => {
    const clothesTypes = ["shirt", "pants", "socks", "shoes"]
    const items = []

    // Create pairs of clothes
    for (let i = 0; i < clothesTypes.length; i++) {
      items.push({ id: i * 2, type: clothesTypes[i], matched: false, position: i * 2 })
      items.push({ id: i * 2 + 1, type: clothesTypes[i], matched: false, position: i * 2 + 1 })
    }

    // Shuffle positions
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = items[i].position
      items[i].position = items[j].position
      items[j].position = temp
    }

    setClothesItems(items)
  }, [])

  const handleClothesClick = (id) => {
    // Find the clicked item and its pair
    const clickedItem = clothesItems.find((item) => item.id === id)
    if (!clickedItem || clickedItem.matched) return

    // Find the matching item
    const matchingItem = clothesItems.find((item) => item.type === clickedItem.type && item.id !== id)
    if (!matchingItem) return

    // Mark both as matched
    setClothesItems((prev) =>
      prev.map((item) => (item.id === id || item.id === matchingItem.id ? { ...item, matched: true } : item)),
    )

    // Check if all items are matched
    if (clothesItems.filter((item) => !item.matched).length <= 2) {
      // All matched!
      setTimeout(onCompleteTask, 500)
    }
  }

  return (
    <div className="relative w-full h-full">
    

      {/* Clothes grid */}
      <div className="grid grid-cols-4 gap-2 p-4 h-full">
        {clothesItems.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
              item.matched ? "bg-green-200" : "bg-blue-100 hover:bg-blue-200"
            }`}
            onClick={() => handleClothesClick(item.id)}
          >
            <img
              src={`/src/assets/images/clothes-${item.type}.svg`}
              alt={item.type}
              className={`w-12 h-12 object-contain ${item.matched ? "opacity-100" : "opacity-80"}`}
              style={{ filter: `hue-rotate(${item.id * 30}deg)` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

