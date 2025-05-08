"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeDModel = ({ onModelLoaded }) => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const hovered = useRef(false);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const cameraRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      1,
      1000
    );
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 15, 35);
    }

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    dLoader.setDecoderConfig({ type: "tsx" });
    loader.setDRACOLoader(dLoader);

    loader.load(
      "/models/Sauce.gltf",
      (gltf: any) => {
        const model = gltf.scene;
        modelRef.current = model;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.scale.set(5, 5, 5);

        model.position.sub(center);

        scene.add(model);
        onModelLoaded();
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (modelRef.current && !hovered.current) {
        modelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, cameraRef.current);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const handlePointerMove = (event) => {
    mouse.x = (event.clientX / mountRef.current.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / mountRef.current.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);

    if (modelRef.current) {
      const intersects = raycaster.intersectObject(modelRef.current, true);
      hovered.current = intersects.length > 0;
    }
  };

  return (
    <div
      ref={mountRef}
      onPointerMove={handlePointerMove}
      style={{ width: "500px", height: "500px" }}
    />
  );
};

export default ThreeDModel;
