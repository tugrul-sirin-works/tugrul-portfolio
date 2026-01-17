import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const RippleGrid = ({
  gridColor = '#ffffff',
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  mouseInteraction = true
}) => {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);

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
      alpha: true,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight
    });

    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Canvas'ı tam oturt
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';

    containerRef.current.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec3 gridColor;
        uniform float rippleIntensity;
        uniform float gridSize;
        uniform vec2 mousePosition;
        uniform float mouseInfluence;
        varying vec2 vUv;

        #define PI 3.14159265359

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= iResolution.x / iResolution.y;

          // Mouse Etkileşimi
          vec2 mouse = mousePosition * 2.0 - 1.0;
          mouse.x *= iResolution.x / iResolution.y;
          
          float d = length(uv - mouse);
          float ripple = sin(d * 10.0 - iTime * 2.0) * exp(-d * 3.0) * mouseInfluence * rippleIntensity;
          
          vec2 distortedUV = uv + normalize(uv - mouse) * ripple;
          
          // Grid Çizimi
          vec2 grid = abs(fract(distortedUV * gridSize - 0.5) - 0.5) / fwidth(distortedUV * gridSize);
          float line = min(grid.x, grid.y);
          float alpha = 1.0 - smoothstep(0.0, 0.1, line);
          
          // Kenar Karartma (Vignette)
          float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 2.0);
          
          gl_FragColor = vec4(gridColor, alpha * vignette * 0.5);
        }
      `,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [0, 0] },
        gridColor: { value: hexToRgb(gridColor) },
        rippleIntensity: { value: rippleIntensity },
        gridSize: { value: gridSize },
        mousePosition: { value: [0.5, 0.5] },
        mouseInfluence: { value: 0 }
      },
      transparent: true
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.iResolution.value = [width, height];
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePositionRef.current = { x, y };
      mouseInfluenceRef.current = 1.0; // Mouse içerideyken dalga başlasın
    };

    // Global dinle ki yazı üzerindeyken de çalışsın
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const update = (t) => {
      animationId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;

      // Mouse pozisyonunu güncelle
      program.uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];

      // Yumuşak geçiş (Lerp)
      program.uniforms.mouseInfluence.value += (mouseInfluenceRef.current - program.uniforms.mouseInfluence.value) * 0.1;

      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && containerRef.current.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [gridColor, rippleIntensity, gridSize]);

  // BURASI KRİTİK: position: absolute ile tüm alanı kaplamaya zorluyoruz
  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default RippleGrid;
