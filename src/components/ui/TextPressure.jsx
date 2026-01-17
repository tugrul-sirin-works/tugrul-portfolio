import React from 'react';

const TextPressure = ({
    text = "TEXT",
    textColor = "#FFFFFF",
    minFontSize = 24
}) => {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <h1
                className="font-black text-center leading-none select-none"
                style={{
                    color: textColor,
                    fontSize: `clamp(${minFontSize}px, 15vw, 200px)`,
                    fontFamily: 'Impact, sans-serif' // Fallback for a heavy font
                }}
            >
                {text}
            </h1>
        </div >
    );
};

export default TextPressure;
