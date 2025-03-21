import React, { useState, useEffect } from "react";
import "../styles/build.css";
import sensoryBottles from "../assets/sensory-bottles.jpg";
import sensoryBalls from "../assets/sensory-balls.png";
import sensoryBags from "../assets/sensory-bags.jpg";
import weightedBlanket from "../assets/weighted-blanket.png";
import sensoryWallPanel from "../assets/sensory-wall-panel.png";
import sensoryPath from "../assets/sensory-path.jpg";
import tactileBoards from "../assets/tactile-boards.jpg";
import colorSortingJars from "../assets/color-sorting-jars.png";
import calmingGlitterJars from "../assets/calming-glitter-jars.jpg";
import foamSensoryPlay from "../assets/foam-sensory-play.png";

const Build = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Define product categories/tags
  const productCategories = [
    { id: "all", label: "All builds" },
    { id: "calming", label: "Calming Activities" },
    { id: "tactile", label: "Tactile Exploration" },
    { id: "motor", label: "Motor Skills" },
    { id: "visual", label: "Visual Stimulation" },
  ];

  // Assign categories to products
  const products = [
    {
      id: 1,
      image: sensoryBottles,
      title: "DIY Sensory Bottles",
      text: "These bottles can be used for calm-down activities, improving focus and reducing anxiety.",
      categories: ["calming", "visual"],
      materialsTitle: "Materials",
      materials: [
        "Empty plastic bottles or glass jars with tight lids",
        "Glitter, beads, sequins, or small toys",
        "Glycerin or clear hair gel (for slow-moving items)",
        "Water (or colored water with food coloring)",
        "Hot glue gun (for securing lids)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Sensory bottles provide a great way for children to explore visual and tactile stimuli. They can be customized with different materials to suit various sensory needs.",
    },
    {
      id: 2,
      image: sensoryBalls,
      title: "DIY Stress Balls",
      text: "A great tool for stress relief and hand strength exercises.",
      categories: ["calming", "tactile", "motor"],
      materialsTitle: "Materials",
      materials: [
        "Balloons (preferably thick ones)",
        "Flour, rice, or cornstarch",
        "A funnel",
        "A spoon or small scoop",
        "Scissors",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Cut the tip of the balloon off and stretch it over the end of a funnel",
        "Slowly spoon flour, rice, or cornstarch into the balloon, filling it until it's a firm but squeezable size",
        "Tie the end of the balloon tightly to seal it",
        "Optional: You can create multiple stress balls with different textures by adding glitter or food coloring to the filling",
      ],
      detailText:
        "DIY stress balls can be filled with different materials like rice or flour to create varied textures and resistance levels.",
    },
    {
      id: 3,
      image: sensoryBags,
      title: "DIY Sensory Bags",
      text: "Ideal for mess-free tactile exploration.",
      categories: ["tactile", "visual"],
      materialsTitle: "Materials",
      materials: [
        "Ziploc bags (freezer bags are sturdier)",
        "Hair gel, cooking oil, or corn syrup",
        "Small toys (beads, sequins, buttons, etc.)",
        "Food coloring (optional)",
        "Duct tape (for extra security)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the Ziploc bag with hair gel, corn syrup, or cooking oil",
        "Add small items like beads, buttons, or glitter to the bag",
        "Add food coloring if desired",
        "Seal the bag tightly, then tape over the zipper to prevent leaks",
        "Let children squish, slide, and explore the objects inside the bag",
      ],
      detailText:
        "Sensory bags allow kids to experience different textures and materials in a controlled and engaging way.",
    },
    {
      id: 4,
      image: weightedBlanket,
      title: "DIY Weighted Blanket (Mini Version)",
      text: "Provides comforting pressure for relaxation.",
      categories: ["calming", "tactile"],
      materialsTitle: "Materials",
      materials: [
        "Fabric (soft cotton or fleece)",
        "Thread and needle (or sewing machine)",
        "Small plastic beads (for weight)",
        "Fabric for inner pockets (or use rice as an alternative)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Cut fabric into a desired size (around 12 x 12 for a mini blanket)",
        "Sew it into a pocket shape, leaving space for the beads or rice",
        "Fill each pocket with a small amount of beads or rice for weighted effect",
        "Close the seams securely, and repeat for multiple pockets",
        "Optional: Add a second layer for extra comfort",
      ],
      detailText:
        "A DIY weighted blanket can be tailored to the child's needs by adjusting weight and fabric type.",
    },
    {
      id: 5,
      image: sensoryWallPanel,
      title: "DIY Sensory Wall Panel",
      text: "A wall-mounted exploration tool.",
      categories: ["tactile", "visual", "motor"],
      materialsTitle: "Materials",
      materials: [
        "Wooden board (or a large sturdy foam board)",
        "Velcro strips",
        "Small textured items (fabric swatches, buttons, zippers, keychains)",
        "Colorful ribbons, small mirrors, or safe objects like rubber balls",
        "Hot glue gun or staple gun",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Attach velcro strips to the board in different sections",
        "Create small interactive items with varying textures (e.g., fabric swatches, textured wallpaper, or foam pieces) and attach them to the velcro",
        "Secure ribbons, buttons, and other small, safe objects to the board to encourage tactile interaction",
        "Attach a mirror or reflective piece for visual stimulation",
        "Hang the board at the child's eye level, allowing them to explore the textures and items",
      ],
      detailText:
        "Sensory wall panels include different textures and materials to encourage sensory engagement and motor skills development.",
    },
    {
      id: 6,
      image: sensoryPath,
      title: "DIY Sensory Path",
      text: "Encourages movement and sensory input.",
      categories: ["motor", "tactile"],
      materialsTitle: "Materials",
      materials: [
        "Foam mats or colorful tiles",
        "Carpet squares, textured fabric, or fabric samples",
        "Tape, glue, or staples to secure the materials",
        "Non-slip pads (optional)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Lay down foam mats or carpet squares in a line or pattern on the floor",
        "Attach different textures on top, like fabric, plastic, or rubber mats that children can walk on with their feet",
        "Add areas with different textures (e.g., smooth fabric, bumpy foam, soft carpet) to create an interactive walking path",
        "Secure everything with tape or glue and make sure the surface is safe and non-slip",
        "Allow children to explore the path by walking, crawling, or stepping on different textured areas",
      ],
      detailText:
        "A sensory path can be designed with different textures, colors, and interactive elements to create an engaging experience.",
    },
    {
      id: 7,
      image: tactileBoards,
      title: "DIY Tactile Boards",
      text: "Helps develop fine motor skills.",
      categories: ["tactile", "motor"],
      materialsTitle: "Materials",
      materials: [
        "A sturdy board (wooden, cardboard, or foam)",
        "Fabric swatches (velvet, felt, silk, cotton, etc.)",
        "Textured items like bubble wrap, smooth stones, or rubber mats",
        "Hot glue gun or glue sticks",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Cut fabric swatches into squares and glue them to the board",
        "Attach different textured items like bubble wrap, soft cotton, or velvety fabric to create a variety of tactile experiences",
        "Let children explore each section with their hands to feel the textures",
        "For added fun, you can add small mirrors, buttons, or even safe plastic objects to make the board more interactive",
      ],
      detailText:
        "Tactile boards can feature a variety of textures such as sandpaper, fur, and fabric to engage different sensory receptors.",
    },
    {
      id: 8,
      image: colorSortingJars,
      title: "DIY Color Sorting Jar",
      text: "Encourages color recognition and sorting skills.",
      categories: ["visual", "motor"],
      materialsTitle: "Materials",
      materials: [
        "Clear plastic jar or container",
        "Colored rice, beads, or buttons",
        "Small items to sort (buttons, small toys, etc.)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill a clear jar with colored rice or beads",
        "Add small toys or objects that need sorting (these can be buttons, small figurines, or shapes)",
        "Let the child sift through the rice or beads to find and sort the different items",
        "For added sensory exploration, you can include multiple colored sections in the jar for sorting by color",
      ],
      detailText:
        "Color sorting jars help children learn about colors in a fun and interactive way by using different objects to match colors.",
    },
    {
      id: 9,
      image: calmingGlitterJars,
      title: "DIY Calming Glitter Jars",
      text: "A visual tool for mindfulness and relaxation.",
      categories: ["calming", "visual"],
      materialsTitle: "Materials",
      materials: [
        "A glass jar or plastic container",
        "Glitter glue or clear glue",
        "Glitter",
        "Water",
        "Food coloring (optional)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the jar halfway with water",
        "Add glitter glue or clear glue to thicken the liquid slightly",
        "Pour in glitter and a few drops of food coloring (optional)",
        "Seal the jar tightly, using hot glue to prevent leaks",
        "Shake the jar and watch the glitter swirl around, providing a calming visual effect",
      ],
      detailText:
        "Watching the glitter settle in the jar helps children self-regulate emotions and practice patience.",
    },
    {
      id: 10,
      image: foamSensoryPlay,
      title: "DIY Foam Sensory Play",
      text: "A squishy, interactive sensory activity.",
      categories: ["tactile", "calming"],
      materialsTitle: "Materials",
      materials: [
        "Shaving cream (or homemade fluffy cloud dough)",
        "Food coloring (optional)",
        "Plastic containers or trays for play",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Squirt shaving cream into a shallow tray or plastic bin",
        "Add a few drops of food coloring (optional) to make it more engaging",
        "Allow children to feel and play with the shaving cream, making patterns, shapes, and squishing it between their fingers",
      ],
      detailText:
        "Foam sensory play encourages creativity and fine motor development by allowing children to manipulate foam in different ways.",
    },
  ];

  // Filter products when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.includes(activeFilter)
      );
      setFilteredProducts(filtered);
    }
  }, [activeFilter]);

  return (
    <div className="products-page">
      {/* Filter buttons */}
      <div className="filter-container">
        <h3 className="filter-title">Filter builds:</h3>
        <div className="filter-buttons">
          {productCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-button ${
                activeFilter === category.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <h4 className="more-info">Click any card below for more information</h4>
      </div>

      {/* Products grid */}
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-text">{product.text}</p>
            <div className="product-categories">
              {product.categories.map((category) => (
                <span key={category} className={`category-tag ${category}`}>
                  {productCategories
                    .find((c) => c.id === category)
                    ?.label.replace(" Activities", "")
                    .replace(" Exploration", "")
                    .replace(" Skills", "")
                    .replace(" Stimulation", "")}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>{selectedProduct.detailText}</h1>
            <div className="mat-inst-div">
              <div className="materials-div">
                <h2>{selectedProduct.materialsTitle}</h2>
                <ul>
                  {selectedProduct.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
              <div className="instructions-div">
                <h2>{selectedProduct.instructionsTitle}</h2>
                <ol>
                  {selectedProduct.instructions.map((steps, index) => (
                    <li key={index}>{steps}</li>
                  ))}
                </ol>
              </div>
            </div>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Build;
