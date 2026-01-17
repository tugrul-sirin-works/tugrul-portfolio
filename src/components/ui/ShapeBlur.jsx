import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Shader Kodları (Senin verdiğin kodun optimize hali)
const vertexShader = `varying vec2 v_texcoord; void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); v_texcoord = uv; }`;
const fragmentShader = `
varying vec2 v_texcoord;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = v_texcoord;
    vec3 color = vec3(0.0);
    
    // Sıvımsı Efekt
    float time = u_time * 0.5;
    vec2 p = st * 2.0 - 1.0;
    
    float r = length(p);
    float a = atan(p.y, p.x);
    
    float f = cos(a * 3.0 + time) * 0.1 + sin(r * 5.0 + time) * 0.1;
    
    color = vec3(0.1, 0.4, 0.8) * (1.0 - smoothstep(0.3 + f, 0.32 + f, r)); // Mavi
    
    gl_FragColor = vec4(color, color.r); // Alpha kanalı renge bağlı
}
`;

const ShapeBlur = () => {
    const mountRef = useRef();
    useEffect(() => {
        const mount = mountRef.current;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                u_time: { value: 0 },
                u_resolution: { value: new THREE.Vector2() }
            },
            transparent: true
        });

        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        const resize = () => {
            const { clientWidth, clientHeight } = mount;
            renderer.setSize(clientWidth, clientHeight);
            material.uniforms.u_resolution.value.set(clientWidth, clientHeight);
        };
        window.addEventListener('resize', resize);
        resize();

        let req;
        const animate = (time) => {
            req = requestAnimationFrame(animate);
            material.uniforms.u_time.value = time * 0.001;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(req);
            window.removeEventListener('resize', resize);
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};
export default ShapeBlur;
