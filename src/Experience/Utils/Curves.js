import { CatmullRomCurve3, Vector3 } from 'three';
export default class Curves {
  /*
  CORRECT STARTING SPOT:
  new Vector3(-1.23, 0.21, 1.08);
  new Vector3(-6.03, 0.21, 1.08);

  */

  // static CenterToCoding = [
  //   new Vector3(0, 8, 13.78),
  //   new Vector3(-5.85, 0.6, 1.5),
  //   new Vector3(-5.67, 0.6, -0.24),
  //   new Vector3(-5.43, 0.6, -0.33),
  //   new Vector3(-5.43, 0.6, -0.5),
  //   new Vector3(-5.69, 0.55, -0.5),
  // ];
  static CenterToCoding = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-5.85, 0.21, 1.5),
      new Vector3(-5.67, 0.6, 0.06),
      new Vector3(-5.43, 0.6, -0.03),
      new Vector3(-5.43, 0.6, -0.2),
      new Vector3(-5.69, 0.55, -0.2),
    ],
  };
  static CodingToCenter = [
    new Vector3(-5.69, 0.55, -0.5),
    new Vector3(-5.43, 0.6, -0.5),
    new Vector3(-5.43, 0.6, -0.33),
    new Vector3(-5.67, 0.6, -0.24),
    new Vector3(-5.85, 0.6, 1.5),
    new Vector3(0, 8, 13.78),
  ];

  static CenterToHVAC = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-6.03, 0.21, 1.08),
      new Vector3(-7.09, 0.21, 0.07),
      new Vector3(-6.57, 0.21, -0.52),
      new Vector3(-6.52, 0.21, -0.78),
      new Vector3(-5.63, 0.21, -0.77),
      new Vector3(-5.43, 0.21, -0.65),
      new Vector3(-3.14, 0.21, -0.43),
      new Vector3(-1.8, 0.21, -0.35),
      new Vector3(-1.82, 0.21, -1.15),
      new Vector3(-1.35, 0.21, -1.23),
    ],
  };
  static HVACToCenter = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-3.13, 0.21, -0.96),
      new Vector3(-3.14, 0.21, -0.65),
      new Vector3(-5.43, 0.21, -0.75),
      new Vector3(-5.63, 0.21, -0.87),
      new Vector3(-6.52, 0.21, -0.88),
      new Vector3(-6.57, 0.21, -0.62),
      new Vector3(-7.09, 0.21, -0.03),
      new Vector3(0, 8, 13.78),
    ],
  };
  static CenterToConstruction = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-6.03, 0.21, 1.08),
      new Vector3(-7.09, 0.21, 0.07),
      new Vector3(-6.57, 0.21, -0.52),
      new Vector3(-6.52, 0.21, -0.78),
      new Vector3(-5.63, 0.21, -0.77),
      new Vector3(-5.43, 0.21, -0.65),
      new Vector3(-3.14, 0.21, -0.43),
      new Vector3(-2.03, 0.21, -0.35),
      new Vector3(-2.09, 0.21, -0.91),
      new Vector3(-2.26, 0.21, -1.13),
    ],
  };
  static CenterToElectrical = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-6.03, 0.21, 1.08),
      new Vector3(-7.09, 0.21, 0.07),
      new Vector3(-6.57, 0.21, -0.52),
      new Vector3(-6.52, 0.21, -0.78),
      new Vector3(-5.63, 0.21, -0.77),
      new Vector3(-5.43, 0.21, -0.65),
      new Vector3(-4.07, 0.21, -0.48),
      new Vector3(-4.12, 0.21, -1.06),
    ],
  };
  static CenterToDiesel = {
    move: new Vector3(-3.95, 8.43, 2.83),
    look: new Vector3(-4, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-6.03, 0.21, 1.08),
      new Vector3(-7.09, 0.21, 0.07),
      new Vector3(-6.57, 0.21, -0.52),
      new Vector3(-6.52, 0.21, -0.78),
      new Vector3(-5.63, 0.21, -0.77),
      new Vector3(-5.43, 0.21, -0.65),
      new Vector3(-3.66, 0.21, -0.48),
      new Vector3(-3.62, 0.21, 0.14),
    ],
  };
  static CenterToPharmacy = {
    move: new Vector3(-6.5, 8.43, 0.83),
    look: new Vector3(-6.5, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-6.03, 0.21, 1.08),
      new Vector3(-7.09, 0.21, 0.07),
      new Vector3(-6.57, 0.21, -0.52),
      new Vector3(-6.52, 0.21, -0.78),
      new Vector3(-6.11, 0.21, -0.83),
      new Vector3(-5.99, 0.21, -1.46),
      new Vector3(-5.94, 0.21, -1.54),
    ],
  };
  static CenterToAuto = {
    move: new Vector3(2.25, 8.43, 3),
    look: new Vector3(2.25, 0, 0),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-0.29, 0.21, 1.2),
      new Vector3(4.24, 0.21, 1.2),
      new Vector3(4.47, 0.21, -0.63),
      new Vector3(4.33, 0.21, -0.61),
      new Vector3(3.53, 0.21, -0.61),
    ],
  };
  static AutoToCenter = [
    new Vector3(4.6, 0.21, 0.85),
    new Vector3(4.7, 0.21, 1.32),
    new Vector3(-0.29, 0.63, 1.73),
    new Vector3(0, 8, 13.78),
  ];
  static CenterToAutoCollision = {
    move: new Vector3(1.4, 8.36, 2.3),
    look: new Vector3(1.4, 0, -1.35),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-0.41, 0.33, 1.43),
      new Vector3(0.33, 0.21, 0.45),
      new Vector3(0.62, 0.21, -2.06),
      new Vector3(5.2, 0.21, -2.26),
      new Vector3(5.25, 0.21, -2.65),
    ],
  };
  static AutoCollisionToCenter = [
    new Vector3(5.15, 0.21, -1.95),
    new Vector3(5.1, 0.21, -1.56),
    new Vector3(0.62, 0.21, -1.46),
    new Vector3(0.33, 0.21, 0.45),
    new Vector3(-0.41, 0.33, 1.43),
    new Vector3(0, 8, 13.78),
  ];
  static CenterToVet = {
    move: new Vector3(3.35, 13.61, 2.24),
    look: new Vector3(3.4, 0, 2.1),
    line: [
      new Vector3(-1.23, 0.21, 1.08),
      new Vector3(-0.41, 0.21, 1),
      new Vector3(6.17, 0.21, 1.56),
      new Vector3(6.82, 0.21, 1.65),
      new Vector3(6.92, 0.21, 2.63),
      new Vector3(7.77, 0.21, 2.72),
    ],
  };
  static VetToCenter = [
    new Vector3(5.7, 0.33, 1.83),
    new Vector3(-0.41, 0.83, 1.61),
    new Vector3(0, 8, 13.78),
  ];
}
