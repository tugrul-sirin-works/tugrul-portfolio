import { useEffect, useRef } from 'react';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect } from 'postprocessing';
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
uniform vec3 uLinesColor;
uniform float uGridScale;
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    
    // Tünel Hareketi
    float speed = iTime * 0.5;
    vec2 uv = p;
    
    // Perspektif / Tünel matematiği
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Grid oluşturma
    vec2 gridUV = vec2(0.5 / r + speed, a / 3.14159);
    
    float gridScale = uGridScale * 20.0;
    vec2 grid = abs(fract(gridUV * gridScale) - 0.5) / fwidth(gridUV * gridScale);
    float line = min(grid.x, grid.y);
    float alpha = 1.0 - min(line, 1.0);
    
    // Derinlik hissi (Ortası karanlık)
    float fade = smoothstep(0.0, 0.5, r);
    
    vec3 col = mix(uLinesColor, uScanColor, alpha);
    col *= fade; // Merkeze doğru karart

    // Scan benzeri parlama
    float beam = smoothstep(0.4, 0.6, abs(fract(gridUV.x * 0.5 - iTime * 0.2) - 0.5));
    col += uScanColor * beam * 0.5 * fade;

    fragColor = vec4(col, fade); // Kenarlar şeffaf olmasın, orta delik olsun
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

function srgbColor(hex) {
    const c = new THREE.Color(hex);
    return c.convertSRGBToLinear();
}

export const GridScan = ({
    linesColor = '#392e4e',
    scanColor = '#FF9FFC', // Senin istediğin Mor/Pembe
    gridScale = 0.1,
    bloomIntensity = 0.5,
    bloomThreshold = 0.2,
    bloomSmoothing = 0.1,
    chromaticAberration = 0.003
}) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const materialRef = useRef(null);
    const composerRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const uniforms = {
            iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio()) },
            iTime: { value: 0 },
            uLinesColor: { value: srgbColor(linesColor) },
            uScanColor: { value: srgbColor(scanColor) },
            uGridScale: { value: gridScale }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            blending: THREE.AdditiveBlending // Arka planla karışsın
        });
        materialRef.current = material;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        // Post Processing (Bloom & Glitch Effect)
        const composer = new EffectComposer(renderer);
        composerRef.current = composer;
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloom = new BloomEffect({ intensity: 1.0, luminanceThreshold: bloomThreshold, luminanceSmoothing: bloomSmoothing });
        bloom.blendMode.opacity.value = bloomIntensity;

        const chroma = new ChromaticAberrationEffect({ offset: new THREE.Vector2(chromaticAberration, chromaticAberration) });

        const effectPass = new EffectPass(camera, bloom, chroma);
        effectPass.renderToScreen = true;
        composer.addPass(effectPass);

        const onResize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
            composer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const tick = (time) => {
            material.uniforms.iTime.value = time * 0.001;
            composer.render();
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            material.dispose();
            quad.geometry.dispose();
            composer.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, [linesColor, scanColor, gridScale, bloomIntensity, bloomThreshold, chromaticAberration]);

    return <div ref={containerRef} className="gridscan" />;
};

export default GridScan;
