import React, { useState } from "react";
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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      image: sensoryBottles,
      title: "DIY Sensory Bottles",
      text: "These bottles can be used for calm-down activities, improving focus and reducing anxiety.",
      materialsTitle: "Materials Needed",
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
      materialsTitle: "Materials Needed",
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
        "Slowly spoon flour, rice, or cornstarch into the balloon, filling it until it’s a firm but squeezable size",
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
      materialsTitle: "Materials Needed",
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
      materialsTitle: "Materials Needed",
      materials: [
        "Fabric (soft cotton or fleece)",
        "Thread and needle (or sewing machine)",
        " Small plastic beads (for weight)",
        "Fabric for inner pockets (or use rice as an alternative)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "A DIY weighted blanket can be tailored to the child’s needs by adjusting weight and fabric type.",
    },
    {
      id: 5,
      image: sensoryWallPanel,
      title: "DIY Sensory Wall Panel",
      text: "A wall-mounted exploration tool.",
      materialsTitle: "Materials Needed",
      materials: [
        "Wooden board (or a large sturdy foam board)",
        "Velcro strips",
        "Small textured items (fabric swatches, buttons, zippers, keychains)",
        "Colorful ribbons, small mirrors, or safe objects like rubber balls",
        "Hot glue gun or staple gun",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Sensory wall panels include different textures and materials to encourage sensory engagement and motor skills development.",
    },
    {
      id: 6,
      image: sensoryPath,
      title: "DIY Sensory Path",
      text: "Encourages movement and sensory input.",
      materialsTitle: "Materials Needed",
      materials: [
        "Foam mats or colorful tiles",
        "Carpet squares, textured fabric, or fabric samples",
        "Tape, glue, or staples to secure the materials",
        "Non-slip pads (optional)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "A sensory path can be designed with different textures, colors, and interactive elements to create an engaging experience.",
    },
    {
      id: 7,
      image: tactileBoards,
      title: "DIY Tactile Boards",
      text: "Helps develop fine motor skills.",
      materialsTitle: "Materials Needed",
      materials: [
        "A sturdy board (wooden, cardboard, or foam)",
        "Fabric swatches (velvet, felt, silk, cotton, etc.)",
        "Textured items like bubble wrap, smooth stones, or rubber mats",
        "Hot glue gun or glue sticks",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Tactile boards can feature a variety of textures such as sandpaper, fur, and fabric to engage different sensory receptors.",
    },
    {
      id: 8,
      image: colorSortingJars,
      title: "DIY Color Sorting Jar",
      text: "Encourages color recognition and sorting skills.",
      materialsTitle: "Materials Needed",
      materials: [
        "Clear plastic jar or container",
        "Colored rice, beads, or buttons",
        "Small items to sort (buttons, small toys, etc.)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Color sorting jars help children learn about colors in a fun and interactive way by using different objects to match colors.",
    },
    {
      id: 9,
      image: calmingGlitterJars,
      title: "DIY Calming Glitter Jars",
      text: "A visual tool for mindfulness and relaxation.",
      materialsTitle: "Materials Needed",
      materials: [
        "A glass jar or plastic container",
        "Glitter glue or clear glue",
        "Glitter",
        "Water",
        "Food coloring (optional)",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Watching the glitter settle in the jar helps children self-regulate emotions and practice patience.",
    },
    {
      id: 10,
      image: foamSensoryPlay,
      title: "DIY Foam Sensory Play",
      text: "A squishy, interactive sensory activity.",
      materialsTitle: "Materials Needed",
      materials: [
        "Shaving cream (or homemade fluffy cloud dough)",
        "Food coloring (optional)",
        "Plastic containers or trays for play",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Fill the bottle with glitter, small beads, or sequins",
        "Add water and glycerin (or clear hair gel for slower movement)",
        "Seal the lid tightly with hot glue to avoid spills",
        "Shake the bottle and observe the objects move, which can be calming and engaging",
      ],
      detailText:
        "Foam sensory play encourages creativity and fine motor development by allowing children to manipulate foam in different ways.",
    },
  ];

  return (
    <div className="products-container">
      {products.map((product) => (
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
        </div>
      ))}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>{selectedProduct.detailText}</h1>
            <h2>{selectedProduct.materialsTitle}</h2>
            <ul>
              {selectedProduct.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
            <h2>{selectedProduct.instructionsTitle}</h2>
            <ol>
              {selectedProduct.instructions.map((steps, index) => (
                <li key={index}>{steps}</li>
              ))}
            </ol>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
