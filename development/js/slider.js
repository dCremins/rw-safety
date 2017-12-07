let showing = 'none'

function slide(id) {
	showing !== 'none' && document.getElementById(showing).removeAttribute('style')

	if (showing === id) {
		showing = 'none'
	} else {
		document.getElementById(id).style.width = '450px'
		document.getElementById(id).style.padding = '30px'
		showing = id
	}
}
