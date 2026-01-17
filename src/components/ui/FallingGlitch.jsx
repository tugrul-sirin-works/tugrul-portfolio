"use client";
import React, { useRef, useEffect, useMemo } from "react";

const FallingGlitch = ({ glitchColors = ["#00ff41", "#008f11"], fontSize = 16 }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const chars = useMemo(() => "01DATA_ANALYSIS_SQL_PYTHON_PANDAS_$$".split(""), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");

        let w, h;
        let columns;
        let drops = [];

        const resize = () => {
            w = container.clientWidth;
            h = container.clientHeight;
            canvas.width = w;
            canvas.height = h;
            columns = Math.floor(w / fontSize);
            drops = Array(columns).fill(1);
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = glitchColors[0];
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resize);
        };
    }, [glitchColors, fontSize, chars]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
            <canvas ref={canvasRef} className="block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        </div>
    );
};

export default FallingGlitch;
