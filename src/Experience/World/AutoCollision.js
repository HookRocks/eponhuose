import Experience from '../Experience';
import * as THREE from 'three';
import Curves from '../Utils/Curves';
import GUI from 'lil-gui';
export default class AutoCollision {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.autoCollision;
    this.roomScene = this.room.scene;
    this.materials = this.experience.world.materials;
    // this.gui = new GUI();
    this.obj = { x: -46.06, y: -1.37, z: 32 };
    console.log(this.roomScene);
    this.roomScene.children.find((c) => c.name === 'glass003').material =
      this.materials.glassMaterial;
    this.roomScene.children.find((c) => c.name === 'walls004').material =
      this.materials.wallsMaterial;
    this.roomScene.children.find((c) => c.name === 'floor004').material =
      this.materials.floorMaterial;
    // this.gui
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
    console.log(this.roomScene);
    // this.roomScene.children.find((c) => c.name === 'walls001').material =
    //   wallsMaterial;
    // this.roomScene.children.find((c) => c.name === 'FLOOR').material =
    //   floorMaterial;
    this.setModel();
    // this.toggleEmissiveArea(true);
  }
  setModel() {
    this.scene.add(this.roomScene);
  }
  toggleEmissiveArea(type, room = null) {
    const highlight = this.roomScene.children.find(
      (c) => c.name === 'autocollision'
    );
    highlight.material = highlight.material.clone();
    highlight.material.emissive = new THREE.Color(0, type ? 5 : 0, 0);
  }

  resize() {}

  update() {}
}
