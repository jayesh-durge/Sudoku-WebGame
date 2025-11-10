import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import normal from "./../assets/9normal-removebg-preview.png";

function SudokuBoard() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      (0.6 * window.innerWidth) / (0.69 * window.innerHeight),
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(0.6 * window.innerWidth, 0.69 * window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 20;

    const loader = new THREE.TextureLoader();
    const loadTexture = (url) =>
      new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    async function init() {
      const startTime = Date.now();

      try {
        const texture = await loadTexture(normal);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;

        const gridSize = 9;
        const spacing = 1;
        const offset = (gridSize - 1) / 2;

        const baseMaterial = new THREE.MeshBasicMaterial({
          color: 0xff88f,
          side: THREE.DoubleSide,
        });

        const textureMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 1.0,
          side: THREE.FrontSide,
        });


        const geometry = new THREE.PlaneGeometry(1, 1);

        function createFace(axis, dir, rotation) {
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              const basePlane = new THREE.Mesh(geometry, baseMaterial);
              const texPlane = new THREE.Mesh(geometry, textureMaterial);
              const edge=new THREE.EdgesGeometry(geometry);
              const lineMaterial = new THREE.LineBasicMaterial({ color: "white", linewidth: 2 });
              const border = new THREE.LineSegments(edge, lineMaterial);
              const group = new THREE.Group();
              group.add(basePlane);
              group.add(texPlane);
              group.add(border);
              let x = 0,
                y = 0,
                z = 0;

              if (axis === "z") {
                x = (i - offset) * spacing;
                y = (j - offset) * spacing;
                z = dir * offset * spacing+dir*0.5;
              } else if (axis === "x") {
                z = (i - offset) * spacing;
                y = (j - offset) * spacing;
                x = dir * offset * spacing+dir*0.5;
              } else if (axis === "y") {
                x = (i - offset) * spacing;
                z = (j - offset) * spacing;
                y = dir * offset * spacing+dir*0.5;
              }

              group.position.set(x, y, z);
              group.rotation.set(rotation.x, rotation.y, rotation.z);
              scene.add(group);
            }
          }
        }

        createFace("z", +1, { x: 0, y: 0, z: 0 });
        createFace("z", -1, { x: 0, y: Math.PI, z: 0 });
        createFace("x", +1, { x: 0, y: Math.PI / 2, z: 0 });
        createFace("x", -1, { x: 0, y: -Math.PI / 2, z: 0 });
        createFace("y", +1, { x: -Math.PI / 2, y: 0, z: 0 });
        createFace("y", -1, { x: Math.PI / 2, y: 0, z: 0 });


        const elapsed = Date.now() - startTime;
        const remaining = 2000 - elapsed;
        if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

        setLoaded(true);
        animate();
      } catch (err) {
        console.error("Error loading texture:", err);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    init();

    function handleResize() {
      camera.aspect =
        (0.6 * window.innerWidth) / (0.69 * window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(0.6 * window.innerWidth, 0.69 * window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-[60vw] h-[65vh] mx-auto flex justify-center items-center">
      {!loaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0)] rounded-[12px]">
          <DotLottieReact src="./../../loading.json" loop autoplay />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full transform -translate-y-[6px] ${
          loaded ? "block" : "hidden"
        }`}
      />
    </div>
  );
}

export default SudokuBoard;
