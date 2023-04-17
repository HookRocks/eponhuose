import Experience from '../Experience';
import Environment from './Environment';
import Room from './Room';
import Marker from './Marker';
import Controls from './Controls';
import * as THREE from 'three';
import Raycaster from './Raycaster';
import B1F1 from './B1F1';
import B1F2 from './B1F2';
import Auto from './Auto';
import AutoCollision from './AutoCollision';
import Materials from '../Materials/Materials';
import Vet from './Vet';
export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      this.environment = new Environment();
      // this.scene.background = this.resources.items.sky;
      this.materials = new Materials();
      this.room = new Room();
      this.controls = new Controls();
      this.b1f1 = new B1F1();
      this.b1f2 = new B1F2();
      this.auto = new Auto();
      this.vet = new Vet();
      this.autoCollision = new AutoCollision();
      this.marker = new Marker();
      this.raycaster = new Raycaster();
      this.isAnimating = false;
    });
  }

  resize() {}

  update() {
    if (this.controls) {
      this.controls.update();
      // this.marker.update();
    }
  }
}
