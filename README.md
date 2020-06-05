# More Material Palettes

I found the default palettes provided by the [Material Design color system](https://material.io/design/color/the-color-system.html#tools-for-picking-colors) document to be very limiting.

The [W3C CSS](https://www.w3.org/TR/css-color-3/) spec has a long list of default colors, so I thought it would be nice to generate a list of those colors as palettes to pick from.

I've used [Material Design Palette Generator](http://mcg.mbitson.com/#!?mcgpalette0=%233f51b5) ([repo](https://github.com/mbitson/mcg)) in the past, and had the bright idea to use it to generator palettes for all the colors from the CSS spec.

The source code I used is here as well, but I wrote it to be quick and dirty - don't expect much from it. There in case someone is interested.

I've only targeted Angular2 for the palette output, but I've included the json I collected and generated incase others wanted to use the data for other frameworks.

Hopefully other people may find these useful too.

# Quick Start

```
$ npm install
$ ts-node src/index.ts
```

Thanks! 👋
