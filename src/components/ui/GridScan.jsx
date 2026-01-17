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

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 uScanColor;
uniform float uScanOpacity;
uniform float uScanDuration;
uniform float uScanDelay;

varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    
    // Zaman döngüsü (Bekleme + Geçiş)
    float totalTime = uScanDuration + uScanDelay;
    float t = mod(iTime, totalTime);
    
    // Tarama Çizgisi (Beam)
    float beamPos = (t / uScanDuration) * 4.0 - 2.0; // Ekranı boydan boya geçsin
    
    // Sadece tarama süresi içindeyse göster
    float beam = 0.0;
    if (t < uScanDuration) {
        float dist = abs(p.y - beamPos); // Yatay çizgi aşağı iner
        beam = smoothstep(0.1, 0.0, dist) * 2.0; // Işık kalınlığı
        beam += smoothstep(0.5, 0.0, dist) * 0.5; // Glow (Hale)
    }

    vec3 col = uScanColor * beam * uScanOpacity;
    fragColor = vec4(col, beam * uScanOpacity);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export const GridScan = ({
    scanColor = '#8b5cf6',
    scanOpacity = 0.5,
    scanDuration = 3.0,
    scanDelay = 10.0 // 10 saniye bekle
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const uniforms = {
            iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1) },
            iTime: { value: 0 },
            uScanColor: { value: new THREE.Color(scanColor) },
            uScanOpacity: { value: scanOpacity },
            uScanDuration: { value: scanDuration },
            uScanDelay: { value: scanDelay }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true
        });

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        const resize = () => {
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
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [scanColor, scanOpacity, scanDuration, scanDelay]);

    return <div ref={containerRef} className="gridscan" />;
};

export default GridScan;
