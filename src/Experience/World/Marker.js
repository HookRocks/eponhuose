import Experience from '../Experience';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Curves from '../Utils/Curves';
export default class Marker {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.marker = this.resources.items.marker;
    this.markerScene = this.marker.scene;
    this.markerScene.children[0].material.color = new THREE.Color('#4287f5');
    this.texts = [];
    this.markers = [];
    this.positionMaps = [
      {
        name: 'Coding',
        position: new THREE.Vector3(-5.7, 1.5, -0.75),
        toPosition: Curves.CenterToCoding,
        fromPosition: Curves.CodingToCenter,
        buildingCeiling: this.world.b1f2.roomScene.children.find(
          (c) => c.name === 'ceiling004'
        ),
        emissiveSpot: this.world.b1f2,
        building: this.world.b1f2,
        // slowDownTime: 0.8,
        slowDownTime: 1,
      },
      {
        name: 'Vet',
        position: new THREE.Vector3(8, 1, 2.5),
        toPosition: Curves.CenterToVet,
        fromPosition: Curves.VetToCenter,
        buildingCeiling: this.world.vet.roomScene.children.find(
          (c) => c.name === 'ceiling'
        ),
        emissiveSpot: this.world.vet,
        building: this.world.vet,
        // slowDownTime: 0.8,
        slowDownTime: 1,
      },
      {
        name: 'HVAC',
        position: new THREE.Vector3(-1, 1, -1.25),
        toPosition: Curves.CenterToHVAC,
        fromPosition: Curves.HVACToCenter,
        buildingCeiling: this.world.b1f2.roomScene,
        emissiveSpot: this.world.b1f1,
        building: this.world.b1f2,
        // slowDownTime: 0.65,
        slowDownTime: 1,
      },
      {
        name: 'Collision Repair',
        position: new THREE.Vector3(3, 1, 0),
        toPosition: Curves.CenterToAuto,
        fromPosition: Curves.AutoToCenter,
        buildingCeiling: this.world.autoCollision.roomScene.children.find(
          (c) => c.name === 'ceiling002'
        ),
        emissiveSpot: this.world.autoCollision,
        building: this.world.autoCollision,
        // slowDownTime: 0.85,
        slowDownTime: 1,
      },
      {
        name: 'Auto Tech',
        position: new THREE.Vector3(3.5, 1, -3),
        toPosition: Curves.CenterToAutoCollision,
        fromPosition: Curves.AutoCollisionToCenter,
        buildingCeiling: this.world.auto.roomScene.children.find(
          (c) => c.name === 'ceiling001'
        ),
        emissiveSpot: this.world.auto,
        building: this.world.auto,
        // slowDownTime: 0.85,
        slowDownTime: 1,
      },
      {
        name: 'Construction',
        position: new THREE.Vector3(-2.5, 1, -1.25),
        toPosition: Curves.CenterToConstruction,
        fromPosition: Curves.CenterToConstruction,
        buildingCeiling: this.world.b1f2.roomScene,
        emissiveSpot: this.world.b1f1,
        building: this.world.b1f2,
        // slowDownTime: 0.7,
        slowDownTime: 1,
      },
      {
        name: 'Electrical',
        position: new THREE.Vector3(-4.3, 1, -1.25),
        toPosition: Curves.CenterToElectrical,
        fromPosition: Curves.CenterToElectrical,
        buildingCeiling: this.world.b1f2.roomScene,
        emissiveSpot: this.world.b1f1,
        building: this.world.b1f2,
        // slowDownTime: 0.8,
        slowDownTime: 1,
      },
      {
        name: 'Diesel',
        position: new THREE.Vector3(-3.3, 1, 0),
        toPosition: Curves.CenterToDiesel,
        fromPosition: Curves.CenterToDiesel,
        buildingCeiling: this.world.b1f2.roomScene,
        emissiveSpot: this.world.b1f1,
        building: this.world.b1f2,
        // slowDownTime: 0.8,
        slowDownTime: 1,
      },
      {
        name: 'Pharmacy',
        position: new THREE.Vector3(-6.5, 1.5, -1.75),
        toPosition: Curves.CenterToPharmacy,
        fromPosition: Curves.CenterToPharmacy,
        buildingCeiling: this.world.b1f2.roomScene,
        emissiveSpot: this.world.b1f1,
        building: this.world.b1f2,
        // slowDownTime: 0.85,
        slowDownTime: 1,
      },
    ];
    this.positionMaps[0].originalScale = {
      x: 0.7555366158485413,
      y: 0.11814051866531372,
      z: 0.7598729729652405,
      height: 0.6731687188148499,
    };
    this.positionMaps[1].originalScale = {
      x: 0.8184707164764404,
      y: 0.8184707164764404,
      z: 0.8184707164764404,
      height: 0.3684459924697876,
    };
    this.positionMaps[2].originalScale = {
      x: 1,
      y: 1,
      z: 1,
      height: 0,
    };
    this.positionMaps[3].originalScale = {
      x: 0.9711525440216064,
      y: 0.9711525440216064,
      z: 0.9711525440216064,
      height: 0.40423762798309326,
    };
    this.positionMaps[4].originalScale = {
      x: 0.9756215214729309,
      y: 0.9756215214729309,
      z: 0.9756215214729309,
      height: 0.4229370951652527,
    };
    this.positionMaps[5].originalScale = this.positionMaps[2].originalScale;
    this.positionMaps[6].originalScale = this.positionMaps[2].originalScale;
    this.positionMaps[7].originalScale = this.positionMaps[2].originalScale;
    this.positionMaps[8].originalScale = this.positionMaps[2].originalScale;

