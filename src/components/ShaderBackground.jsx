"use client";
import { useEffect, useRef, useCallback } from "react";

// ─── Vertex Shader ───────────────────────────────────────────
const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// ─── Fragment Shader (smooth mesh gradient with color uniforms) ──
const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform vec3  u_bg;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;
uniform vec3  u_c4;

/* ── Gaussian orb: ultra-smooth falloff ── */
float orb(vec2 uv, vec2 center, float size){
  float d = length(uv - center);
  return exp(-d * d / (2.0 * size * size));
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= aspect;

  float t = u_time * 0.15;

  /* ── Mouse (normalized, aspect-corrected, centered) ── */
  vec2 mouse = u_mouse / u_resolution - 0.5;
  mouse.x *= aspect;

  /* ── Mouse distortion: very soft warp near cursor ── */
  vec2 toMouse = p - mouse;
  float mDist = length(toMouse);
  float warp = exp(-mDist * mDist * 8.0) * 0.06;
  vec2 wp = p + normalize(toMouse + 0.0001) * warp;

  /* ── Orb positions: slow drifting paths ── */
  vec2 p1 = vec2(
    sin(t * 0.7 + 1.0) * 0.4 + cos(t * 0.3) * 0.15,
    cos(t * 0.5 + 2.0) * 0.35 + sin(t * 0.4) * 0.1
  );
  vec2 p2 = vec2(
    cos(t * 0.6 + 3.0) * 0.45 - sin(t * 0.35) * 0.1,
    sin(t * 0.4 + 1.5) * 0.3 + cos(t * 0.5) * 0.15
  );
  vec2 p3 = vec2(
    sin(t * 0.5 + 4.0) * 0.3 + cos(t * 0.45) * 0.2,
    cos(t * 0.65 + 0.5) * 0.4 - sin(t * 0.3) * 0.1
  );
  vec2 p4 = vec2(
    cos(t * 0.55 + 2.5) * 0.35,
    sin(t * 0.45 + 3.5) * 0.35
  );

  /* ── Compute orb intensities ── */
  float o1 = orb(wp, p1, 0.35);
  float o2 = orb(wp, p2, 0.30);
  float o3 = orb(wp, p3, 0.28);
  float o4 = orb(wp, p4, 0.25);

  /* ── Layer colours with soft blending ── */
  vec3 color = u_bg;
  color += u_c1 * o1 * 0.45;
  color += u_c2 * o2 * 0.30;
  color += u_c3 * o3 * 0.35;
  color += u_c4 * o4 * 0.25;

  /* ── Secondary orbs for depth ── */
  float o5 = orb(wp, p1 * -0.6 + vec2(0.1, -0.05), 0.22);
  float o6 = orb(wp, p3 * -0.5 + vec2(-0.15, 0.1), 0.20);
  color += u_c1 * 0.6 * o5 * 0.15;
  color += u_c3 * 0.7 * o6 * 0.12;

  /* ── Mouse glow: wide soft halo + tighter core ── */
  float glowWide = exp(-mDist * mDist * 4.0) * 0.25;
  float glowCore = exp(-mDist * mDist * 18.0) * 0.30;
  vec3 mColor = mix(u_c2, u_c1, sin(t * 2.0) * 0.5 + 0.5);
  color += mColor * glowWide;
  color += (mColor + 0.15) * glowCore;

  /* ── Vignette ── */
  float vig = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.5);
  color *= mix(0.6, 1.0, vig);

  /* ── Subtle film grain ── */
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + u_time) * 43758.5453);
  color += (grain - 0.5) * 0.018;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

// ─── Color presets matching each page theme ──────────────────
const PRESETS = {
  // Contact page: midnightGrape (#1a0e22) — purple/pink/magenta
  contact: {
    bg: [0.02, 0.01, 0.04],
    c1: [0.25, 0.08, 0.55],  // purple
    c2: [0.85, 0.10, 0.50],  // pink
    c3: [0.10, 0.18, 0.65],  // blue
    c4: [0.55, 0.05, 0.60],  // magenta
  },
  // Home page: navy (#101523) — blue/indigo/cyan
  home: {
    bg: [0.03, 0.04, 0.08],
    c1: [0.12, 0.22, 0.55],  // deep blue
    c2: [0.19, 0.36, 0.87],  // blue (#305CDE)
    c3: [0.10, 0.45, 0.65],  // teal-blue
    c4: [0.30, 0.31, 0.90],  // purple-blue (#4c4fe5)
  },
  // Work page: teal (#0f1f20) — green/teal/emerald
  work: {
    bg: [0.02, 0.05, 0.05],
    c1: [0.05, 0.35, 0.30],  // teal
    c2: [0.10, 0.50, 0.40],  // emerald
    c3: [0.08, 0.25, 0.45],  // deep sea
    c4: [0.15, 0.40, 0.35],  // green-teal
  },
};

// ─── Helper: compile a shader ─────────────────────────────────
function compileShader(gl, type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

// ─── Helper: link a program ──────────────────────────────────
function createProgram(gl, vs, fs) {
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

// ═════════════════════════════════════════════════════════════
export default function ShaderBackground({
  speed = 1.0,
  preset = "contact",
  className = "",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const startRef = useRef(null);

  const colors = PRESETS[preset] || PRESETS.contact;

  /* ── mouse tracker ── */
  const handleMouse = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: false }) ||
      canvas.getContext("experimental-webgl", { alpha: false, antialias: false });

    if (!gl) {
      console.warn("WebGL not supported — shader background disabled");
      return;
    }

    /* ── Compile & link ── */
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = createProgram(gl, vs, fs);
    if (!prog) return;

    /* ── Full-screen quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_position");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uBg = gl.getUniformLocation(prog, "u_bg");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");
    const uC4 = gl.getUniformLocation(prog, "u_c4");

    /* ── Resize handler ── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    /* ── Initialize smooth mouse to center ── */
    smoothMouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    mouseRef.current = { ...smoothMouseRef.current };

    /* ── Render loop ── */
    startRef.current = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startRef.current) / 1000.0;

      /* ── Lerp mouse for smooth fluid tracking ── */
      const lerpFactor = 0.035;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpFactor;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpFactor;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, elapsed * speed);
      gl.uniform2f(uRes, canvas.width, canvas.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.uniform2f(
        uMouse,
        smoothMouseRef.current.x * dpr,
        smoothMouseRef.current.y * dpr
      );

      /* ── Pass color uniforms ── */
      gl.uniform3fv(uBg, colors.bg);
      gl.uniform3fv(uC1, colors.c1);
      gl.uniform3fv(uC2, colors.c2);
      gl.uniform3fv(uC3, colors.c3);
      gl.uniform3fv(uC4, colors.c4);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [speed, handleMouse, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`shader-bg ${className}`}
      aria-hidden="true"
    />
  );
}
