let showing = 'none'

function slide(id) {
	showing !== 'none' && document.getElementById(showing).removeAttribute('style')

	if (showing === id) {
		showing = 'none'
	} else {
		document.getElementById(id).style.width = '300px'
		showing = id
	}
}
