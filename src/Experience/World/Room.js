import Experience from '../Experience';
import * as THREE from 'three';
import GUI from 'lil-gui';
export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.roomScene = this.room.scene;
    this.materials = this.experience.world.materials;
    this.setModel();
  }
  setModel() {
    console.log(this.roomScene);
    this.roomScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log(child);
        if (!child.name) {
          child.material.transparent = true;
          child.material.opacity = 0;
        } else {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.name === 'parking') {
          console.log(child);
          // child.geometry.attributes.uv2 = new THREE.BufferAttribute(
          //   child.geometry.attributes.uv.array,
          //   2
          // );
          child.material = this.materials.asphaltMaterial;
          // child.material.color = new THREE.Color('#fff');
        }
        if (child.name === 'gravel') {
          child.material = this.materials.dirtMaterial;
          child.position.y -= 0.015;
        }

        // if (child.name === 'TV_bottom001') {
        //   const glassMaterial = new THREE.MeshPhysicalMaterial({
        //     roughness: 0.2,
        //     color: 0xffffff,
        //     ior: 3,
        //     transmission: 1,
        //     opacity: 1,
        //   });
        //   child.material = glassMaterial;
        // }
      }
    });
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhysicalMaterial();
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.38;
    // this.scene.add(floor);
    console.log(this.roomScene);
    // this.guiObject = {
    //   x: -40.4,
    //   y: -1.45,
    //   z: -6.04,
    //   s1: 3.49,
    //   s2: 3.75,
    //   s3: 3.82,
    // };
    // this.guiObject = {
    //   x: 0,
    //   y: 0,
    //   z: 0,
    //   s1: 1,
    //   s2: 1,
    //   s3: 1,
    // };
    // // this.gui = new GUI();
    // this.gui.add(this.guiObject, 'x', -100, 100, 0.01).onChange((v) => {
    //   console.log(this.roomScene);
    //   this.roomScene.position.x = v;
    // });
    // this.gui.add(this.guiObject, 'y', -100, 100, 0.01).onChange((v) => {
    //   this.roomScene.position.y = v;
    // });
    // this.gui.add(this.guiObject, 'z', -100, 100, 0.01).onChange((v) => {
    //   this.roomScene.position.z = v;
    // });
    // this.gui.add(this.guiObject, 's1', -100, 100, 0.01).onChange((v) => {
    //   console.log(this.roomScene);
    //   this.roomScene.scale.x = v;
    // });
    // this.gui.add(this.guiObject, 's2', -100, 100, 0.01).onChange((v) => {
    //   this.roomScene.scale.y = v;
    // });
    // this.gui.add(this.guiObject, 's3', -100, 100, 0.01).onChange((v) => {
    //   this.roomScene.scale.z = v;
    // });
    // this.roomScene.rotation.y = Math.PI;
    // this.roomScene.position.z = this.guiObject.z;
    // this.roomScene.position.y = this.guiObject.y;
    // this.roomScene.position.x = this.guiObject.x;
    // this.roomScene.scale.set(
    //   this.guiObject.s1,
    //   this.guiObject.s2,
    //   this.guiObject.s3
    // );
    this.scene.add(this.roomScene);
  }

  resize() {}

  update() {}
}
