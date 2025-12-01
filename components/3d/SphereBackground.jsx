"use client";

import React, { startTransition, useEffect, useRef } from "react";
import { useReducedMotion, useSpring } from "framer-motion";
import { useInViewport } from "../hooks/useInViewport.js";
import { useWindowSize } from "../hooks/useWindowSize.js";
import { throttle } from "../utils/throttle";
import {
  cleanRenderer,
  cleanScene,
  removeLights,
} from "../utils/threeUtils.js";
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from "three";

import fragmentShader from "./displacement-sphere-fragment.glsl";
import vertexShader from "./displacement-sphere-vertex.glsl";

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
};

export default function SphereBackground(props) {
  const theme = "dark";
  const start = useRef(Date.now());
  const canvasRef = useRef();
  const mouse = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const lights = useRef();
  const uniforms = useRef();
  const material = useRef();
  const geometry = useRef();
  const sphere = useRef();
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();
  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);
    renderer.current.outputColorSpace = LinearSRGBColorSpace;

    camera.current = new PerspectiveCamera(
      54,
      innerWidth / innerHeight,
      0.1,
      100
    );
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { type: "f", value: 0 } },
      ]);
      shader.uniforms = uniforms.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };

    startTransition(() => {
      geometry.current = new SphereGeometry(32, 128, 128);
      sphere.current = new Mesh(geometry.current, material.current);
      sphere.current.position.z = 0;
      sphere.current.modifier = Math.random();
      scene.current.add(sphere.current);
    });

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  useEffect(() => {
    const dirLight = new DirectionalLight(
      0xffffff,
      theme === "light" ? 1.8 : 2.0
    );
    const ambientLight = new AmbientLight(
      0xffffff,
      theme === "light" ? 2.7 : 0.4
    );

    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;

    lights.current = [dirLight, ambientLight];
    lights.current.forEach((light) => scene.current.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [theme]);

  useEffect(() => {
    const { width, height } = windowSize;
    if (!renderer.current || !camera.current || !sphere.current) return;
    const adjustedHeight = height + height * 0.3;
    renderer.current.setSize(width, adjustedHeight);
    camera.current.aspect = width / adjustedHeight;
    camera.current.updateProjectionMatrix();

    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current);
    }

    const mediaMobile = 768;
    const mediaTablet = 1024;

    if (width <= mediaMobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (width <= mediaTablet) {
      sphere.current.position.x = 18;
      sphere.current.position.y = 14;
    } else {
      sphere.current.position.x = 22;
      sphere.current.position.y = 16;
    }
  }, [reduceMotion, windowSize]);

  useEffect(() => {
    const onMouseMove = throttle((event) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
      rotationX.set(position.y / 2);
      rotationY.set(position.x / 2);
    }, 100);

    if (!reduceMotion && isInViewport) {
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (
        uniforms.current &&
        sphere.current &&
        renderer.current &&
        scene.current &&
        camera.current
      ) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
        sphere.current.rotation.z += 0.001;
        sphere.current.rotation.x = rotationX.get();
        sphere.current.rotation.y = rotationY.get();
        renderer.current.render(scene.current, camera.current);
      }
    };

    if (
      !reduceMotion &&
      isInViewport &&
      renderer.current &&
      scene.current &&
      camera.current
    ) {
      animate();
    } else if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  return (
    <canvas
      aria-hidden
      className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-[3s]"
      ref={canvasRef}
      style={{
        visibility: isInViewport ? "visible" : "hidden",
        opacity: isInViewport ? 1 : 0,
      }}
      {...props}
    />
  );
}
