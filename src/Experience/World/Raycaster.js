import Experience from '../Experience';
import * as THREE from 'three';
import gsap from 'gsap';
import { Power4 } from 'gsap/src/all';

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.controls = this.world.controls;
    this.markers = this.world.marker;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera.perspectiveCamera;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lastMarker = null;
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('mousedown', () => this.onMouseDown());
  }
  onPointerMove(e) {
    this.pointer.x = (e.clientX / this.sizes.width) * 2 - 1;
    this.pointer.y = -(e.clientY / this.sizes.height) * 2 + 1;
    this.updateRaycast();
    if (!this.world.isAnimating) {
      const marker = this.locateMarker();
      this.handleDisplayBuildings(marker);
    }
  }
  handleDisplayBuildings(marker) {
    if (marker) {
      if (this.lastMarker === null) {
        this.lastMarker = marker;
        marker.emissiveSpot.toggleEmissiveArea(true, marker.name);
        gsap.to(marker.buildingCeiling.position, {
          y: 1,
          duration: 1.5,
          ease: Power4.easeOut,
        });
        gsap.to(marker.buildingCeiling.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: Power4.easeOut,
        });
        if (
          ['Pharmacy', 'Electrical', 'Diesel', 'Construction', 'HVAC'].includes(
            marker.name
          )
        ) {
          gsap.to(
            this.world.b1f1.roomScene.children.find(
              (c) => c.name === 'ceiling003'
            ).position,
            {
              y: 1,
              duration: 1.5,
              ease: Power4.easeOut,
            }
          );
          gsap.to(
            this.world.b1f1.roomScene.children.find(
              (c) => c.name === 'ceiling003'
            ).scale,
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.5,
              ease: Power4.easeOut,
            }
          );
        }
      }
    } else {
      if (this.lastMarker) {
        this.lastMarker.emissiveSpot.toggleEmissiveArea(
          false,
          this.lastMarker.name
        );
        gsap.to(this.lastMarker.buildingCeiling.position, {
          y: this.lastMarker.originalScale.height,
          duration: 1.5,
          ease: Power4.easeOut,
        });
        gsap.to(this.lastMarker.buildingCeiling.scale, {
          x: this.lastMarker.originalScale.x,
          y: this.lastMarker.originalScale.y,
          z: this.lastMarker.originalScale.z,
          duration: 1.5,
          ease: Power4.easeOut,
        });
        if (
          ['Pharmacy', 'Electrical', 'Diesel', 'Construction', 'HVAC'].includes(
            this.lastMarker.name
          )
        ) {
          gsap.to(
            this.world.b1f1.roomScene.children.find(
              (c) => c.name === 'ceiling003'
            ).position,
            {
              y: 0.34290650486946106,
              duration: 1.5,
              ease: Power4.easeOut,
            }
          );
          gsap.to(
            this.world.b1f1.roomScene.children.find(
              (c) => c.name === 'ceiling003'
            ).scale,
            {
              x: 0.7169927358627319,
              y: 0.7658734321594238,
              z: 0.7211077809333801,
              duration: 1.5,
              ease: Power4.easeOut,
            }
          );
        }
      }
      this.lastMarker = null;
    }
  }
  onMouseDown() {
    const marker = this.locateMarker();
    if (marker && !this.world.isAnimating) {
      this.controls.updateCurve(marker.toPosition, marker.slowDownTime);
      this.handleDisplayBuildings(marker);
      marker.emissiveSpot.toggleEmissiveArea(true, marker.name);
      // this.markers.hideAll(marker.name);
    }
  }
  locateMarker() {
    const intersect = this.raycaster.intersectObject(this.scene);
    const markerIntersect = intersect.find((i) => i.object.name == 'MapMarker');
    if (markerIntersect) {
      const marker = this.markers.positionMaps.find((m) =>
        m.position.equals(markerIntersect.object.position)
      );
      return marker;
    }
    return null;
  }
  updateRaycast() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }
}
