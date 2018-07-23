# msgpack.js

This is a [MessagePack](https://msgpack.org) codec written in JavaScript for web browsers (including IE 11). Support for JavaScript servers like Node.js is unknown because I’m not using those, but I see no reason why it shouldn’t work.

It is compact but still fully-featured. This library supports the complete [MessagePack specification](https://github.com/msgpack/msgpack/blob/master/spec.md) released on 2017-08-09, including date/time values. No other extension types are implemented in this library, it’s only the standard types which is perfectly fine for interoperability with MessagePack codecs in other programming languages.

I’m using the [MessagePack-CSharp](https://github.com/neuecc/MessagePack-CSharp/) library on the server side in my .NET applications.

## MessagePack

MessagePack is an efficient binary serialisation format. It lets you exchange data among multiple languages like JSON. But it’s faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves.

## Size

This codec is very lightweight. The source code has around **450 lines**, the minified file is below 6 kB and can be GZip-compressed to **2 kB**.

## Performance

The file msgpack-tests.html contains some tests and a benchmark function that compares this library with [msgpack-lite](https://github.com/kawanet/msgpack-lite). Here are the results, in milliseconds (lower is better). All tests done on an Intel Core i7-3770 and Windows 10.

Function           | Chrome 67 | Firefox 61 | Edge 16 | IE 11
:------------------|----------:|-----------:|--------:|-------:
serializeMsgPack   |    660 ms |    1370 ms | 2250 ms | 2600 ms
msgpack.encode     |    580 ms |    1750 ms | 1730 ms | 2490 ms
deserializeMsgPack |    620 ms |    1310 ms | 2240 ms |  890 ms
msgpack.decode     |    400 ms |     630 ms | 1380 ms | 1720 ms

This shows that this library is comparable with msgpack-lite when encoding. When decoding, it takes up to twice the time or is even much faster, depending on the browser. Chrome’s JavaScript execution is considerably faster than Firefox. Microsoft browsers are almost always the slowest.

## Usage

The source file contains two public functions: `serializeMsgPack` and `deserializeMsgPack`. The first can be called with any data and returns the encoded bytes. The second works in reverse, taking the encoded bytes and returning the runtime value.

Here’s a simple example:

```js
// Define some data to encode
var sourceData = {
    number: 123,
    number2: -0.129,
    text: "Abc with Üñıçôðé and ユニコード",
    flag: true,
    list: [ 1, 2, 3 ],
    obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
    time: Date.now()
};

// Encode to byte array
var encodedBytes = serializeMsgPack(sourceData);

// Decode again
var decodedData = deserializeMsgPack(encodedBytes);
```

Include the JavaScript file into your HTML document like this:

```html
<script src="msgpack.min.js"></script>
```

You can use the codec functions after loading the script. No additional configuration required.

## License

[MIT license](https://github.com/ygoe/msgpack.js/blob/master/LICENSE)
