var path = require('path');
var ipfsAPI = require('ipfs-api');

// Default settings
var ipfs = ipfsAPI();

// node id
var id;

ipfs.id()
.then(response => {
	id = response.id;
	console.log('id', id);
	return uploadToIPFS();
})
.catch(function (err) {
	console.log('error during main', err);
});

uploadToIPFS = () => {
	var dirpath = path.resolve(__dirname, '..', 'build');
	console.log('dirpath', dirpath);
	return ipfs.util.addFromFs(dirpath, {recursive: true})
	.then(result => {
		console.log('length of result', result.length);
		var lastHash;
		for (var i = 0; i < result.length; i++) {
			var file = result[i];
			if (/build$/.test(file.path)) {
				lastHash = file.hash;
				break;
			}
		}
		console.log('lastHash', lastHash);
		return ipfs.name.publish(lastHash);
	})
	.then(() => {
		console.log(`published at http://localhost:8080/ipns/${id} and
	https://gateway.ipfs.io/ipns/${id}`);
	})
	.catch((err) => {
		console.log('error caught', err);
	});
}