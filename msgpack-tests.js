//test();
benchmark();

// Performs several conversions and compares the result for equality.
function test() {
	// Define the data to encode
	//var data = -65;
	var data = -11114294967299;
	//var data = 4294967298;
	//var data = new Date(2001, 1 /*Feb*/, 3, 4, 5, 6);
	//var data = new Date(2110, 1 /*Feb*/, 3, 4, 5, 6);
	//var data = new Date(0x3ffffffff * 1000 + 50);
	//var data = new Date(0xfffffffff * 1000 + 50);

	// Perform the conversion and back
	var json = JSON.stringify(data);
	var bin = serializeMsgPack(data);
	//var data2 = msgpack.decode(bin);
	var data2 = deserializeMsgPack(bin);
	
	// NOTE: Workaround for datetime decoding which is not supported by kawanet/msgpack-lite
	//if (data2.type === 255 && data2.buffer.length === 4) {
	//	var sec = ((data2.buffer[0] << 24) >>> 0) +
	//		((data2.buffer[1] << 16) >>> 0) +
	//		((data2.buffer[2] << 8) >>> 0) +
	//		data2.buffer[3];
	//	console.log("sec", sec);
	//	data2 = new Date(sec * 1000);
	//}
	//if (data2.type === 255 && data2.buffer.length === 8) {
	//	var ns = ((data2.buffer[0] << 22) >>> 0) +
	//		((data2.buffer[1] << 14) >>> 0) +
	//		((data2.buffer[2] << 6) >>> 0) +
	//		(data2.buffer[3] >>> 2);
	//	let pow32 = 0x100000000;   // 2^32
	//	var sec = ((data2.buffer[3] & 0x3) * pow32) +
	//		((data2.buffer[4] << 24) >>> 0) +
	//		((data2.buffer[5] << 16) >>> 0) +
	//		((data2.buffer[6] << 8) >>> 0) +
	//		data2.buffer[7];
	//	console.log("sec", sec, "ns", ns);
	//	data2 = new Date(sec * 1000 + ns / 1000000);
	//}
	//if (data2.type === 255 && data2.buffer.length === 12) {
	//	var ns = ((data2.buffer[0] << 24) >>> 0) +
	//		((data2.buffer[1] << 16) >>> 0) +
	//		((data2.buffer[2] << 8) >>> 0) +
	//		data2.buffer[3];
	//	let pow32 = 0x100000000;   // 2^32
	//	var hi = ((data2.buffer[4] << 24) >>> 0) +
	//		((data2.buffer[5] << 16) >>> 0) +
	//		((data2.buffer[6] << 8) >>> 0) +
	//		data2.buffer[7];
	//	var lo = ((data2.buffer[8] << 24) >>> 0) +
	//		((data2.buffer[9] << 16) >>> 0) +
	//		((data2.buffer[10] << 8) >>> 0) +
	//		data2.buffer[11];
	//	var sec = hi * pow32 + lo;
	//	console.log("sec", sec, "ns", ns);
	//	data2 = new Date(sec * 1000 + ns / 1000000);
	//}

	var json2 = JSON.stringify(data2);

	// Compare the two JSON representations
	if (json === json2) {
		alert("Test passed:\n\n" + json);
	}
	else {
		alert("Test FAILED:\n\n" + data + "\n" + json + "\n\n" + Array.from(bin).map(function (x) { return x.toString(16); }) + "\n\n" + data2 + "\n" + json2);
	}
}

