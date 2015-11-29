function toggle_sound() {
	Module.ccall('toggle_sound', 'number', [], []);
}
	
document.getElementById('sound-control')
  .addEventListener('click', toggle_sound);