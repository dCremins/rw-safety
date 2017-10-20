function onDocumentMouseCancel(event) {
	controls.enabled = true
	event.preventDefault()
	if (selected) {
		selected = null
	}
	renderer.domElement.style.cursor = 'auto'
}

function onDocumentTouchEnd(event) {
	controls.enabled = true
	event.preventDefault()
	if (selected) {
		selected = null
	}
	renderer.domElement.style.cursor = 'auto'
}
