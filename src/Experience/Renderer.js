import Experience from './Experience';
import * as THREE from 'three';
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.useLegacyLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 0.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.setClearColor('#e0f3fa', 1);
  }

  resize() {
    setTimeout(()=>{
    var side=document.getElementById("Side").getBoundingClientRect()

    this.sizes.width=side.x>4?side.x:window.innerWidth
    this.sizes.height=window.innerHeight
    this.sizes.aspect=this.sizes.width/this.sizes.height
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  })
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
