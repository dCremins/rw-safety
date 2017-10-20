function initRoad() {
	const topGeometry = new THREE.BoxGeometry(45, 1, 10)
	const grassTop = new THREE.Mesh(topGeometry, grass)
	grassTop.position.set(0, 0, -9)
	scene.add(grassTop)

	const roadGeometry = new THREE.BoxGeometry(45, 1, 8)
	const roadMesh = new THREE.Mesh(roadGeometry, road)
	roadMesh.position.set(0, 0, 0)
	scene.add(roadMesh)

	let lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, -3.7),
		new THREE.Vector3(22.5, 0.51, -3.7)
	)
	const topLine = new THREE.Line(lineGeometry, lines)
	scene.add(topLine)

	lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, 3.7),
		new THREE.Vector3(22.5, 0.51, 3.7)
	)
	const bottomLine = new THREE.Line(lineGeometry, lines)
	scene.add(bottomLine)

	const bottomGeometry = new THREE.BoxGeometry(45, 1, 7)
	const grassBottom = new THREE.Mesh(bottomGeometry, grass)
	grassBottom.position.set(0, 0, 7.5)
	scene.add(grassBottom)

	const dividerGeometry = new THREE.BoxGeometry(1, 0.1, 0.2)
	const yellowLines = new THREE.Mesh(dividerGeometry, divider)
	yellowLines.position.set(0, 0.5, 0)
	scene.add(yellowLines)
	for (let i = 22; i >= 23; i -= 2) {
		const newyellowLines = yellowLines.clone()
		newyellowLines.position.set(i, 0.5, 0)
		scene.add(newyellowLines)
	}
	const shadowGeometry = new THREE.BoxGeometry(45, 1, 25)
	const floorShadows = new THREE.Mesh(shadowGeometry, shadows)
	floorShadows.position.set(0, 0.05, -1.5)
	floorShadows.receiveShadow = true
	scene.add(floorShadows)
	objects.push(floorShadows)

	const coneCore = new THREE.Mesh(coneGeometry, gray)
	coneCore.castShadow = true
	const cone = new THREE.Group()
	cone.add(coneCore)
	cone.add(stripe)
	cone.position.set(0, 0.75, 0.5)
	scene.add(cone)
	for (let i = 1.5; i < 10; i += 1.5) {
		const newCone = cone.clone()
		newCone.position.set(i, 0.75, 0.5)
		scene.add(newCone)
	}
}
