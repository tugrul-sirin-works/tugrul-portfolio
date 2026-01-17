import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform float uStarSpeed;
varying vec2 vUv;

// Basit Rastgelelik (Noise)
float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Yıldızları Çizen Fonksiyon
vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y=-1; y<=1; y++) {
        for(int x=-1; x<=1; x++) {
            vec2 offs = vec2(x, y);
            float n = Hash21(id + offs);
            float size = fract(n * 345.32);
            float star = length(gv - offs - vec2(n, fract(n*34.0)) + 0.5);
            
            vec3 color = sin(vec3(0.2, 0.3, 0.9) * fract(n*2345.2) * 123.2) * 0.5 + 0.5;
            // Parlaklık ve Boyut
            float m = smoothstep(0.9 * size, 0.0, star); 
            col += m * color;
        }
    }
    return col;
}

void main() {
  vec2 uv = (vUv - 0.5) * uResolution.xy / uResolution.y;
  vec3 col = vec3(0.0);
  float t = uTime * 0.05;
  
  // Döndürme
  mat2 rot = mat2(cos(t), -sin(t), sin(t), cos(t));
  uv *= rot;

  // Katmanlı Yıldızlar (Derinlik Hissi)
  for(float i=0.0; i<1.0; i+=1.0/3.0) {
      float depth = fract(i + t);
      float scale = mix(20.0, 0.5, depth);
      float fade = depth * smoothstep(1.0, 0.9, depth);
      col += StarLayer(uv * scale + i * 453.2) * fade;
  }
  
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Galaxy() {
    const ctnDom = useRef(null);
    useEffect(() => {
        if (!ctnDom.current) return;
        const renderer = new Renderer({ alpha: false });
        const gl = renderer.gl;
        ctnDom.current.appendChild(gl.canvas);

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
            }
        });

        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        let animateId;
        const update = (t) => {
            animateId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        animateId = requestAnimationFrame(update);

        const resize = () => {
            const { clientWidth, clientHeight } = ctnDom.current;
            renderer.setSize(clientWidth, clientHeight);
            program.uniforms.uResolution.value = new Color(clientWidth, clientHeight, clientWidth / clientHeight);
        }
        window.addEventListener('resize', resize);
        resize();

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            ctnDom.current?.removeChild(gl.canvas);
        };
    }, []);

    return <div ref={ctnDom} className="absolute inset-0 w-full h-full" />;
}
