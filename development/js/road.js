function initRoad() {
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		green,				// 0
		palegray,			// 1
		yellow,				// 2
		white,				// 3
		gray,					// 4
		truckMaterial	// 5
	]

	const greenery = new THREE.Geometry()
	const topGeometry = new THREE.BoxGeometry(155, 1, 38)
	topGeometry.translate(0, 0, -45.5)
	greenery.merge(topGeometry)
	const bottomGeometry = new THREE.BoxGeometry(155, 1, 50)
	bottomGeometry.translate(0, 0, 11.5)
	greenery.merge(bottomGeometry)

	shadow.merge(greenery)

	for (var j = 0; j < greenery.faces.length; j++) {
		greenery.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(greenery))

	const roadGeometry = new THREE.BoxGeometry(155, 1, 13)
	roadGeometry.translate(0, 0, -20)

	for (var j = 0; j < roadGeometry.faces.length; j++) {
		roadGeometry.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(roadGeometry))

	let lineGeometry = new THREE.Geometry()
	const line = new THREE.BoxGeometry(155, .01, .1)
	line.translate(0, .5, -26)
	lineGeometry.merge(line)
	line.translate(0, 0, 12)
	lineGeometry.merge(line)

	for (var j = 0; j < lineGeometry.faces.length; j++) {
		lineGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(lineGeometry))

	const dividerGeometry = new THREE.Geometry()
	const dividerLine = new THREE.BoxGeometry(1, 0.1, 0.2)
	dividerLine.translate(-75, 0.5, -20)
	dividerGeometry.merge(dividerLine)
	for (let i = 75; i >= -73; i -= 2) {
		dividerLine.translate(2, 0, 0)
		dividerGeometry.merge(dividerLine)
	}

	for (var j = 0; j < dividerGeometry.faces.length; j++) {
		dividerGeometry.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(dividerGeometry))

	const shadowGeometry = new THREE.BoxGeometry(155, 1, 101)
	const floorShadows = new THREE.Mesh(shadowGeometry, shadows)
	floorShadows.position.set(0, 0.0003, -13.8)
	floorShadows.receiveShadow = true
	scene.add(floorShadows)
	objectPlane = floorShadows

	const cone = new THREE.Geometry()
	const stripe = new THREE.Geometry()
	const coneCore = coneGeometry.clone(true)
	const stripeCore = stripeGeometry.clone(true)
	coneCore.translate(0, 0.75, -19)
	cone.merge(coneCore)
	stripeCore.translate(0, 0.75, -19)
	stripe.merge(stripeCore)
	for (var i = 1.5; i <= 10; i += 2) {
		coneCore.translate(2, 0, 0)
		cone.merge(coneCore)
		stripeCore.translate(2, 0, 0)
		stripe.merge(stripeCore)
	}

	for (var j = 0; j < cone.faces.length; j++) {
		cone.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(cone))

	for (var j = 0; j < stripe.faces.length; j++) {
		stripe.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(stripe))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	scene.add(combinedMesh)

	shadow = new THREE.BufferGeometry().fromGeometry(shadow)
	let combinedShadow = new THREE.Mesh(shadow, shadows)
	combinedShadow.receiveShadow = true
	scene.add(combinedShadow)

}
