import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float u_maskRadius;
uniform float u_slices;
uniform float u_rotation;
uniform vec3 u_innerColor;
uniform vec3 u_outerColor;
uniform sampler2D u_texture;

const float PI = 3.14159265359;

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float angle = atan(uv.y, uv.x);
  float normalizedAngle = (angle / (2.0 * PI)) + 0.5;

  float rotation = u_rotation * u_slices;
  float sector = fract(normalizedAngle - rotation + 0.5);
  float mask = 1.0 - step(u_maskRadius, sector);
  float border = 1.0 - smoothstep(u_maskRadius, u_maskRadius + 0.008, sector);

  vec4 texColor = texture2D(u_texture, vUv);
  vec3 finalColor = mix(u_outerColor, u_innerColor, mask);
  finalColor = mix(finalColor, vec3(0.0), border * 0.7);
  gl_FragColor = vec4(finalColor, texColor.a * (1.0 - mask));
}
`;

function createTextTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const size = 2048;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  // Draw text with high quality settings
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Use a large, bold font
  const fontSize = 220;
  ctx.font = `900 ${fontSize}px Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const words = text.split(' ');
  const lineHeight = fontSize * 1.1;

  if (words.length > 1) {
    const startY = size / 2 - ((words.length - 1) * lineHeight) / 2;
    words.forEach((word, i) => {
      ctx.fillText(word.toUpperCase(), size / 2, startY + i * lineHeight);
    });
  } else {
    ctx.fillText(text.toUpperCase(), size / 2, size / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

interface RotationalRevealProps {
  text?: string;
  videoSrc?: string;
  backgroundText?: string;
}

export default function RotationalReveal({
  text = 'TRANSFORMING',
  videoSrc = '/videos/sustainability.mp4',
  backgroundText = 'PRESERVING THE FUTURE',
}: RotationalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      u_maskRadius: { value: 0.35 },
      u_slices: { value: 4.0 },
      u_rotation: { value: 0.0 },
      u_innerColor: { value: new THREE.Color('#2d5a3d') },
      u_outerColor: { value: new THREE.Color('#ffffff') },
      u_texture: { value: createTextTexture(text) },
    }),
    [text]
  );

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Clean up any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1.5,
      onUpdate: (self) => {
        uniforms.u_rotation.value = self.progress;
      },
    });

    let rafId: number;
    const animate = () => {
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      trigger.kill();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [uniforms]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white/[0.08] text-[clamp(48px,10vw,160px)] font-bold uppercase leading-none tracking-[-0.02em] text-center select-none">
          {backgroundText}
        </h2>
      </div>

      {/* Three.js canvas overlay */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: 'none' }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
          Solterraform Philosophy
        </p>
        <h2 className="text-white text-[clamp(32px,6vw,72px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] max-w-4xl">
          {backgroundText}
        </h2>
        <p className="text-white/60 text-sm max-w-xl mt-6 leading-relaxed">
          Fueling unique innovations for preserving and transforming the future
          of our world. Every solution begins with understanding the materials
          and energy that sustain us.
        </p>
      </div>
    </section>
  );
}
