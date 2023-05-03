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

    document.addEventListener('Car', () => this.addCar());
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
      xIncrement: 1.14,
      zIncrement: 0.175,
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
    this.eastSpots = {
      spots: this.fillAndShuffleArray(15, 5),
      startingX: -7.7,
      startingZ: -6.8,
      xIncrement: 0.25,
      zIncrement: 0.4,
    };
    this.spots = [
      this.frontLeftSpots,
      this.frontRightSpots,
      this.backLeftSpots,
      this.backRightSpots,
      this.eastSpots,
    ];

    //  this.startingCarCount = localStorage.getItem('Visitor Count');
    //  if (this.startingCarCount) {
    //    for (let i = 0; i < Number(this.startingCarCount); i++) {
    //      this.addCar();
    //    }
    //  }
    for (let i = 0; i < 20; i++) {
      this.addCar();
    }
  }

  fillAndShuffleArray(x = 8, y = 3) {
    let array = [];
    for (let a = 0; a < x; a++) {
      for (let b = 0; b < y; b++) {
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
      if (randomSpotNumber == 4) {
        car.rotation.z = 0;
      }
    }
  }
}
