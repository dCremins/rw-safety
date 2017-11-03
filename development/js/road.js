function initRoad() {
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		green,			// 0
		palegray,		// 1
		yellow,			// 2
		white,			// 3
		gray				// 4
	]

	const greenery = new THREE.Geometry()
	const topGeometry = new THREE.BoxGeometry(45, 1, 10)
	topGeometry.translate(0, 0, -9)
	greenery.merge(topGeometry)
	const bottomGeometry = new THREE.BoxGeometry(45, 1, 7)
	bottomGeometry.translate(0, 0, 7.5)
	greenery.merge(bottomGeometry)
	// Trees
	const tallCone = new THREE.ConeGeometry(1.68, 4, 32)
	tallCone.translate(-18, 4.35, -10.5)
	greenery.merge(tallCone)
	tallCone.translate(7, 0, 18.5)
	greenery.merge(tallCone)
	const tallSphere = new THREE.SphereGeometry(1.8, 60, 60)
	tallSphere.translate(-18, 1.7, -10.5)
	greenery.merge(tallSphere)
	tallSphere.translate(7, 0, 18.5)
	greenery.merge(tallSphere)
	const smallCone = tallCone.clone()
	smallCone.scale(0.5, 0.5, 0.5)
	smallCone.translate(0, 0.2, -12)
	greenery.merge(smallCone)
	smallCone.translate(17.5, 0, 14)
	greenery.merge(smallCone)
	smallCone.translate(4.5, 0, -16.5)
	greenery.merge(smallCone)
	const smallSphere = tallSphere.clone()
	smallSphere.scale(0.5, 0.5, 0.5)
	smallSphere.translate(0, 0.2, -12)
	greenery.merge(smallSphere)
	smallSphere.translate(17.5, 0, 14)
	greenery.merge(smallSphere)
	smallSphere.translate(4.5, 0, -16.5)
	greenery.merge(smallSphere)

	shadow.merge(greenery)

	for (var j = 0; j < greenery.faces.length; j++) {
		greenery.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(greenery))

	const roadGeometry = new THREE.BoxGeometry(45, 1, 8)

	for (var j = 0; j < roadGeometry.faces.length; j++) {
		roadGeometry.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(roadGeometry))

	let lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, -3.7),
		new THREE.Vector3(22.5, 0.51, -3.7)
	)

	for (var j = 0; j < lineGeometry.faces.length; j++) {
		lineGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(lineGeometry))

	lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, 3.7),
		new THREE.Vector3(22.5, 0.51, 3.7)
	)

	for (var j = 0; j < lineGeometry.faces.length; j++) {
		lineGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(lineGeometry))

	//const bottomGeometry = new THREE.BoxGeometry(45, 1, 7)
	//bottomGeometry.translate(0, 0, 7.5)

	//for (var j = 0; j < bottomGeometry.faces.length; j++) {
	//	bottomGeometry.faces[j].materialIndex = 0;
	//}
	//meshes.mergeMesh(new THREE.Mesh(bottomGeometry))

	const dividerGeometry = new THREE.Geometry()
	const dividerLine = new THREE.BoxGeometry(1, 0.1, 0.2)
	dividerLine.translate(-22, 0.5, 0)
	dividerGeometry.merge(dividerLine)
	for (let i = 22; i >= -21; i -= 2) {
		dividerLine.translate(2, 0, 0)
		dividerGeometry.merge(dividerLine)
	}

	for (var j = 0; j < dividerGeometry.faces.length; j++) {
		dividerGeometry.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(dividerGeometry))

	const shadowGeometry = new THREE.BoxGeometry(45, 1, 25)
	const floorShadows = new THREE.Mesh(shadowGeometry, shadows)
	floorShadows.position.set(0, 0.05, -1.5)
	floorShadows.receiveShadow = true
	scene.add(floorShadows)
	objects.push(floorShadows)

	const cone = new THREE.Geometry()
	const stripe = new THREE.Geometry()
	const coneCore = coneGeometry.clone(true)
	const stripeCore = stripeGeometry.clone(true)
	coneCore.translate(0, 0.75, 0.5)
	cone.merge(coneCore)
	stripeCore.translate(0, 0.75, 0.5)
	stripe.merge(stripeCore)
	for (var i = 1.5; i <= 10; i += 1.5) {
		coneCore.translate(1.5, 0, 0)
		cone.merge(coneCore)
		stripeCore.translate(1.5, 0, 0)
		stripe.merge(stripeCore)
	}

	for (var j = 0; j < cone.faces.length; j++) {
		cone.faces[j].materialIndex = 4;
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
