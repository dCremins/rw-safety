function onDocumentMouseDown(event) {
	controls.enabled = false
	event.preventDefault()
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		selected = intersects[0].object
		if (raycaster.intersectObjects(objects)) {
			offset.copy(intersection).sub(selected.position)
		}
		renderer.domElement.style.cursor = 'move'
	}
}

function onDocumentTouchStart(event) {
	controls.enabled = false
	event.preventDefault()
	event = event.changedTouches[0]
	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		selected = intersects[0].object
		if (raycaster.intersectObjects(objects)) {
			offset.copy(intersection).sub(selected.position)
		}
		renderer.domElement.style.cursor = 'move'
	}
}
