// sudoku-neon-cube.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/////////////////////
// Scene + Camera
/////////////////////
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020208);  // Darker background for better contrast

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 200);
camera.position.set(16, 14, 18);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.style.margin = '0';
document.body.appendChild(renderer.domElement);

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedCube = null;

/////////////////////
// Controls
/////////////////////
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

/////////////////////
// Lighting
/////////////////////
const ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 0.5);
dir.position.set(10, 20, 10);
scene.add(dir);

// add a faint rim light for depth
const rim = new THREE.PointLight(0x88ccff, 0.25, 100);
rim.position.set(-10, 10, -10);
scene.add(rim);

// Add additional point lights for enhanced glow
const glowLight1 = new THREE.PointLight(0xffffff, 0.3, 50);
glowLight1.position.set(15, 15, 15);
scene.add(glowLight1);

const glowLight2 = new THREE.PointLight(0xff4fa3, 0.2, 40);
glowLight2.position.set(-15, -15, 15);
scene.add(glowLight2);

const glowLight3 = new THREE.PointLight(0x2fe8ff, 0.2, 40);
glowLight3.position.set(15, -15, -15);
scene.add(glowLight3);

/////////////////////
// Postprocessing (bloom)
/////////////////////
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// UnrealBloomPass(resolution, strength, radius, threshold)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.9, 0.6, 0.1);
bloomPass.strength = 2.0;  // Increased bloom for more dramatic highlighting
bloomPass.radius = 0.8;    // Larger radius for better glow spread
bloomPass.threshold = 0.08; // Lower threshold to catch highlight colors
composer.addPass(bloomPass);

/////////////////////
// Parameters for sudoku cube
/////////////////////
const GRID_SIZE = 9; // 9 x 9 grid per face
const CELL_GAP = 0.04;
const CELL_SIZE = 0.65; // side length of mini cube
// distance from center to face grid center
const FACE_OFFSET = (GRID_SIZE / 2) * (CELL_SIZE + CELL_GAP) - (CELL_SIZE + CELL_GAP) / 2;

/////////////////////
// Helpers
/////////////////////

