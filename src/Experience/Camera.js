import Experience from './Experience';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    // this.createOrthographicCamera();
    this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    //-0.1
    this.perspectiveCamera.position.x = -2.02;
    this.perspectiveCamera.position.y = 10.06;
    this.perspectiveCamera.position.z = 18.75;
  }
  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -100,
      100
    );
    this.scene.add(this.orthographicCamera);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = Math.PI / 8;
    this.controls.maxPolarAngle = Math.PI / 2.5;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 25;
  }

  toggleControlRestrictions(type) {
    if (type === true) {
      this.controls.minPolarAngle = Math.PI / 8;
      this.controls.minDistance = 3;
      this.controls.maxDistance = 25;
    } else {
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI * 2;
      this.controls.minDistance = 0;
      this.controls.maxDistance = Infinity;
    }
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // this.orthographicCamera.left =
    //   (-this.sizes.aspect * this.sizes.frustrum) / 2;
    // this.orthographicCamera.right =
    //   (this.sizes.aspect * this.sizes.frustrum) / 2;
    // this.orthographicCamera.top = this.sizes.frustrum / 2;
    // this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    // this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
