function onDocumentMouseDown(event) {
	event.preventDefault()
	/*
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		selected = intersects[0].object
		plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ), selected.position )
		if (raycaster.intersectObjects(objects)) {
			controls.enabled = false
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
          offset.copy( intersection ).sub( selected.position );
      }
		}
		renderer.domElement.style.cursor = 'move'
	}
	*/
	if (selected) {
      controls.enabled = false
      dragged = selected
			//if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
      //    offset.copy( intersection ).sub( dragged.position )
			//		console.log(dragged.position)
    //  }
      renderer.domElement.style.cursor = 'move';
  }
render()
}

function onDocumentTouchStart(event) {
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
			controls.enabled = false
			offset.copy(intersection).sub(selected.position)
		}
		renderer.domElement.style.cursor = 'move'
	}
	render()
}
