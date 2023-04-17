import EventEmitter from 'events';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

import * as THREE from 'three';
import Experience from '../Experience';
export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;
    this.loadingElement = document.querySelector('.loader__wrapper__items');

    this.setLoaders();
    this.load();
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.GLTFLoader = new GLTFLoader();
    this.loaders.DRACOLoader = new DRACOLoader();
    this.loaders.TextureLoader = new THREE.TextureLoader();
    this.loaders.EXRLoader = new EXRLoader();
    this.loaders.DRACOLoader.setDecoderPath('/draco/');
    this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
  }
  load() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.GLTFLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'texture') {
        this.loaders.TextureLoader.load(asset.path, (file) => {
          // file.magFilter = THREE.NearestFilter;
          // file.minFilter = THREE.LinearFilter;
          file.wrapS = file.wrapT = THREE.RepeatWrapping;
          // file.repeat.set(12, 12);
          if (asset.name.includes('metal')) {
            file.repeat.set(4, 4);
          } else if (asset.name.includes('dirt')) {
            file.repeat.set(32, 16);
          } else {
            file.repeat.set(48, 48);
          }
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'hdri') {
        this.loaders.EXRLoader.load(asset.path, (file) => {
          file.mapping = THREE.EquirectangularReflectionMapping;

          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }
  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    this.loadingElement.textContent = `Loaded Resource ${this.loaded} / ${this.queue}`;
    // console.log(file);
    if (this.loaded === this.queue) {
      this.emit('ready');
      this.loadingElement.parentElement.style.display = 'none';
    }
  }
}