    this.setModel();
  }
  setModel() {
    this.codingMarker = this.markerScene.clone();
    this.codingMarker.name = 'Coding';
    this.codingMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Coding').position
    );

    this.vetMarker = this.markerScene.clone();
    this.vetMarker.name = 'Vet';
    this.vetMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Vet').position
    );
    this.vetMarker.children[0].rotation.y = Math.PI / 2;

    this.hvacMarker = this.markerScene.clone();
    this.hvacMarker.name = 'HVAC';
    this.hvacMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'HVAC').position
    );

    this.constructionMarker = this.markerScene.clone();
    this.constructionMarker.name = 'Construction';
    this.constructionMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Construction').position
    );
    this.electricalMarker = this.markerScene.clone();
    this.electricalMarker.name = 'Electrical';
    this.electricalMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Electrical').position
    );
    this.dieselMarker = this.markerScene.clone();
    this.dieselMarker.name = 'Diesel';
    this.dieselMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Diesel').position
    );
    this.pharmacyMarker = this.markerScene.clone();
    this.pharmacyMarker.name = 'Pharmacy';
    this.pharmacyMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Pharmacy').position
    );

    this.autoMarker = this.markerScene.clone();
    this.autoMarker.name = 'Auto Tech';
    this.autoMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Auto Tech').position
    );

    this.unknownBuildingMarker = this.markerScene.clone();
    this.unknownBuildingMarker.name = 'Collision Repair';
    this.unknownBuildingMarker.children[0].position.copy(
      this.positionMaps.find((m) => m.name === 'Collision Repair').position
    );

    this.startMarker = this.markerScene.clone();
    this.startMarker.name = 'Check In';
    this.startMarker.children[0].position.copy(new THREE.Vector3(-1.3, 1, 0.5));
    const tempMaterial = this.markerScene.children[0].material.clone();
    tempMaterial.color = new THREE.Color('#d91e50');
    this.startMarker.children[0].material = tempMaterial;
    this.scene.add(this.startMarker);

    this.markers = [
      this.codingMarker,
      this.vetMarker,
      this.hvacMarker,
      this.autoMarker,
      this.unknownBuildingMarker,
      this.constructionMarker,
      this.electricalMarker,
      this.dieselMarker,
      this.pharmacyMarker,
    ];
    this.scene.add(
      this.codingMarker,
      this.vetMarker,
      this.hvacMarker,
      this.autoMarker,
      this.unknownBuildingMarker,
      this.constructionMarker,
      this.electricalMarker,
      this.dieselMarker,
      this.pharmacyMarker
    );
    this.createText();
  }

  createText() {
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.positionMaps.forEach((point) => {
        this.handleTextCreation(point, font);
      });
      this.handleTextCreation(
        { name: 'Check - In', position: new THREE.Vector3(-1.3, 1, 0.5) },
        font,
        '#d91e50'
      );
    });
  }

  handleTextCreation(point, font, color = '#4287f5') {
    const geometry = new TextGeometry(point.name, {
      font: font,
      size: [
        'Construction',
        'HVAC',
        'Electrical',
        'Diesel',
        'Pharmacy',
      ].includes(point.name)
        ? 55
        : 85,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    const material = new THREE.MeshPhongMaterial({
      color,
      specular: '#abc345',
      shininess: 25,
      flatShading: false,
      reflectivity: 1,
    });
    const text = new THREE.Mesh(geometry, material);
    text.scale.set(0.003, 0.003, 0.003);
    text.geometry.computeBoundingSphere();
    text.position.set(
      point.position.x - text.geometry.boundingSphere.radius / 333.33,
      point.position.y + 0.5,
      point.position.z
    );
    if (point.name === 'Vet') {
      text.rotation.y = -Math.PI / 2;
      text.position.x = point.position.x;
      text.position.z = point.position.z - point.name.length / 12;
    }
    this.texts.push(text);
    this.scene.add(text);
  }

  hideAll(excluded) {
    this.markers.forEach((marker) => {
      if (marker.name != excluded) {
        marker.children[0].material.visible = false;
      } else {
        marker.children[0].material.visible = true;
      }
    });
    this.texts.forEach((text) => {
      text.material.visible = false;
    });
  }

  resize() {}

  update() {
    this.positionMaps.forEach((point, idx) => {
      const screenPositionVector = point.position.clone();
      screenPositionVector.y += 1.1;
      const camera = this.experience.camera.perspectiveCamera;
      screenPositionVector.project(camera);
      const tX = screenPositionVector.x * this.sizes.width * 0.5;
      const tY = -screenPositionVector.y * this.sizes.height * 0.5;
      const ele = document.querySelector(`.p${idx + 1}`);
      ele.style.transform = `translateX(${
        tX - ele.textContent.length * 7
      }px) translateY(${tY}px) `;
    });
  }
}
