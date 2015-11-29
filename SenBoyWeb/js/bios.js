function toggle_bios() {
	Module.ccall('toggle_bios', 'number', [], []);
}
	
document.getElementById('toggle-bios')
  .addEventListener('click', toggle_bios);