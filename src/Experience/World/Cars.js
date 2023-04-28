import Experience from '../Experience';

export default class Cars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.cars = this.experience.resources.items.cars;
    this.allCars = this.cars.scene.children.sort((a, b) =>
      parseInt(a.name.substr(4, 6) - parseInt(b.name.substr(4, 6)))
    );

    // this.setModel();

    document.addEventListener('click', () => this.addCar());
    this.backLeftSpots = {
      spots: new Array(8).fill(new Array(3)),
      startingX: -3.67,
      startingZ: 1.94,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.backRightSpots = {
      spots: new Array(8).fill(new Array(3)),
      startingX: -3.67,
      startingZ: 2.6,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.frontLeftSpots = {
      spots: new Array(8).fill(new Array(3)),
      startingX: -3.42,
      startingZ: 1.94,
      xIncrement: 1.134,
      zIncrement: 0.2,
    };
    this.frontRightSpots = {
      spots: new Array(8).fill(new Array(3)),
      startingX: -3.42,
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

  addCar() {
    const randomSpotNumber = Math.floor(Math.random() * this.spots.length);
    const randomSpot = this.spots[randomSpotNumber];
    let randomCarSpotX;
    let randomCarSpotY;
    do {
      randomCarSpotX = Math.floor(Math.random() * randomSpot.spots[0].length);
      randomCarSpotY = Math.floor(Math.random() * randomSpot.spots.length);
      console.log(randomCarSpotY, randomCarSpotX);
    } while (randomSpot.spots[randomCarSpotY][randomCarSpotX] == 'Car!');
    console.log('-----------------------------');
    this.spots[randomSpotNumber].spots[randomCarSpotY][randomCarSpotX] = 'Car!';
    const car =
      this.allCars[Math.floor(Math.random() * this.allCars.length)].clone();
    this.scene.add(car);
    car.scale.x /= 2;
    car.scale.y /= 2;
    car.scale.z /= 2;
    const randomX =
      randomSpot.startingX + randomCarSpotY * randomSpot.xIncrement;
    const randomZ =
      randomSpot.startingZ + randomCarSpotX * randomSpot.zIncrement;
    car.position.x = randomX;
    car.position.z = randomZ;
  }
}
