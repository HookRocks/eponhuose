import Experience from '../Experience';
import * as THREE from 'three';
import Curves from '../Utils/Curves';
import GUI from 'lil-gui';
export default class B1F1 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.b1f1;
    this.roomScene = this.room.scene;
    this.materials = this.experience.world.materials;

    // this.gui = new GUI();
    // this.obj = { x: -33.67, y: -1.37, z: 52.13 };
    this.obj = { x: 0, y: 0, z: 0 };
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
    console.log(this.roomScene);
    this.roomScene.position.set(this.obj.x, this.obj.y, this.obj.z);
    this.roomScene.scale.set(1, 1, 1);
    this.roomScene.children.find((c) => c.name === 'walls001').material =
      this.materials.wallsMaterial;

    this.roomScene.children.find((c) => c.name === 'FLOOR').material =
      this.materials.floorMaterial;
    this.setModel();
    // this.toggleEmissiveArea(true);
  }
  setModel() {
    this.scene.add(this.roomScene);
    // this.roomScene.position.z -= 0.1;
  }

  toggleEmissiveArea(type, room = null) {
    const highlight = this.roomScene.children.find((c) => c.name === room);
    highlight.material = highlight.material.clone();
    highlight.material.emissive = new THREE.Color(0, type ? 5 : 0, 0);
    // highlight.material.toneMapped = false;
    // highlight.material.emissive = new THREE.Color(0.2, 1, 0.2);
    // highlight.material.emissiveIntensity = 4;
  }

  resize() {}

  update() {}
}
