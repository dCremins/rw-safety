// const canv = renderer.domElement
// const rect = canv.getBoundingClientRect()
let yHolder
let currentHex = []
let movingOn = false

function onDocumentMouseDown(event) {
	event.preventDefault()

	if (hovered) {
		controls.enabled = false

		if (!movingOn) {
			container.removeEventListener('mousemove', onDocumentMouseMove, false)
			movingOn = true
			yHolder = hovered.position.y

			hovered.material.forEach((material)=>{
				currentHex.push(material)
			})
			glow.color.setHex(hovered.material[0].color.getHex())
			hovered.material = glow

			hovered.position.set(hovered.position.x, hovered.position.y+1, hovered.position.z)
		} else {
			mouse.x = (((event.clientX - rect.left) / canv.clientWidth) * 2) - 1
			mouse.y = -(((event.clientY - rect.top) / canv.clientHeight) * 2) + 1
			raycaster.setFromCamera( mouse, camera )
			const ground = raycaster.intersectObject( objectPlane )

			if ( ground.length > 0 ) {
				hovered.position.set(ground[0].point.x, yHolder, ground[0].point.z)

				hovered.material = []
				currentHex.forEach((material)=>{
					hovered.material.push(material)
				})
				currentHex = []
			}

			movingOn = false
			container.addEventListener('mousemove', onDocumentMouseMove, false)
			container.addEventListener('touchmove', onDocumentTouchMove, false)
		}
		render()
  }


}

function onDocumentTouchStart(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	// Subtract the extra space on the left and top and dicide by width and height
	mouse.x = (((event.clientX - rect.left) / canv.clientWidth) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / canv.clientHeight) * 2) + 1

	raycaster.setFromCamera(mouse, camera)
  const people = raycaster.intersectObjects( flaggers )
	const ground = raycaster.intersectObject( objectPlane )

	if ( people.length > 0 ) {
    controls.enabled = false
		if ( hovered !== people[0].object ) {
        hovered = people[0].object
    }
	}

	if (hovered) {
		if (!movingOn) {
			movingOn = true
			yHolder = hovered.position.y

			hovered.material.forEach((material)=>{
				currentHex.push(material)
			})
			glow.color.setHex(hovered.material[0].color.getHex())
			hovered.material = glow

			hovered.position.set(hovered.position.x, hovered.position.y+1, hovered.position.z)
		} else {
			if ( ground.length > 0 ) {
				hovered.position.set(ground[0].point.x, yHolder, ground[0].point.z)

				hovered.material = []
				currentHex.forEach((material)=>{
					hovered.material.push(material)
				})
				currentHex = []
			}

			movingOn = false
			container.addEventListener('touchmove', onDocumentTouchMove, false)
		}
		render()
	}
}
