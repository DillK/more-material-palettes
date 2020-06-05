import colors from "./colors.json";
import * as fs from "fs";
import { createCanvas } from "canvas";
import { PaletteGenerator } from "./PaletteGenerator";

console.log("!!! Start !!!");

const gen = new PaletteGenerator();

for (let i = 0; i < colors.length; i++) {
  let val = gen.computeColors(colors[i].rgb);
  let color = {
    name: colors[i].name,
    "50": {
      hex: val[0].hex.toUpperCase(),
      contrast: val[0].darkContrast ? "dark" : "light",
    },
    "100": {
      hex: val[1].hex.toUpperCase(),
      contrast: val[1].darkContrast ? "dark" : "light",
    },
    "200": {
      hex: val[2].hex.toUpperCase(),
      contrast: val[2].darkContrast ? "dark" : "light",
    },
    "300": {
      hex: val[3].hex.toUpperCase(),
      contrast: val[3].darkContrast ? "dark" : "light",
    },
    "400": {
      hex: val[4].hex.toUpperCase(),
      contrast: val[4].darkContrast ? "dark" : "light",
    },
    "500": {
      hex: val[5].hex.toUpperCase(),
      contrast: val[5].darkContrast ? "dark" : "light",
    },
    "600": {
      hex: val[6].hex.toUpperCase(),
      contrast: val[6].darkContrast ? "dark" : "light",
    },
    "700": {
      hex: val[7].hex.toUpperCase(),
      contrast: val[7].darkContrast ? "dark" : "light",
    },
    "800": {
      hex: val[8].hex.toUpperCase(),
      contrast: val[8].darkContrast ? "dark" : "light",
    },
    "900": {
      hex: val[9].hex.toUpperCase(),
      contrast: val[9].darkContrast ? "dark" : "light",
    },
    A100: {
      hex: val[10].hex.toUpperCase(),
      contrast: val[10].darkContrast ? "dark" : "light",
    },
    A200: {
      hex: val[11].hex.toUpperCase(),
      contrast: val[11].darkContrast ? "dark" : "light",
    },
    A400: {
      hex: val[12].hex.toUpperCase(),
      contrast: val[12].darkContrast ? "dark" : "light",
    },
    A700: {
      hex: val[13].hex.toUpperCase(),
      contrast: val[13].darkContrast ? "dark" : "light",
    },
  };

  let palMat = `$${color.name}: (
	50: ${color[50].hex},
	100: ${color[100].hex},
	200: ${color[200].hex},
	300: ${color[300].hex},
	400: ${color[400].hex},
	500: ${color[500].hex},
	600: ${color[600].hex},
	700: ${color[700].hex},
	800: ${color[800].hex},
	900: ${color[900].hex},
	A100: ${color.A100.hex},
	A200: ${color.A200.hex},
	A400: ${color.A400.hex},
	A700: ${color.A700.hex},
	contrast: (
		50: $${color[50].contrast}-primary-text,
		100: $${color[100].contrast}-primary-text,
		200: $${color[200].contrast}-primary-text,
		300: $${color[300].contrast}-primary-text,
		400: $${color[400].contrast}-primary-text,
		500: $${color[500].contrast}-primary-text,
		600: $${color[600].contrast}-primary-text,
		700: $${color[700].contrast}-primary-text,
		800: $${color[800].contrast}-primary-text,
		900: $${color[900].contrast}-primary-text,
		A100: $${color.A100.contrast}-primary-text,
		A200: $${color.A200.contrast}-primary-text,
		A400: $${color.A400.contrast}-primary-text,
		A700: $${color.A700.contrast}-primary-text
	)
) !default;
`;

  if (!fs.existsSync(`./palettes`)) {
    fs.mkdirSync(`./palettes`);
  }

  if (!fs.existsSync(`./palettes/${color.name}`)) {
    fs.mkdirSync(`./palettes/${color.name}`);
  }

  fs.writeFileSync(
    `./palettes/${color.name}/${color.name}.json`,
    JSON.stringify(color)
  );

  fs.writeFileSync(`./palettes/${color.name}/${color.name}.scss`, palMat);

  let w = 400;
  let h = 600;
  let row = h / 14;
  let ftSize = 16;
  let rowCenter = Math.ceil(row / 2);
  let dark = "black";
  let light = "white";
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  ctx.font = `bold ${ftSize}px Segoe Ui`;

  // Stroke the palette
  for (let j = 0; j < val.length; j++) {
    let startY = j * row;
    let endY = (j + 1) * row;
    let ftPosition = startY + ftSize * 1.75;
    ctx.fillStyle = val[j].hex;
    ctx.fillRect(0, startY, w, endY);

    if (val[j].darkContrast) {
      ctx.fillStyle = dark;
    } else {
      ctx.fillStyle = light;
    }

    let label = val[j].name;
    if (j == 0) label = `${color.name.toUpperCase()} ${label}`;
    ctx.fillText(`${label}`, ftSize, ftPosition);
    ctx.fillText(
      `${val[j].hex.toUpperCase()}`,
      w - rowCenter * 3.5,
      ftPosition
    );
  }

  let buf = canvas.toBuffer();
  fs.writeFileSync(`./palettes/${color.name}/sample.png`, buf);

  let readme = `# ${color.name.toUpperCase()}

<img src="./sample.png">`;

  fs.writeFileSync(`./palettes/${color.name}/readme.md`, readme);
}

console.log("!!! End !!!");
