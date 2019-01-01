# gf [![NPM Version](https://img.shields.io/npm/v/gm.svg?style=flat)](https://www.npmjs.org/package/node-gifd)

node library for gif creation

## Bug Reports

When reporting bugs please include copies of any images you're having problems with.

## Basic Usage

```js
import gf from "gifd";

let size = { width: 1080, height: 1080 };
let delay = 20; // ms

// Expected output is a relative path to the location of your gif.
const createGif = async () => await gf(imageUrls, brandUrl, size, delay);
```

## Custom Arguments

1. size as `{width , height}` - default `{ width: 1080 , height:1080}`
2. delay as `num` - DEFAULT `20` ms

## License

(The MIT License)

Copyright (c) 2018 [David Castaneda](dcast188@fiu.com)
