import EventEmitter from 'events';
import Experience from '../Experience';
export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.currentSize = 0.9;
    this.width = window.innerWidth * 0.9;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    document.addEventListener('resizeEvent', () => {
      this.currentSize = this.currentSize == 0.9 ? 0.6 : 0.9;
      this.resize(this.currentSize);
    });
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  resize(size = 0.9) {
    this.width = window.innerWidth * size;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.emit('resize');
  }
}
