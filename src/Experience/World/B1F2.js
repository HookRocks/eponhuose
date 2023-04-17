import Experience from '../Experience';
import * as THREE from 'three';
import Curves from '../Utils/Curves';
import GUI from 'lil-gui';
export default class B1F2 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.b1f2;
    this.roomScene = this.room.scene;
    this.materials = this.experience.world.materials;

    this.guiObject = {
      x: 0,
      y: 0,
      z: 0,
    };
    console.log(this.roomScene);
    this.roomScene.position.copy(this.guiObject);
    this.roomScene.children.find((c) => c.name === 'walls003').material =
      this.materials.wallsMaterial;
    this.roomScene.children.find((c) => c.name === 'floor002').material =
      this.materials.floorMaterial;
    this.roomScene.scale.set(1, 1, 1);
    this.setModel();
    // this.toggleEmissiveArea(true);
  }
  setModel() {
    this.scene.add(this.roomScene);
    // this.roomScene.position.z -= 0.43;
  }

  toggleEmissiveArea(type, room = null) {
    const highlight = this.roomScene.children.find((c) => c.name === 'Coding');
    highlight.material = highlight.material.clone();
    highlight.material.emissive = new THREE.Color(0, type ? 5 : 0, 0);
  }

  resize() {}

  update() {}
}
