function test(group, color) {
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		color,		// 0
		white,		// 1
		shadows		// 2
	]
	const cone = coneGeometry.clone(true)
	const stripe = stripeGeometry.clone(true)
	const coneGroup = new THREE.Geometry()
	const stripeGroup = new THREE.Geometry()
	let initialX

	// Remove old render if it exists
	if (scene.getObjectByName(group+'-cones')) {
		scene.remove(scene.getObjectByName(group+'-cones'))
		//scene.getObjectByName(group+'-cones').geometry.dispose()
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}

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
	cone.translate(initialX, 0.75, 0.5)
	coneGroup.merge(cone)
	stripe.translate(initialX, 0.75, 0.5)
	stripeGroup.merge(stripe)

	let x = initialX
	let cones = 1 + (buffer / 100)
	let spacing = (buffer / 50) / cones

	while (Math.abs(x - spacing) <= (Math.abs((buffer / 50)) - initialX) && Math.abs(x) <= 23) {
		cone.translate(-spacing, 0, 0)
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, 0)
		stripeGroup.merge(stripe)
		x -= spacing
	}

/* Transition Taper */

	const upstream = Number(document.getElementById('upstream-' + group).value)
	cones = 2 + (upstream / 100)
	spacing = (upstream / 50) / cones
	let y = (3 / cones) + 0.5
	for (let i = 1; i <= cones; i++) {
		cone.translate(-spacing, 0, (3 / cones))
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, (3 / cones))
		stripeGroup.merge(stripe)
		x -= spacing
		y += 3 / cones
	}

/* Sign Spacing */
	signSpace(color, group, x)

/* Downstream Taper */

	switch (group) {
		case 1:
			initialX = 9
			break
		case 2:
			initialX = 9.5
			break
		case 3:
			initialX = 10
			break
		case 4:
			initialX = 10.5
			break
		case 5:
			initialX = 11
			break
		case 6:
			initialX = 11.5
			break
		default:
			break
	}
	const downstream = Number(document.getElementById('downstream-' + group).value)
	cone.translate(Math.abs(x)+initialX, 0, -Math.abs(y)+.5)
	stripe.translate(Math.abs(x)+initialX, 0, -Math.abs(y)+.5)
	x = initialX
	cones = 2 + (downstream / 100)
	spacing = (downstream / 50) / cones
	y = 0.5
	while (Math.abs(x) <= ((downstream / 50) + initialX) && Math.abs(x) <= 21.5) {
		cone.translate(spacing, 0, (3 / cones))
		coneGroup.merge(cone)
		stripe.translate(spacing, 0, (3 / cones))
		stripeGroup.merge(stripe)
		y += 3 / cones
		x += spacing
	}

/* Give Group A Name and Add To Scene */

	for (var j = 0; j < coneGroup.faces.length; j++) {
		coneGroup.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(coneGroup))

	for (var j = 0; j < stripeGroup.faces.length; j++) {
		stripeGroup.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(stripeGroup))

	shadow.merge(coneGroup)

	for (var j = 0; j < shadow.faces.length; j++) {
		shadow.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(shadow))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = (group+'-cones')
	scene.add(combinedMesh)

/* Close Sidebar */
	slide('group-' + group)
	flagger(color)
	animate()
}