// cache textures for numbers 1..9 so we don't recreate canvases excessively
const numberTextureCache = new Map();
function createNumberTexture(number, bg = 'rgba(20,20,40,0.95)', textColor = '#bb77ff') {
  const key = `${number}|${bg}|${textColor}`;
  if (numberTextureCache.has(key)) return numberTextureCache.get(key);

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  // background (dark but not too dark for contrast)
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // Add a subtle violet border for better definition
  ctx.strokeStyle = 'rgba(187,119,255,0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, size - 16, size - 16);

  // Add controlled violet glow effect behind the number
  ctx.save();
  ctx.shadowColor = 'rgba(187,119,255,0.9)';
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#bb77ff';
  ctx.font = 'bold 160px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(number), size / 2, size / 2);
  ctx.restore();

  // Main violet number - large and bold for readability
  ctx.fillStyle = '#bb77ff';
  ctx.font = 'bold 160px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(number), size / 2, size / 2);

  // Add a subtle text outline for better contrast
  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
  ctx.lineWidth = 2;
  ctx.strokeText(String(number), size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  numberTextureCache.set(key, texture);
  return texture;
}

// Create a material for numbered faces with controlled glow
function createTileMaterialWithNumber(n, isSelected = false, isHighlighted = false) {
  const map = createNumberTexture(n);
  let color, emissive, emissiveIntensity;
  
  if (isSelected) {
    // Selected face - bright yellow/orange for maximum visibility
    color = 0xffaa00;
    emissive = 0xff4400;
    emissiveIntensity = 0.6;
  } else if (isHighlighted) {
    // Highlighted face (same row/column) - bright cyan/blue for strong contrast
    color = 0x00ddff;
    emissive = 0x0088ff;
    emissiveIntensity = 0.4;
  } else {
    // Normal face - white
    color = 0xffffff;
    emissive = 0x4a2a6a;
    emissiveIntensity = 0.1;
  }
  
  return new THREE.MeshLambertMaterial({
    map,
    color: color,
    emissive: emissive,
    emissiveIntensity: emissiveIntensity,
    transparent: false,
    opacity: 1.0
  });
}

// Update specific face material with selection state
function updateFaceMaterial(cubeData, faceIndex, number, isSelected = false, isHighlighted = false) {
  const materials = cubeData.mesh.material;
  const newMaterial = createTileMaterialWithNumber(number, isSelected, isHighlighted);
  materials[faceIndex] = newMaterial;
  cubeData.mesh.material = materials;
}

// Update cube materials with selection state for all faces
function updateCubeMaterial(cubeData, number, isSelected = false) {
  const numberedMaterial = createTileMaterialWithNumber(number, isSelected);
  const materials = [
    numberedMaterial, // right face (+X)
    numberedMaterial, // left face (-X)
    numberedMaterial, // top face (+Y)
    numberedMaterial, // bottom face (-Y)
    numberedMaterial, // front face (+Z)
    numberedMaterial  // back face (-Z)
  ];
  cubeData.mesh.material = materials;
  cubeData.currentNumber = number;
  cubeData.isSelected = isSelected;
}

// Get grid position from world coordinates
function getGridPosition(x, y, z) {
  const gridX = Math.round(x / step) + Math.floor(GRID_SIZE / 2);
  const gridY = Math.round(y / step) + Math.floor(GRID_SIZE / 2);
  const gridZ = Math.round(z / step) + Math.floor(GRID_SIZE / 2);
  return { gridX, gridY, gridZ };
}

// Get face normal from face index
function getFaceNormal(faceIndex) {
  const faceNormals = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
  return faceNormals[faceIndex];
}

// Get row and column indices for a face based on its normal and grid position
function getRowColumn(gridPos, faceNormal) {
  switch (faceNormal) {
    case 'px': // right face (+X)
    case 'nx': // left face (-X)
      return { row: gridPos.gridY, col: gridPos.gridZ };
    case 'py': // top face (+Y)  
    case 'ny': // bottom face (-Y)
      return { row: gridPos.gridX, col: gridPos.gridZ };
    case 'pz': // front face (+Z)
    case 'nz': // back face (-Z)
      return { row: gridPos.gridX, col: gridPos.gridY };
    default:
      return { row: -1, col: -1 };
  }
}

// Clear all highlights
function clearAllHighlights() {
  cubeMap.forEach(cubeData => {
    for (let i = 0; i < 6; i++) {
      updateFaceMaterial(cubeData, i, cubeData.faceNumbers[i], false, false);
    }
    // Reset shell and number glow to normal opacity
    cubeData.shell.material.opacity = 0.15;
    cubeData.numberGlow.material.opacity = 0.12;
  });
}

// Highlight faces in same row and column
function highlightRowColumn(selectedCubeData, selectedFaceIndex) {
  const selectedGridPos = getGridPosition(
    selectedCubeData.position.x, 
    selectedCubeData.position.y, 
    selectedCubeData.position.z
  );
  const selectedFaceNormal = getFaceNormal(selectedFaceIndex);
  const selectedRowCol = getRowColumn(selectedGridPos, selectedFaceNormal);
  
  cubeMap.forEach(cubeData => {
    const gridPos = getGridPosition(cubeData.position.x, cubeData.position.y, cubeData.position.z);
    
    // Check if this cube is in the same row or column on the same face plane
    const rowCol = getRowColumn(gridPos, selectedFaceNormal);
    const isInSameRow = rowCol.row === selectedRowCol.row;
    const isInSameCol = rowCol.col === selectedRowCol.col;
    const isSelectedCube = (cubeData === selectedCubeData);
    
    // If this cube is in the same row or column, highlight ALL its faces
    if (isInSameRow || isInSameCol) {
      for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        const isSelectedFace = (isSelectedCube && faceIndex === selectedFaceIndex);
        
        if (isSelectedFace) {
          // Selected face - bright orange highlight
          updateFaceMaterial(cubeData, faceIndex, cubeData.faceNumbers[faceIndex], true, false);
        } else {
          // Other faces of cubes in same row/column - bright cyan highlight
          updateFaceMaterial(cubeData, faceIndex, cubeData.faceNumbers[faceIndex], false, true);
        }
      }
      
      // Also enhance the shell glow for highlighted cubes
      cubeData.shell.material.opacity = 0.25;
      cubeData.numberGlow.material.opacity = 0.18;
    } else {
      // Cubes not in same row/column - normal appearance
      for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        updateFaceMaterial(cubeData, faceIndex, cubeData.faceNumbers[faceIndex], false, false);
      }
      
      // Reset shell glow to normal
      cubeData.shell.material.opacity = 0.15;
      cubeData.numberGlow.material.opacity = 0.12;
    }
  });
}

