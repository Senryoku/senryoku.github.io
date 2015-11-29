function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
	var buf = Module._malloc(contents.byteLength);
	var dataHeap = new Uint8Array(Module.HEAPU8.buffer, buf, contents.byteLength);
	dataHeap.set(new Uint8Array(contents));
	Module.ccall('load_rom', 'number', ['number', 'number'], [dataHeap.byteOffset, contents.byteLength]);
	Module._free(buf);
  };
  reader.readAsArrayBuffer(file);
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);
 
function file_load(r)
{
	document.getElementById('file-input').click();
}

document.getElementById('load-rom')
  .addEventListener('click', file_load, false);