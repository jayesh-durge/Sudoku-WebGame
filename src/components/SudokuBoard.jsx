import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SudokuBoard() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      0.6*window.innerWidth / (0.69* window.innerHeight),
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize( 0.6* window.innerWidth,  0.69*window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance=11;
    controls.maxDistance=15;
    camera.position.z = 11;

    const loader = new THREE.TextureLoader();
    const loadTexture = (url) =>
      new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    async function init() {
      const startTime = Date.now();
      try {
        const [normal, depth] = await Promise.all([
          loadTexture("./../../normal1.png"),
          loadTexture("./../../depth1.png"),
        ]);

        normal.colorSpace = THREE.SRGBColorSpace;

        const board = new Array(9);
        for (let z = 0; z < 9; z++) {
          board[z] = new Array(9);
          for (let y = 0; y < 9; y++) {
            board[z][y] = new Array(9);
            for (let x = 0; x < 9; x++) {
              const isOuter =
                x === 0 || x === 8 || y === 0 || y === 8 || z === 0 || z === 8;

              if (isOuter) {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({
                  map: normal,
                  displacementMap: depth,
                  displacementScale: 0.001,
                });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(x - 4, y - 4, z - 4);
                scene.add(cube);
                board[z][y][x] = cube;
              }
            }
          }
        }

        const elapsed = Date.now() - startTime;
        const remaining = 2000 - elapsed;
        if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

        setLoaded(true);
        animate();
      } catch (err) {
        console.error("Error loading textures:", err);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    init();

    function handleResize() {
      camera.aspect =0.6*window.innerWidth / (0.69* window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(0.6* window.innerWidth, 0.69* window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
       className="relative w-[60vw] h-[65vh] mx-auto flex justify-center items-center"
    >
      {!loaded && (
        <div
          className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0)] rounded-[12px]"
        >
          <DotLottieReact src="./loading.json" loop autoplay />
        </div>
      )}

      <canvas
        ref={canvasRef}
         className={`w-full h-full transform -translate-y-[6px] ${loaded ? "block" : "hidden"}`}
      />
    </div>
  );
}

export default SudokuBoard;
