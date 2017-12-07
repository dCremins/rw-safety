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
			initialX = -1
			break
		case 2:
			initialX = -1.5
			break
		case 3:
			initialX = -2
			break
		case 4:
			initialX = -2.5
			break
		case 5:
			initialX = -3
			break
		case 6:
			initialX = -3.5
			break
		default:
			break
	}
	const buffer = Number(document.getElementById('buffer-' + group).value) / 50
	cone.translate(initialX, 0.75, -19)
	coneGroup.merge(cone)
	stripe.translate(initialX, 0.75, -19)
	stripeGroup.merge(stripe)

	let x = initialX
	for (let i = initialX; i >= (initialX - buffer); i-=2) {
		cone.translate(-2, 0, 0)
		coneGroup.merge(cone)
		stripe.translate(-2, 0, 0)
		stripeGroup.merge(stripe)
		x-=2
	}

/* Transition Taper */

	const upstream = Number(document.getElementById('upstream-' + group).value) / 50
	const height = 4.5
	let cones = Math.pow(upstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	let spacing = upstream / cones
	let angle = height / cones
	let y = 0

	cone.translate(-2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(-2, 0, 0)
	stripeGroup.merge(stripe)
	x-=2
	let end = x - upstream

	for (let a = x; a > (end); a-=spacing) {
		cone.translate(-spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, angle)
		stripeGroup.merge(stripe)
		y+=angle
		x-=spacing
	}

/* Sign Spacing */
	signSpace(color, group)

/* Downstream */

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
		cone.translate(Math.abs(x)+initialX, 0, -y)
		coneGroup.merge(cone)
		stripe.translate(Math.abs(x)+initialX, 0, -y)
		stripeGroup.merge(stripe)

		x = initialX

/* Downstream Buffer */

	const downBuff = Number(document.getElementById('downbuff-' + group).value) / 50

	if (downBuff && downBuff > 0) {
		for (let i = initialX; i <= (initialX + downBuff); i+=2) {
			cone.translate(2, 0, 0)
			coneGroup.merge(cone)
			stripe.translate(2, 0, 0)
			stripeGroup.merge(stripe)
			x+=2
		}
	}

/* Downstream Taper */

	const downstream = Number(document.getElementById('downstream-' + group).value) / 50

	cone.translate(2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(2, 0, 0)
	stripeGroup.merge(stripe)
	x+=2
	cones = Math.pow(downstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	spacing = downstream / cones
	angle = height / cones
	y = 0
	end = x + downstream

	for (let a = x; a < (end); a+=spacing) {
		cone.translate(spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(spacing, 0, angle)
		stripeGroup.merge(stripe)
		y+=angle
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
