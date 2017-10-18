function onDocumentMouseMove( event ) {
	event.preventDefault()
	var rect = renderer.domElement.getBoundingClientRect()
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
	raycaster.setFromCamera( mouse, camera )
	if ( selected ) {
			if ( raycaster.intersectObjects( objects ) ) {
				selected.position.set(0, 1, 0)
				selected.position.set( raycaster.intersectObjects( objects )[0].point.x, selected.position.y, raycaster.intersectObjects( objects )[0].point.z );
			}
		}
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( flaggers );
		if ( intersects.length > 0 ) {
			var object = intersects[ 0 ].object;
			if ( hovered !== object ) {
				renderer.domElement.style.cursor = 'pointer';
				hovered = object;
			}
		} else {
			if ( hovered !== null ) {
				renderer.domElement.style.cursor = 'auto';
				hovered = null;
			}
		}
}

function onDocumentTouchMove( event ) {
	event.preventDefault()
  event = event.changedTouches[ 0 ]
	var rect = renderer.domElement.getBoundingClientRect()
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
	raycaster.setFromCamera( mouse, camera )
	if ( selected ) {
		if ( raycaster.intersectObjects( objects ) ) {
			selected.position.set(0, 1, 0)
			selected.position.set( raycaster.intersectObjects( objects )[0].point.x, selected.position.y, raycaster.intersectObjects( objects )[0].point.z );
		}
	}
}
