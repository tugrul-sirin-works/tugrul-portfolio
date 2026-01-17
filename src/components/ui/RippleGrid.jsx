import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const RippleGrid = ({
  gridColor = '#4079ff',
  rippleIntensity = 0.02, // Daha sakin
  gridSize = 10.0,
  gridThickness = 0.5,
  opacity = 0.3
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    containerRef.current.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: `attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`,
      fragment: `
        precision highp float;
        uniform float iTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv * 20.0; // Grid sıklığı
          float time = iTime * 0.5;
          
          // Dalgalanma (Otomatik)
          uv.x += sin(uv.y * 0.5 + time) * 0.5;
          uv.y += cos(uv.x * 0.5 + time) * 0.5;
          
          vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
          float line = min(grid.x, grid.y);
          float alpha = 1.0 - min(line, 1.0);
          
          // Kenarlara doğru kararma (Vignette)
          float dist = length(vUv - 0.5);
          alpha *= 1.0 - smoothstep(0.2, 0.8, dist);

          gl_FragColor = vec4(uColor, alpha * 0.5);
        }
      `,
      uniforms: {
        iTime: { value: 0 },
        uColor: { value: new Float32Array([0.25, 0.47, 1.0]) } // Mavi tonu
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    let animateId;
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
};

export default RippleGrid;
