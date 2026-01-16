import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const RippleGrid = ({
    gridColor = '#ffffff',
    rippleIntensity = 0.05,
    gridSize = 10.0,
    gridThickness = 15.0,
    opacity = 0.3,
    mouseInteraction = true
}) => {
    const containerRef = useRef(null);
    const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
    const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
    const mouseInfluenceRef = useRef(0);
    const uniformsRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const hexToRgb = hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
                : [1, 1, 1];
        };

        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true
        });
        const gl = renderer.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        containerRef.current.appendChild(gl.canvas);

        const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 gridColor;
      uniform float rippleIntensity;
      uniform float gridSize;
      uniform float gridThickness;
      uniform float opacity;
      uniform vec2 mousePosition;
      uniform float mouseInfluence;
      varying vec2 vUv;

      float pi = 3.141592;

      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        float dist = length(uv);
        float func = sin(pi * (iTime - dist));
        vec2 rippleUv = uv + uv * func * rippleIntensity;

        if (mouseInfluence > 0.0) {
            vec2 mouseUv = (mousePosition * 2.0 - 1.0);
            mouseUv.x *= iResolution.x / iResolution.y;
            float mouseDist = length(uv - mouseUv);
            float influence = mouseInfluence * exp(-mouseDist * mouseDist / 1.0);
            float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
            rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
        }

        vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
        vec2 b = abs(a);
        float aaWidth = 0.5;
        vec2 smoothB = vec2(smoothstep(0.0, aaWidth, b.x), smoothstep(0.0, aaWidth, b.y));

        vec3 color = vec3(0.0);
        color += exp(-gridThickness * smoothB.x);
        color += exp(-gridThickness * smoothB.y);

        float finalAlpha = length(color) * opacity;
        gl_FragColor = vec4(gridColor * color, finalAlpha);
      }
    `;

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [1, 1] },
            gridColor: { value: hexToRgb(gridColor) },
            rippleIntensity: { value: rippleIntensity },
            gridSize: { value: gridSize },
            gridThickness: { value: gridThickness },
            opacity: { value: opacity },
            mousePosition: { value: [0.5, 0.5] },
            mouseInfluence: { value: 0 }
        };

        uniformsRef.current = uniforms;

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            if (!containerRef.current) return;
            const { clientWidth: w, clientHeight: h } = containerRef.current;
            renderer.setSize(w, h);
            uniforms.iResolution.value = [w, h];
        };

        const handleMouseMove = e => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMouseRef.current = { x, y };
            mouseInfluenceRef.current = 1.0;
        };

        window.addEventListener('resize', resize);
        if (mouseInteraction) {
            containerRef.current.addEventListener('mousemove', handleMouseMove);
        }
        resize();

        let reqId;
        const render = t => {
            if (!uniformsRef.current) return;
            uniforms.iTime.value = t * 0.001;

            const lerpFactor = 0.1;
            mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;
            mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;
            uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];
            uniforms.mouseInfluence.value = mouseInfluenceRef.current;

            renderer.render({ scene: mesh });
            reqId = requestAnimationFrame(render);
        };

        reqId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(reqId);
            window.removeEventListener('resize', resize);
            if (mouseInteraction && containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [gridColor, rippleIntensity, gridSize, gridThickness, opacity, mouseInteraction]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default RippleGrid;
