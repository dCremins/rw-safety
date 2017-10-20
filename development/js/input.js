function test(group, color) {
	// Remove old render if it exists
	if (scene.getObjectByName(group)) {
		scene.remove(scene.getObjectByName(group))
	}

	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}
	const coneCore = new THREE.Mesh(coneGeometry, color)
	const shadowCone = new THREE.Mesh(coneGeometry, shadows)
	shadowCone.scale.set(1.05, 1.05, 1.05)
	coneCore.castShadow = true
	const cone = new THREE.Group()
	const newStripe = stripe.clone()
	cone.add(coneCore)
	cone.add(newStripe)
	let initialX
	const coneGroup = new THREE.Group()
	const shadowGroup = new THREE.Group()

/* Buffer */

	switch (group) {
		case 1:
			initialX = 0
			break
		case 2:
			initialX = -0.5
			break
		case 3:
			initialX = -1.5
			break
		case 4:
			initialX = -2
			break
		case 5:
			initialX = -2.5
			break
		case 6:
			initialX = -3
			break
		default:
			break
	}
	const buffer = Number(document.getElementById('buffer-' + group).value)
	cone.position.set(initialX, 0.75, 0.5)
	coneGroup.add(cone)
	shadowCone.position.set(initialX, 0.75, 0.5)
	shadowGroup.add(shadowCone)
	let x = initialX
	let cones = 1 + (buffer / 100)
	let spacing = (buffer / 50) / cones

	while (Math.abs(x - spacing) <= (Math.abs((buffer / 50)) - initialX) && Math.abs(x) <= 23) {
		const newCone = cone.clone()
		const newShadowCone = shadowCone.clone()
		newShadowCone.position.set(x, 0.75, 0.5)
		shadowGroup.add(newShadowCone)
		x -= spacing
		newCone.position.set(x, 0.75, 0.5)
		coneGroup.add(newCone)
	}

/* Transition Taper */

	const upstream = Number(document.getElementById('upstream-' + group).value)
	cones = 2 + (upstream / 100)
	spacing = (upstream / 50) / cones
	let y = (3 / cones) + 0.5
	for (let i = 1; i <= cones; i++) {
		const newCone = cone.clone()
		x -= spacing
		newCone.position.set(x, 0.75, y)
		const newShadowCone = shadowCone.clone()
		newShadowCone.position.set(x, 0.75, y)
		shadowGroup.add(newShadowCone)
		y += 3 / cones
		coneGroup.add(newCone)
	}

/* Sign Spacing */
	signSpace(color, group, x)

/* Downstream Taper */

	switch (group) {
		case 1:
			initialX = 10
			break
		case 2:
			initialX = 10.5
			break
		case 3:
			initialX = 11
			break
		case 4:
			initialX = 11.5
			break
		case 5:
			initialX = 12
			break
		case 6:
			initialX = 12.5
			break
		default:
			break
	}
	const downstream = Number(document.getElementById('downstream-' + group).value)
	x = initialX
	cones = 2 + (downstream / 100)
	spacing = (downstream / 50) / cones
	y = 0.5
	while (Math.abs(x) <= ((downstream / 50) + initialX) && Math.abs(x) <= 21.5) {
		const newCone = cone.clone()
		newCone.position.set(x, 0.75, y)
		const newShadowCone = shadowCone.clone()
		newShadowCone.position.set(x, 0.75, y)
		shadowGroup.add(newShadowCone)
		y += 3 / cones
		x += spacing
		coneGroup.add(newCone)
	}

/* Give Group A Name and Add To Scene */
	coneGroup.name = group
	shadowGroup.name = group
	scene.add(coneGroup)
	scene.add(shadowGroup)

/* Close Sidebar */
	slide('group-' + group)
	flagger(color)
}
