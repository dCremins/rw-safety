function onDocumentMouseMove(event) {
	event.preventDefault()
	const rect = renderer.domElement.getBoundingClientRect()
	const canv = renderer.domElement
	// Subtract the extra space on the left and top and dicide by width and height
	mouse.x = (((event.clientX - rect.left) / canv.clientWidth) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / canv.clientHeight) * 2) + 1
/*
	raycaster.setFromCamera(mouse, camera)
	if (selected) {
		if (raycaster.intersectObjects(objects)) {
			//selected.position.set(0, 1, 0)
			//console.log('x: ', selected.position.x)
			//console.log('Mouse x: ', mouse.x)
			//console.log('move x: ', raycaster.intersectObjects(objects)[0].point.x)
			console.log(intersection.sub( offset ))
			selected.position.set(raycaster.intersectObjects(objects)[0].point.x, selected.position.y, raycaster.intersectObjects(objects)[0].point.z-3)
			render()
		}
		raycaster.setFromCamera(mouse, camera)
		const intersects = raycaster.intersectObjects(flaggers)
		if (intersects.length > 0) {
			const object = intersects[0].object
			if (hovered !== object) {
				renderer.domElement.style.cursor = 'pointer'
				hovered = object
			}
		} else if (hovered !== null) {
			renderer.domElement.style.cursor = 'auto'
			hovered = null
		}
		*/
		raycaster.setFromCamera( mouse, camera )
    const dragging = raycaster.intersectObjects( flaggers )
		const ground = raycaster.intersectObject( objectPlane )
		//console.log(ground[0].point.x)

		if (dragged) {
			if ( ground.length > 0 ) {
				//let stableY = dragged.position.y
				//dragged.position.copy( intersection.sub( offset ) )
				dragged.position.set(ground[0].point.x, dragged.position.y, ground[0].point.z)
				render()
			}
		}

    if ( dragging.length > 0 ) {
        if ( selected !== dragging[0].object ) {
            selected = dragging[0].object
          //  plane.setFromNormalAndCoplanarPoint(
          //      camera.getWorldDirection( plane.normal ),
          //      selected.position )
        }
        renderer.domElement.style.cursor = 'pointer';
    } else {
        selected = null;
        renderer.domElement.style.cursor = 'auto';
    }
}

function onDocumentTouchMove(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)
	if (selected) {
		if (raycaster.intersectObjects(objects)) {
			selected.position.set(0, 1, 0)
			selected.position.set(raycaster.intersectObjects(objects)[0].point.x, selected.position.y, raycaster.intersectObjects(objects)[0].point.z)
			render()
		}
	}
}