// Runs several functions in a loop to measure the time spent.
function benchmark() {
	// Define the data to test with
	let data = {
		number1: 1,
		number2: 20,
		number3: 200,
		number4: 200000,
		number5: 8000000000000,
		number6: -1,
		number7: -200,
		number8: -8000000000000,
		number9: 0.3,
		number10: 123.456,
		number11: -100.234,
		number12: -456789.345,
		number13: -0.127666,
		text1: "Abc",
		text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel odio vehicula, commodo turpis non, fringilla mi. Sed ornare urna ut accumsan cursus.",
		text3: "In fermentum dui convallis, finibus velit ut, aliquam urna. Fusce vitae arcu dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut efficitur aliquet nulla, euismod sodales lorem blandit eu. Etiam rhoncus felis non nunc aliquam ullamcorper.",
		text4: " Mauris vestibulum nibh nec gravida ullamcorper. Donec congue fermentum arcu, a interdum leo sollicitudin nec. Quisque pharetra nisl vitae lacinia iaculis. Donec egestas, dui eget faucibus tincidunt, dui eros sodales mauris, lobortis porta mauris odio eu dui. In vestibulum sodales felis, non faucibus eros volutpat vitae.",
		text5: "この記事の内容の信頼性について検証が求められています。確認のための文献や情報源をご存じの方はご提示ください。出典を明記し、記事の信頼性を高めるためにご協力をお願いします。議論はノートを参照してください。（2008年11月）",
		text6: "Some emoticons: 🐀򐀀 🐀򐰀 🐀򠠀 🐀򡀀",
		flag: true,
		list1: [ 1, 2, "A", "bc", false ],
		list2: [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],
		list3: [ 123, 4567, 89012, 345678, 9012345, 67890123, 456789012, 3456789012, 34567890123 ],
		list4: [ 0.123, 1.234, 2.3456, 3.45678, 4.5678901, 5.1234567, 6.123456 ],
		list5: [ "A", "Bb", "C", "Dd", "E", "Ff", "G", "Hh", "I", "Jj" ],
		obj1: {
			a: 123,
			b: 456,
			c: 1.2,
			d: "Text",
			obj: {
				x: 0,
				y: 4096,
				z: -3
			}
		}
	};
	
	// Convert the data to MsgPack and back to verify correctness
	let bin = serializeMsgPack(data);
	//let bin = msgpack.encode(data);

	//var bin1 = serializeMsgPack(data);
	//var bin2 = msgpack.encode(data);
	//let s1 = Array.from(bin1).map(x => x.toString(16).padStart(2, "0"))
	//let s2 = Array.from(bin2).map(x => x.toString(16).padStart(2, "0"))
	//if (s1 !== s2) document.getElementById("log").innerHTML += "Mismatch:<br><br>" + s1 + "<br><br>" + s2 + "<hr>";
	
	let str1 = JSON.stringify(data);
	let str2 = JSON.stringify(deserializeMsgPack(bin));
	if (str1 !== str2) document.getElementById("log").innerHTML += "Mismatch:<br><br>" + str1 + "<br><br>" + str2 + "<hr>";

	// Initialise the benchmark loop	
	let step = 0;
	let minTime = -1;

	// Start the first iteration without blocking the browser for the entire benchmark duration
	setTimeout(run, 100);
	
	function run() {
		step++;
		let t0 = Math.round(performance.now());
		// NOTE: performance.now is only accurate to a few milliseconds. This is compensated by making the test run longer.
		for (var i = 0; i < 20000; i++) {
			// Call the function to benchmark
			let bin2 = serializeMsgPack(data);   // 660 / 1370 / 2250 / 2600 (Chrome / Firefox / Edge / IE11) [ms]
			//let bin2 = msgpack.encode(data);   // 580 / 1750 / 1730 / 2490
			//let data2 = deserializeMsgPack(bin);   // 620 / 1310 / 2240 / 890
			//let data2 = msgpack.decode(bin);   // 400 / 630 / 1380 / 1720
		}
		let t1 = Math.round(performance.now());
		document.getElementById("log").innerHTML += "Step " + step + ": " + (t1 - t0) + " ms<br>";
		if (minTime === -1)
			minTime = t1 - t0;
		else
			minTime = Math.min(minTime, t1 - t0);

		// Stop after 10 iterations and show the minimum time spent
		if (step < 10)
			setTimeout(run, 100);
		else
			document.getElementById("log").innerHTML += "Minimum time: <b>" + minTime + " ms</b><br>";
	}
}
