import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './GridScan.css';

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// MOR TÜNEL SHADER'I (React Bits Style)
const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 uColor;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    // Tünel Hareketi
    float speed = iTime * 0.4;
    
    // Tünel Matematiği (1/r = derinlik)
    float r = length(uv);
    float a = atan(uv.y, uv.x) / 3.141592; // Açı
    
    // UV Koordinatlarını bükerek tünel yapma
    vec2 tun = vec2(0.3 / r + speed, a);
    
    // Grid Çizimi
    float gridScale = 10.0; // Izgara sıklığı
    vec2 grid = abs(fract(tun * gridScale - 0.5) - 0.5) / fwidth(tun * gridScale);
    float line = min(grid.x, grid.y);
    
    // Çizgi kalınlığı ve yumuşatma
    float val = 1.0 - smoothstep(0.0, 0.2, line);
    
    // Merkezdeki siyahlığı sağla (Sonsuzluk hissi)
    float fog = smoothstep(0.0, 0.8, r);
    
    // Renk (Mor)
    vec3 col = uColor * val * fog;
    
    // Ekstra parlama
    col += uColor * 0.2 * fog;

    fragColor = vec4(col, fog * val); // Alpha kanalını da ayarla
}

void main(){
  vec4 c;
  mainImage(c, gl_FragCoord.xy);
  gl_FragColor = c;
}
`;

export const GridScan = ({
    scanColor = '#bd00ff', // NEON MOR
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const uniforms = {
            iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1) },
            iTime: { value: 0 },
            uColor: { value: new THREE.Color(scanColor) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            blending: THREE.AdditiveBlending // Işık efekti gibi parlasın
        });

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        const resize = () => {
            if (!container) return;
            renderer.setSize(container.clientWidth, container.clientHeight);
            uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, 1);
        };
        window.addEventListener('resize', resize);

        let req;
        const animate = (time) => {
            req = requestAnimationFrame(animate);
            uniforms.iTime.value = time * 0.001;
            renderer.render(scene, camera);
        };
        animate(0);

        return () => {
            cancelAnimationFrame(req);
            window.removeEventListener('resize', resize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [scanColor]);

    return <div ref={containerRef} className="gridscan" />;
};

export default GridScan;
