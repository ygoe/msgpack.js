# msgpack.js

This is a [MessagePack](https://msgpack.org) serializer and deserializer written in JavaScript for web browsers (including IE 11) and Node.js.

It is compact but still fully-featured. This library supports the complete [MessagePack specification](https://github.com/msgpack/msgpack/blob/master/spec.md) released on 2017-08-09, including date/time values. No other extension types are implemented in this library, it’s only the standard types which is perfectly fine for interoperability with MessagePack codecs in other programming languages.

I’m using the [MessagePack-CSharp](https://github.com/neuecc/MessagePack-CSharp/) library on the server side in my .NET applications.

[![NPM](https://img.shields.io/npm/v/@ygoe/msgpack.svg)](https://www.npmjs.com/package/@ygoe/msgpack)

## MessagePack

MessagePack is an efficient binary serialisation format. It lets you exchange data among multiple languages like JSON. But it’s faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves.

## Size

This library is very lightweight. The source code has around **510 lines** (incl. browser/Node detection), the minified file has 6.6 kB and can be GZip-compressed to **2.4 kB**.

## Performance

The file msgpack-tests.html contains some tests and a benchmark function that compares this library with [msgpack-lite](https://github.com/kawanet/msgpack-lite). Here are the results, in milliseconds (lower is better). All tests done on an Intel Core i7-3770 and Windows 10.

Function                   | Chrome 72 |      | Firefox 65 |      | Edge 16 |      | IE 11  | &nbsp;
:--------------------------|----------:|-----:|-----------:|-----:|--------:|-----:|-------:|-----:
**msgpack.js serialize**   |    702 ms |  +6% |    1232 ms | −42% | 2483 ms | +41% | 2493 ms|  −3%
msgpack-lite encode        |    663 ms |      |    2124 ms |      | 1762 ms |      | 2578 ms|
**msgpack.js deserialize** |    652 ms | +13% |     869 ms |  +5% |  821 ms | −48% |  651 ms| −68%
msgpack-lite decode        |    577 ms |      |     827 ms |      | 1587 ms |      | 2021 ms|

The numbers show that this library is comparable with msgpack-lite. In Chrome it’s only 10% slower. But serializing in Firefox and deserializing in Microsoft browsers is twice as fast.

## Usage

### Browser

In browsers, a global `msgpack` object is created that contains the functions `serialize` and `deserialize`. The first can be called with any data and returns the serialized bytes. The second works in reverse, taking the serialized bytes and returning the runtime value.

Include the JavaScript file into your HTML document like this:

```html
<script src="msgpack.min.js"></script>
```

You can use the library functions after loading the script.

If there should be a naming conflict with another library you want to load, you can change the global object name from `msgpack` to something else by setting `msgpackJsName` before loading the script file:

```html
<script>
    msgpackJsName = "msgpackJs";
</script>
<script src="msgpack.min.js"></script>
```

### Node.js

In Node.js, these functions are exported in the object you get from the `require` function.

```js
var msgpack = require('@ygoe/msgpack');
```

### Example

Here’s a simple example:

```js
// Define some data
var sourceData = {
    number: 123,
    number2: -0.129,
    text: "Abc with Üñıçôðé and ユニコード",
    flag: true,
    list: [ 1, 2, 3 ],
    obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
    time: Date.now()
};

// Serialize to byte array
var bytes = msgpack.serialize(sourceData);

// Deserialize again
var deserializedData = msgpack.deserialize(bytes);
```

### Compatibility

You can also use the functions `encode` and `decode` which are aliases to `serialize` and `deserialize`. This makes it easier to replace other libraries that use these function names with msgpack.js.

New projects should use the preferred (and more precisely named) `serialize` and `deserialize` functions though.

## License

[MIT license](https://github.com/ygoe/msgpack.js/blob/master/LICENSE)