// Create a plain dark material for faces without numbers
function createPlainTileMaterial() {
  return new THREE.MeshLambertMaterial({
    color: 0x2a2a4a,  // Dark purple base
    transparent: false,
    opacity: 0.5
  });
}

// Edges (neon) for a mini-cube - enhanced but controlled glow
function createNeonEdges(size, colorHex) {
  const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size), 10);
  // Balanced line width for good visibility without overwhelming numbers
  const mat = new THREE.LineBasicMaterial({ 
    color: colorHex, 
    linewidth: 2.0,
    transparent: true,
    opacity: 0.01
  });
  const lines = new THREE.LineSegments(geo, mat);
  return lines;
}

/////////////////////
// Build shared mini-cubes for all faces
/////////////////////

// We'll create cubes at positions corresponding to a face grid.
// Use a Map keyed by integer coordinates to ensure shared cubes are reused.
const cubeMap = new Map(); // key "ix,iy,iz" -> { mesh, edges }

function posKey(ix, iy, iz) {
  return `${ix},${iy},${iz}`;
}

// Convert grid (i, j) on a particular face to world coords (x,y,z) with integer indices.
// We'll use integer coordinates in units of (CELL_SIZE + CELL_GAP) for dedup map.
const step = CELL_SIZE + CELL_GAP;
const offsetI = (GRID_SIZE - 1) / 2;

