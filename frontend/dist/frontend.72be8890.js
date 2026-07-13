// === Dark Mode Toggle ===
document.getElementById("themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
});
// === File Upload + Mock Analysis ===
document.getElementById("analyzeBtn").addEventListener("click", ()=>{
    const fileInput = document.getElementById("fileInput");
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear old results
    if (!fileInput.files.length) {
        resultsContainer.innerHTML = `<p class="text-red-500">\u{26A0}\u{FE0F} Please upload a file first.</p>`;
        return;
    }
    // Mock result data (replace with backend response later)
    showResult("Breaking News Article", 92, "Text");
    showResult("Uploaded Image", 85, "Image");
    showResult("Video Clip", 78, "Video");
});
// === Function to Show Result Cards ===
function showResult(title, confidence, type) {
    const container = document.getElementById("results");
    const card = document.createElement("div");
    card.className = "p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow flex justify-between items-center";
    card.innerHTML = `
    <div>
      <h3 class="font-bold">${title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">Type: ${type}</p>
    </div>
    <span class="text-indigo-600 dark:text-indigo-400 font-semibold">${confidence}%</span>
  `;
    container.appendChild(card);
}
// === Three.js 3D Scene ===
const container = document.getElementById("three-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
// Create Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x6366f1
}); // Indigo
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
camera.position.z = 3;
// Animate
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
// === Resize Renderer on Window Resize ===
window.addEventListener("resize", ()=>{
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
});

//# sourceMappingURL=frontend.72be8890.js.map
