import Experience from '../Experience';
import * as THREE from 'three';
import Curves from '../Utils/Curves';
import GUI from 'lil-gui';
export default class Auto {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.auto;
    this.roomScene = this.room.scene;
    this.materials = this.experience.world.materials;
    console.log(this.roomScene);
    this.roomScene.children.find((c) => c.name === 'glass004').material =
      this.materials.glassMaterial;
    this.roomScene.children.find((c) => c.name === 'walls002').material =
      this.materials.wallsMaterial;
    this.roomScene.children.find((c) => c.name === 'floor003').material =
      this.materials.floorMaterial;
    // this.gui = new GUI();
    // this.obj = { x: 0, y: 0, z: 0 };
    //   .add(this.obj, 'x', -100, 100, 0.01)
    //   .onChange(() =>
    //     this.roomScene.position.set(this.obj.x, this.obj.y, this.obj.z)
    //   );
    // this.gui
    //   .add(this.obj, 'y', -100, 100, 0.01)
    //   .onChange(() =>
    //     this.roomScene.position.set(this.obj.x, this.obj.y, this.obj.z)
    //   );
    // this.gui
    //   .add(this.obj, 'z', -100, 100, 0.01)
    //   .onChange(() =>
    //     this.roomScene.position.set(this.obj.x, this.obj.y, this.obj.z)
    //   );
    // this.roomScene.position.set(this.obj.x, this.obj.y, this.obj.z);
    // this.roomScene.scale.set(3, 3, 3);

    this.setModel();
    // this.toggleEmissiveArea(true);
  }
  setModel() {
    this.scene.add(this.roomScene);
  }
  toggleEmissiveArea(type, room = null) {
    console.log(this.roomScene);
    const highlight = this.roomScene.children.find(
      (c) => c.name === 'automotive'
    );
    highlight.material = highlight.material.clone();
    highlight.material.emissive = new THREE.Color(0, type ? 5 : 0, 0);
  }
  resize() {}

  update() {}
}
