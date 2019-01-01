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

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
