import tinycolor from "tinycolor2";

interface Settings {
  algorithm: "traditional" | "constantin" | "buckner";
  algorithms: string[];
}

export class PaletteGenerator {
  // Init settings object
  public settings: Settings = {
    algorithm: "constantin",
    algorithms: ["traditional", "constantin", "buckner"],
  };

  constructor() {}

  getColorObject(value: tinycolor.Instance, name: string) {
    var c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight(),
    };
  }

  multiply(
    rgb1: tinycolor.ColorFormats.RGBA,
    rgb2: tinycolor.ColorFormats.RGBA
  ) {
    rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
    rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
    rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
    return tinycolor("rgb " + rgb1.r + " " + rgb1.g + " " + rgb1.b);
  }

  computeColors(hex: tinycolor.ColorInput) {
    // Return array of color objects.
    switch (this.settings.algorithm) {
      case "constantin":
        var baseLight = tinycolor("#ffffff");
        var baseDark = this.multiply(
          tinycolor(hex).toRgb(),
          tinycolor(hex).toRgb()
        );
        var baseTriad = tinycolor(hex).tetrad();
        return [
          this.getColorObject(tinycolor.mix(baseLight, hex, 12), "50"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 30), "100"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 50), "200"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 70), "300"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 85), "400"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 100), "500"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 87), "600"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 70), "700"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 54), "800"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 25), "900"),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(65),
            "A100"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(55),
            "A200"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(45),
            "A400"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(40),
            "A700"
          ),
        ];

      case "buckner":
        var baseLight = tinycolor("#ffffff");
        var baseDark = this.multiply(
          tinycolor(hex).toRgb(),
          tinycolor(hex).toRgb()
        );
        var baseTriad = tinycolor(hex).tetrad();

        return [
          this.getColorObject(tinycolor.mix(baseLight, hex, 12), "50"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 30), "100"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 50), "200"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 70), "300"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 85), "400"),
          this.getColorObject(tinycolor.mix(baseLight, hex, 100), "500"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 87), "600"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 70), "700"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 54), "800"),
          this.getColorObject(tinycolor.mix(baseDark, hex, 25), "900"),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(48),
            "A100"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(36),
            "A200"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(31),
            "A400"
          ),
          this.getColorObject(
            tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(28),
            "A700"
          ),
        ];

      default:
        return [
          this.getColorObject(tinycolor(hex).lighten(52), "50"),
          this.getColorObject(tinycolor(hex).lighten(37), "100"),
          this.getColorObject(tinycolor(hex).lighten(26), "200"),
          this.getColorObject(tinycolor(hex).lighten(12), "300"),
          this.getColorObject(tinycolor(hex).lighten(6), "400"),
          this.getColorObject(tinycolor(hex), "500"),
          this.getColorObject(tinycolor(hex).darken(6), "600"),
          this.getColorObject(tinycolor(hex).darken(12), "700"),
          this.getColorObject(tinycolor(hex).darken(18), "800"),
          this.getColorObject(tinycolor(hex).darken(24), "900"),
          this.getColorObject(tinycolor(hex).lighten(50).saturate(30), "A100"),
          this.getColorObject(tinycolor(hex).lighten(30).saturate(30), "A200"),
          this.getColorObject(tinycolor(hex).lighten(10).saturate(15), "A400"),
          this.getColorObject(tinycolor(hex).lighten(5).saturate(5), "A700"),
        ];
    }
  }
}