function addCellAtWorld(x, y, z, num, neonColor, faceNormal) {
  // ix,iy,iz integer indices for dedup
  // scale world positions by inverse step and round to int for map key
  const ix = Math.round(x / step);
  const iy = Math.round(y / step);
  const iz = Math.round(z / step);
  const key = posKey(ix, iy, iz);
  if (cubeMap.has(key)) {
    return cubeMap.get(key).group;
  }

  // base tile cube with materials array for different faces
  const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
  
  // Create materials array - 6 faces: right, left, top, bottom, front, back
  // Show numbers on ALL faces so they're visible from any angle
  const numberedMaterial = createTileMaterialWithNumber(num);
  const materials = [
    numberedMaterial, // right face (+X)
    numberedMaterial, // left face (-X)
    numberedMaterial, // top face (+Y)
    numberedMaterial, // bottom face (-Y)
    numberedMaterial, // front face (+Z)
    numberedMaterial  // back face (-Z)
  ];

  const mesh = new THREE.Mesh(geometry, materials);
  mesh.position.set(x, y, z);

  // Enhanced neon edges for better glow
  const edges = createNeonEdges(CELL_SIZE * 1.02, neonColor);
  edges.position.copy(mesh.position);

  // Controlled shell glow for the whole cube
  const shellGeo = new THREE.BoxGeometry(CELL_SIZE * 1.01, CELL_SIZE * 1.01, CELL_SIZE * 1.01);
  const shellMat = new THREE.MeshBasicMaterial({
    color: neonColor,
    transparent: true,
    opacity: 0.15,  // Increased opacity for more visible shell glow
    depthWrite: false
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  shell.position.copy(mesh.position);

  // Add a subtle violet glow specifically for the numbers
  const numberGlowGeo = new THREE.BoxGeometry(CELL_SIZE * 1.005, CELL_SIZE * 1.005, CELL_SIZE * 1.005);
  const numberGlowMat = new THREE.MeshBasicMaterial({
    color: 0xbb77ff,  // Violet glow to match the numbers
    transparent: true,
    opacity: 0.12,  // Increased for more visible number glow
    depthWrite: false
  });
  const numberGlow = new THREE.Mesh(numberGlowGeo, numberGlowMat);
  numberGlow.position.copy(mesh.position);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(numberGlow);
  group.add(shell);
  group.add(edges);

  scene.add(group);
  
  // Store cube data with additional properties for interaction
  const cubeData = { 
    group, 
    mesh, 
    edges, 
    shell, 
    numberGlow, 
    currentNumber: num,
    isSelected: false,
    selectedFace: null,
    faceNumbers: [num, num, num, num, num, num], // Store number for each face
    position: { x, y, z }
  };
  cubeMap.set(key, cubeData);
  return group;
}

// Colors: alternate pink and cyan for faces (and for edges)
const neonPink = 0xff4fa3;
const neonCyan = 0x2fe8ff;
const faceNeon = [neonPink, neonCyan, neonPink, neonCyan, neonPink, neonCyan];

// Generate a sudoku-like pattern for each face (ensuring numbers 1-9 appear)
function generateFaceNumbers(faceIndex) {
  const numbers = [];
  
  // Create a simple pattern that ensures all numbers 1-9 appear multiple times
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      // Create a pattern based on position and face index to ensure variety
      const num = ((i + j + faceIndex) % 9) + 1;
      numbers.push(num);
    }
  }
  
  return numbers;
}

// Get number for specific position on a face
function getNumberForPosition(faceIndex, i, j) {
  // Ensure we have numbers 1-9 distributed across the face
  const pattern = (i * 3 + Math.floor(j / 3) + faceIndex) % 9 + 1;
  return pattern;
}

// Build 6 faces: each face uses a (i,j) grid mapped to world coordinates.
// Faces: +Z (front), -Z (back), +X (right), -X (left), +Y (top), -Y (bottom)
function buildFace(normalAxis, sign, neonColorIndex) {
  const neonColor = faceNeon[neonColorIndex % faceNeon.length];
  
  // Determine face normal string for material assignment
  let faceNormal = '';
  if (normalAxis === 'z' && sign === 1) faceNormal = 'pz';  // front face
  if (normalAxis === 'z' && sign === -1) faceNormal = 'nz'; // back face
  if (normalAxis === 'x' && sign === 1) faceNormal = 'px';  // right face
  if (normalAxis === 'x' && sign === -1) faceNormal = 'nx'; // left face
  if (normalAxis === 'y' && sign === 1) faceNormal = 'py';  // top face
  if (normalAxis === 'y' && sign === -1) faceNormal = 'ny'; // bottom face
  
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      // grid center offsets
      const gx = (i - offsetI) * step;
      const gy = (j - offsetI) * step;
      const gz = FACE_OFFSET;

      let wx = 0, wy = 0, wz = 0;
      if (normalAxis === 'z') {
        wx = gx;
        wy = gy;
        wz = sign * gz;
      } else if (normalAxis === 'x') {
        wx = sign * gz;
        wy = gy;
        wz = gx;
      } else if (normalAxis === 'y') {
        wx = gx;
        wy = sign * gz;
        wz = gy;
      }

      // Get a proper number for this position on this face (ensures 1-9 distribution)
      const num = getNumberForPosition(neonColorIndex, i, j);

      // Use cyan for even rows and pink for odd rows per face to get alternating neon aesthetic
      const neon = ((i + j) % 2 === 0) ? neonCyan : neonPink;

      addCellAtWorld(wx, wy, wz, num, neon, faceNormal);
    }
  }
}

