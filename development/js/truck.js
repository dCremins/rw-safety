function initTruck() {
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		offwhite,			// 0
		windowColor,	// 1
		gray,					// 2
		palegray,			// 3
		red,					// 4
		orange,				// 5
		shadows				// 6
	]
	// Base
	const core = new THREE.Geometry()
	const nose = new THREE.BoxGeometry(1, 0.8, 1.3)
	nose.translate(-0.6, 0, 0)
	core.merge(nose)
	const cabin = new THREE.BoxGeometry(0.1, 0.8, 1.3)
	cabin.translate(0.52, 0.25, 0)
	core.merge(cabin)
	const cabinSide = new THREE.BoxGeometry(0.1, 0.7, 0.3)
	cabinSide.translate(0.52, 0.85, 0.5)
	core.merge(cabinSide)
	cabinSide.translate(0, 0, -1)
	core.merge(cabinSide)
	const roof = new THREE.BoxGeometry(0.8, 0.1, 1.3)
	roof.translate(0.17, 1.15, 0)
	roof.vertices[6].x -= 0.05
	roof.vertices[7].x -= 0.05
	core.merge(roof)
	const shieldRight = new THREE.BoxGeometry(0.1, 1, 0.1)
	shieldRight.translate(-0.6, 0.52, -0.6)
	shieldRight.rotateZ(-0.4)
	core.merge(shieldRight)
	shieldRight.translate(0, 0, 1.2)
	core.merge(shieldRight)

	const windshield = new THREE.BoxGeometry(1, 0.8, 1.29)
	// X
	windshield.vertices[4].x += 0.26
	windshield.vertices[5].x += 0.26
	windshield.vertices[6].x -= 0.035
	windshield.vertices[7].x -= 0.035
	// Y
	windshield.vertices[0].y += 2.2
	windshield.vertices[1].y += 2.2
	windshield.vertices[2].y += 2.3
	windshield.vertices[3].y += 2.3
	windshield.vertices[4].y += 2.2
	windshield.vertices[5].y += 2.2
	windshield.vertices[6].y += 2.3
	windshield.vertices[7].y += 2.3

	shadow.merge(windshield)
	for (var j = 0; j < windshield.faces.length; j++) {
		windshield.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(windshield))

	const bed = new THREE.BoxGeometry(3.2, 0.3, 1.3)
	bed.translate(0.9, -0.31, 0)
	core.merge(bed)
	const bedSide = new THREE.BoxGeometry(2.68, 0.6, 0.1)
	bedSide.translate(1.15, 0.1, 0.6)
	core.merge(bedSide)
	bedSide.translate(0, 0, -1.2)
	core.merge(bedSide)
	const bedBack = new THREE.BoxGeometry(0.1, 0.6, 1.3)
	bedBack.translate(2.45, 0.1, 0)
	core.merge(bedBack)
	core.translate(0, 1.5, 0)
	const hubGeometry = new THREE.TorusGeometry(0.25, 0.1, 3, 199)
	hubGeometry.translate(-0.3, 1.09, 0.63)
	core.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	core.merge(hubGeometry)
	hubGeometry.translate(2, 0, 1.3)
	core.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	core.merge(hubGeometry)

	shadow.merge(core)
	for (var j = 0; j < core.faces.length; j++) {
		core.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(core))
	// Inside
	const seat = new THREE.Geometry()
	const seatButt = new THREE.BoxGeometry(0.4, 0.1, 0.4)
	seatButt.translate(0.25, 1.6, 0.3)
	seat.merge(seatButt)
	seatButt.translate(0, 0, -0.6)
	seat.merge(seatButt)
	const seatBack = new THREE.BoxGeometry(0.1, 0.7, 0.4)
	seatBack.translate(0.45, 1.8, 0.3)
	seat.merge(seatBack)
	seatBack.translate(0, 0, -0.6)
	seat.merge(seatBack)
	const steering = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32)
	steering.translate(-1.9, 0.65, 0.3)
	steering.rotateZ(-1.2)
	seat.merge(steering)
	const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32)
	wheelGeometry.translate(-0.3, 0.55, -1.1)
	wheelGeometry.rotateX(1.6)
	seat.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	seat.merge(wheelGeometry)
	wheelGeometry.translate(2, 0, 1.2)
	seat.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	seat.merge(wheelGeometry)
	const grill = new THREE.BoxGeometry(0.01, 0.7, 1.2)
	grill.translate(-1.1, 1.5, 0)
	seat.merge(grill)
	const license = new THREE.BoxGeometry(0.05, 0.2, 0.5)
	license.translate(2.5, 1.25, 0)
	seat.merge(license)

	shadow.merge(seat)
	for (var j = 0; j < seat.faces.length; j++) {
		seat.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(seat))
	// Bumper

	const bumperGeometry = new THREE.Geometry()
	const frontBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	frontBumper.translate(-0.95, 1.05, 0)
	frontBumper.vertices[2].x += 0.01
	frontBumper.vertices[3].x += 0.01
	bumperGeometry.merge(frontBumper)
	const middleBumper = new THREE.BoxGeometry(1.1, 0.1, 1.4)
	middleBumper.translate(0.7, 1.05, 0)
	middleBumper.vertices[2].x += 0.01
	middleBumper.vertices[3].x += 0.01
	middleBumper.vertices[6].x -= 0.01
	middleBumper.vertices[7].x -= 0.01
	bumperGeometry.merge(middleBumper)
	const backBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	backBumper.translate(2.35, 1.05, 0)
	backBumper.vertices[6].x -= 0.01
	backBumper.vertices[7].x -= 0.01
	bumperGeometry.merge(backBumper)

	shadow.merge(bumperGeometry)
	for (var j = 0; j < bumperGeometry.faces.length; j++) {
		bumperGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(bumperGeometry))

	// Back
	const brakeLights = new THREE.Geometry()
	const leftLight = new THREE.BoxGeometry(0.1, 0.1, 0.1)
	leftLight.translate(2.5, 1.25, 0.45)
	brakeLights.merge(leftLight)
	leftLight.translate(0, 0, -0.9)
	brakeLights.merge(leftLight)

	shadow.merge(brakeLights)
	for (var j = 0; j < brakeLights.faces.length; j++) {
		brakeLights.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(brakeLights))

	// Lights
	const lightGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.5)
	lightGeometry.translate(0.2, 2.72, 0)

	shadow.merge(lightGeometry)
	for (var j = 0; j < lightGeometry.faces.length; j++) {
		lightGeometry.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(lightGeometry))
	
	for (var j = 0; j < shadow.faces.length; j++) {
		shadow.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(shadow))

	meshes.translate(-4, 0, 7.5)
	meshes.rotateY(0.5)
	meshes.scale(0.9, 0.9, 0.9)

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	scene.add(combinedMesh)
}
