import React from 'react';

const AnimatedButton = ({
    text,
    primaryColor = "#33a5ce",
    hoverColor = "#fa507e",
    textColor = "white",
    className = "",
    onClick,
    type = "button",
    disabled = false,
    size = "medium"
}) => {
    // Define size classes
    const sizeClasses = {
        small: "py-2 px-8 text-sm",
        medium: "py-3 px-12 text-lg",
        large: "py-4 px-16 text-xl"
    };

    // Create button style to handle dynamic colors through inline styles
    const buttonStyle = {
        backgroundColor: primaryColor,
        color: textColor
    };

    // Hover style will be applied through the onMouseEnter/onMouseLeave events
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
        if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!disabled) setIsHovered(false);
    };

    // Update style when hovered
    if (isHovered) {
        buttonStyle.backgroundColor = hoverColor;
    }

    // Combine all classes (without the dynamic color classes)
    const buttonClasses = `
    relative 
    overflow-hidden 
    font-extrabold 
    ${sizeClasses[size]} 
    rounded-full 
    transform 
    transition-all 
    duration-300 
    ${isHovered ? 'scale-105' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
    ${className}
  `;

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    );
};

export default AnimatedButton;