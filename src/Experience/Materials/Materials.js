import Experience from '../Experience';
import * as THREE from 'three';
export default class Materials {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.auto;
    this.roomScene = this.room.scene;

    this.textures = {
      metal: {
        ao: this.resources.items.metalAo,
        disp: this.resources.items.metalDisp,
        flat: this.resources.items.metalFlat,
        metalness: this.resources.items.metalMetalness,
        normal: this.resources.items.metalNormal,
        roughness: this.resources.items.metalRoughness,
      },
      tiles: {
        disp: this.resources.items.tilesDisp,
        flat: this.resources.items.tilesFlat,
        gloss: this.resources.items.tilesGloss,
        normal: this.resources.items.tilesNormal,
        refl: this.resources.items.tilesRefl,
      },
      asphalt: {
        flat: this.resources.items.asphaltFlat,
        ao: this.resources.items.asphaltAo,
        disp: this.resources.items.asphaltDisp,
        normal: this.resources.items.asphaltNormal,
        gloss: this.resources.items.asphaltGloss,
      },
      dirt: {
        ao: this.resources.items.dirtAo,
        bump: this.resources.items.dirtBump,
        disp: this.resources.items.dirtDisp,
        flat: this.resources.items.dirtFlat,
        gloss: this.resources.items.dirtGloss,
        normal: this.resources.items.dirtNormal,
      },
    };
    this.dirtMaterial = new THREE.MeshPhysicalMaterial({
      aoMap: this.textures.dirt.ao,
      map: this.textures.dirt.flat,
      bumpMap: this.textures.dirt.bump,
      displacementMap: this.textures.dirt.disp,
      // displacementBias: 0.005,
      normalMap: this.textures.dirt.normal,
    });
    this.wallsMaterial = new THREE.MeshPhysicalMaterial({
      aoMap: this.textures.metal.ao,
      map: this.textures.metal.flat,
      metalnessMap: this.textures.metal.metalness,
      normalMap: this.textures.metal.normal,
      roughnessMap: this.textures.metal.roughness,
    });
    this.floorMaterial = new THREE.MeshPhysicalMaterial({
      map: this.textures.tiles.flat,
      normalMap: this.textures.tiles.normal,
      specularColorMap: this.textures.tiles.gloss,
    });
    this.asphaltMaterial = new THREE.MeshPhysicalMaterial({
      map: this.textures.asphalt.flat,
      normalMap: this.textures.asphalt.normal,
      clearcoatRoughnessMap: this.textures.asphalt.gloss,
      aoMap: this.textures.asphalt.ao,
      // displacementMap: this.textures.asphalt.disp,
      // displacementScale: 0.01,
      color: '#111',
    });
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.2,
      color: 0xffffff,
      ior: 2,
      transmission: 1,
      opacity: 0.75,
    });
  }
}
