const glow = document.querySelector(".glow");

window.addEventListener("pointermove", (event) => {
  if (!glow) return;

  glow.animate(
    {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`
    },
    {
      duration: 450,
      fill: "forwards"
    }
  );
});

class Stage {
  constructor() {
    this.canvas = document.getElementById("webgl-canvas");

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.isInitialized = false;

    const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
    this.renderer.setClearColor(0x000000, 0);
  }

  init() {
    if (!this.canvas || typeof THREE === "undefined") return;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.onResize();

    this.isInitialized = true;
  }

  onResize() {
    if (!this.canvas || !this.renderer || !this.camera) return;

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.renderer.setSize(width, height, false);

    this.camera.left = -1;
    this.camera.right = 1;
    this.camera.top = 1;
    this.camera.bottom = -1;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (!this.renderer || !this.scene || !this.camera) return;
    this.renderer.render(this.scene, this.camera);
  }
}

class WaveMesh {
  constructor(stage) {
    this.stage = stage;
    this.mesh = null;

    this.uniforms = {
      resolution: {
        value: new THREE.Vector2(1, 1)
      },
      time: {
        value: 0
      },
      xScale: {
        value: 1.45
      },
      yScale: {
        value: 0.28
      },
      distortion: {
        value: 0.045
      }
    };
  }

  init() {
    const vertexShader = document.getElementById("js-vertex-shader")?.textContent;
    const fragmentShader = document.getElementById("js-fragment-shader")?.textContent;

    if (!vertexShader || !fragmentShader || !this.stage.scene) return;

    const positions = new Float32Array([
      -1, -1, 0,
       1, -1, 0,
      -1,  1, 0,
       1, -1, 0,
      -1,  1, 0,
       1,  1, 0
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);

    this.onResize();
  }

  onResize() {
    const canvas = this.stage.canvas;
    if (!canvas) return;

    this.uniforms.resolution.value.set(
      canvas.clientWidth,
      canvas.clientHeight
    );
  }

  render() {
    this.uniforms.time.value += 0.012;
  }
}

const stage = new Stage();
stage.init();

const wave = new WaveMesh(stage);
wave.init();

function resizeWave() {
  stage.onResize();
  wave.onResize();
}

window.addEventListener("resize", resizeWave);

function animateWave() {
  wave.render();
  stage.render();
  requestAnimationFrame(animateWave);
}

if (stage.isInitialized) {
  animateWave();
}

const openNewsletter = document.getElementById("openNewsletter");
const closeNewsletter = document.getElementById("closeNewsletter");
const newsletterModal = document.getElementById("newsletterModal");
const newsletterForm = document.getElementById("newsletterForm");

function openModal() {
  newsletterModal.classList.add("is-open");
  newsletterModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  newsletterModal.classList.remove("is-open");
  newsletterModal.setAttribute("aria-hidden", "true");
}

if (openNewsletter && closeNewsletter && newsletterModal && newsletterForm) {
  openNewsletter.addEventListener("click", openModal);
  closeNewsletter.addEventListener("click", closeModal);

  newsletterModal.addEventListener("click", (event) => {
    if (event.target === newsletterModal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("💌 Thanks for subscribing!");
    closeModal();
    newsletterForm.reset();
  });



  
}
