import Experience from '../Experience';

export default class Cars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.cars = this.experience.resources.items.cars;
    this.allCars = this.cars.scene.children.sort((a, b) =>
      parseInt(a.name.substr(4, 6) - parseInt(b.name.substr(4, 6)))
    );
    console.log(this.allCars);
    this.allCars[0].position.y = 0.118;
    this.allCars[1].position.y = 0.118;
    this.allCars[2].position.y = 0.118;
    this.allCars[3].position.y = 0.138;
    this.allCars[4].position.y = 0.138;
    this.allCars[5].position.y = 0.138;
    this.allCars.map((c) => (c.scale.x *= 0.9));

    // this.setModel();

    document.addEventListener('click', () => this.addCar());
    this.backLeftSpots = {
      spots: this.fillAndShuffleArray(),
      startingX: -3.67,
      startingZ: 1.94,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.backRightSpots = {
      spots: this.fillAndShuffleArray(),
      startingX: -3.67,
      startingZ: 2.6,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.frontLeftSpots = {
      spots: this.fillAndShuffleArray(),
      startingX: -3.2,
      startingZ: 1.94,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.frontRightSpots = {
      spots: this.fillAndShuffleArray(),
      startingX: -3.2,
      startingZ: 2.6,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.spots = [
      this.frontLeftSpots,
      this.frontRightSpots,
      this.backLeftSpots,
      this.backRightSpots,
    ];
  }

  setModel() {
    console.log(this.allCars);
    const c = this.allCars[0];
    this.scene.add(c);
    //1.97
    //-3.67
    c.position.x = -2.536;
    c.position.y = 0.125;
    c.position.z = 1.94;
    c.scale.x /= 2;
    c.scale.y /= 2;
    c.scale.z /= 2;
    // c.scale.set(0.5, 0.5, 0.5);

    // this.scene.add(this.allCars[1]);
    // this.scene.add(this.allCars[2]);
  }

  fillAndShuffleArray() {
    let array = [];
    for (let a = 0; a < 8; a++) {
      for (let b = 0; b < 3; b++) {
        array.push(`${a} ${b}`);
      }
    }
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  addCar() {
    const randomSpotNumber = Math.floor(Math.random() * this.spots.length);
    const randomSpot = this.spots[randomSpotNumber];
    if (randomSpot.spots.length > 0) {
      const [xPos, yPos] = randomSpot.spots.shift().split(' ');
      const car =
        this.allCars[Math.floor(Math.random() * this.allCars.length)].clone();
      this.scene.add(car);
      car.scale.x /= 2;
      car.scale.y /= 2;
      car.scale.z /= 2;
      const randomX = randomSpot.startingX + xPos * randomSpot.xIncrement;
      const randomZ = randomSpot.startingZ + yPos * randomSpot.zIncrement;
      car.position.x = randomX;
      car.position.z = randomZ;
    }
  }
}