// Build all faces
buildFace('z', 1, 0);   // front
buildFace('z', -1, 1);  // back
buildFace('x', 1, 2);   // right
buildFace('x', -1, 3);  // left
buildFace('y', 1, 4);   // top
buildFace('y', -1, 5);  // bottom

/////////////////////
// Add a faint outline box around the whole cube (neon frame)
/////////////////////
const bigBoxGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(
  GRID_SIZE * step - CELL_GAP,
  GRID_SIZE * step - CELL_GAP,
  GRID_SIZE * step - CELL_GAP
));
const bigFrame = new THREE.LineSegments(bigBoxGeo, new THREE.LineBasicMaterial({ 
  color: neonCyan, 
  linewidth: 2,
  transparent: true,
  opacity: 0.8
}));
scene.add(bigFrame);

/////////////////////
// Ground reflection/plane (subtle)
/////////////////////
const planeGeo = new THREE.PlaneGeometry(200, 200);
const planeMat = new THREE.MeshBasicMaterial({ color: 0x02010a });
const ground = new THREE.Mesh(planeGeo, planeMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -FACE_OFFSET - CELL_SIZE;
scene.add(ground);

/////////////////////
// Mouse interaction functions
/////////////////////

function onMouseMove(event) {
  // Update mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
  // Update mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update raycaster
  raycaster.setFromCamera(mouse, camera);

  // Get all cube meshes for intersection testing
  const meshes = [];
  cubeMap.forEach(cubeData => {
    meshes.push(cubeData.mesh);
  });

  // Check for intersections
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const faceIndex = intersects[0].face.materialIndex;
    
    // Find the cube data for this mesh
    let clickedCubeData = null;
    cubeMap.forEach(cubeData => {
      if (cubeData.mesh === clickedMesh) {
        clickedCubeData = cubeData;
      }
    });

    if (clickedCubeData) {
      // Clear all previous highlights
      clearAllHighlights();
      
      // Deselect previously selected cube/face
      if (selectedCube && selectedCube.selectedFace !== null) {
        selectedCube.selectedFace = null;
        selectedCube.isSelected = false;
      }

      // Select the new cube and specific face
      selectedCube = clickedCubeData;
      selectedCube.selectedFace = faceIndex;
      selectedCube.isSelected = true;
      
      // Highlight the selected face and its row/column
      highlightRowColumn(selectedCube, faceIndex);
      
      console.log(`Selected face ${faceIndex} of cube at position (${selectedCube.position.x.toFixed(1)}, ${selectedCube.position.y.toFixed(1)}, ${selectedCube.position.z.toFixed(1)}) with number ${selectedCube.faceNumbers[faceIndex]}`);
    }
  } else {
    // Clicked on empty space - clear all highlights and deselect
    clearAllHighlights();
    if (selectedCube && selectedCube.selectedFace !== null) {
      selectedCube.selectedFace = null;
      selectedCube.isSelected = false;
      selectedCube = null;
    }
  }
}

function onKeyPress(event) {
  // Only process number keys 1-9 if a specific face is selected
  if (selectedCube && selectedCube.selectedFace !== null && event.key >= '1' && event.key <= '9') {
    const newNumber = parseInt(event.key);
    const faceIndex = selectedCube.selectedFace;
    
    // Update only the selected face with the new number
    selectedCube.faceNumbers[faceIndex] = newNumber;
    
    // Re-highlight the row/column with the updated number
    highlightRowColumn(selectedCube, faceIndex);
    
    console.log(`Changed face ${faceIndex} number to ${newNumber}`);
    
    // Clear the texture cache to force recreation with new number
    numberTextureCache.clear();
  }
}

// Add event listeners
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);
window.addEventListener('keypress', onKeyPress, false);

/////////////////////
// Animation loop
/////////////////////
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // render using composer (bloom)
  composer.render();
}
animate();

/////////////////////
// Responsive
/////////////////////
window.addEventListener('resize', () => {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
