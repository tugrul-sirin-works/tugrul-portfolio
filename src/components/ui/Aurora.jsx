import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
out vec4 fragColor;
// ... (Senin paylaştığın Aurora Shader kodu) ...
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // Basit renk geçişi simülasyonu
  fragColor = vec4(uv.x * 0.2, 0.0, uv.y * 0.5, 0.5); 
}
`;

export default function Aurora(props) {
    const ctnDom = useRef(null);
    useEffect(() => {
        if (!ctnDom.current) return;
        const renderer = new Renderer({ alpha: true });
        const gl = renderer.gl;
        ctnDom.current.appendChild(gl.canvas);
        // Program ve Mesh kurulumu...
    }, []);

    return <div ref={ctnDom} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />;
}
