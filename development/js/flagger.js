function flagger(color) {
	const body = new THREE.Geometry()
	// Torso
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.translate(0, 0.1, 0)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	body.merge(torso)

	// Legs
	const leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.translate(-0.25, -1, 0)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	body.merge(leftLeg)
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.translate(0.25, -1, 0)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	body.merge(rightLeg)

	// Arms
	const rightArm1 = new THREE.BoxGeometry(0.5, 0.4, 0.5)
	rightArm1.translate(0.64, 0.6, 0)
	rightArm1.vertices[0].y -= 0.1
	rightArm1.vertices[0].z += 0.1
	rightArm1.vertices[0].x -= 0.2
	rightArm1.vertices[1].y -= 0.08
	rightArm1.vertices[1].z += 0.3
	rightArm1.vertices[1].x -= 0.1
	rightArm1.vertices[2].z += 0.1
	rightArm1.vertices[2].x -= 0.05
	rightArm1.vertices[2].y += 0.1
	rightArm1.vertices[3].y += 0.2
	rightArm1.vertices[3].z += 0.4
	rightArm1.vertices[3].x += 0.2
	rightArm1.vertices[4].x -= 0.04
	rightArm1.vertices[5].x -= 0.04
	body.merge(rightArm1)
	const rightArm2 = new THREE.BoxGeometry(0.5, 0.3, 0.3)
	rightArm2.translate(1.14, 0.6, 0.3)
	rightArm2.vertices[0].y += 0.25
	rightArm2.vertices[0].z -= 0.1
	rightArm2.vertices[0].x -= 0.65
	rightArm2.vertices[1].y += 0.25
	rightArm2.vertices[1].z += 0.05
	rightArm2.vertices[1].x -= 0.5
	rightArm2.vertices[2].y += 0.55
	rightArm2.vertices[2].z -= 0.05
	rightArm2.vertices[2].x -= 0.55
	rightArm2.vertices[3].y += 0.55
	rightArm2.vertices[3].z += 0.1
	rightArm2.vertices[3].x -= 0.4
	rightArm2.vertices[4].x -= 0.1
	rightArm2.vertices[4].z -= 0.1
	rightArm2.vertices[4].y -= 0.03
	rightArm2.vertices[5].y -= 0.05
	rightArm2.vertices[5].z -= 0.1
	rightArm2.vertices[5].x -= 0.2
	rightArm2.vertices[6].x += 0.2
	rightArm2.vertices[6].y += 0.15
	rightArm2.vertices[6].z += 0.0
	rightArm2.vertices[7].x -= 0.05
	rightArm2.vertices[7].z -= 0.1
	rightArm2.vertices[7].y += 0.05
	body.merge(rightArm2)
	const leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[5].y -= 0.8
	leftArm.vertices[5].z -= 0.1
	leftArm.vertices[4].y -= 0.8
	leftArm.vertices[4].z += 0.1
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[7].z -= 0.1
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[6].z += 0.1
	leftArm.vertices[3].x -= 0.04
	leftArm.vertices[2].x -= 0.04
	body.merge(leftArm)

	// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	body.merge(head)

	// Flag
	const object = new THREE.Geometry()
	object.vertices.push(new THREE.Vector3(0, 0.15, 0))
	for (let i = 0; i <= 7; i++) {
		const angle = (i * 2 * Math.PI / 8)
		object.vertices.push(new THREE.Vector3(0.6 * Math.sin(angle), 0.15, 0.6 * Math.cos(angle)))
	}
	object.vertices.push(new THREE.Vector3(0, 0, 0))
	for (let i = 7; i >= 0; i--) {
		const angle = (i * 2 * Math.PI / 8)
		object.vertices.push(new THREE.Vector3(0.6 * Math.sin(angle), 0, 0.6 * Math.cos(angle)))
	}
	object.faces.push(new THREE.Face3(0, 1, 2))
	object.faces.push(new THREE.Face3(0, 2, 3))
	object.faces.push(new THREE.Face3(0, 3, 4))
	object.faces.push(new THREE.Face3(0, 4, 5))
	object.faces.push(new THREE.Face3(0, 5, 6))
	object.faces.push(new THREE.Face3(0, 6, 7))
	object.faces.push(new THREE.Face3(0, 7, 8))
	object.faces.push(new THREE.Face3(0, 8, 1))
	object.faces.push(new THREE.Face3(9, 10, 11))
	object.faces.push(new THREE.Face3(9, 11, 12))
	object.faces.push(new THREE.Face3(9, 12, 13))
	object.faces.push(new THREE.Face3(9, 13, 14))
	object.faces.push(new THREE.Face3(9, 14, 15))
	object.faces.push(new THREE.Face3(9, 15, 16))
	object.faces.push(new THREE.Face3(9, 16, 17))
	object.faces.push(new THREE.Face3(9, 17, 10))
	object.faces.push(new THREE.Face3(5, 4, 14))
	object.faces.push(new THREE.Face3(14, 13, 5))
	object.faces.push(new THREE.Face3(4, 3, 15))
	object.faces.push(new THREE.Face3(15, 14, 4))
	object.faces.push(new THREE.Face3(3, 2, 16))
	object.faces.push(new THREE.Face3(16, 15, 3))
	object.faces.push(new THREE.Face3(2, 1, 17))
	object.faces.push(new THREE.Face3(17, 16, 2))
	object.faces.push(new THREE.Face3(1, 8, 10))
	object.faces.push(new THREE.Face3(10, 17, 1))
	object.faces.push(new THREE.Face3(8, 7, 11))
	object.faces.push(new THREE.Face3(11, 10, 8))
	object.faces.push(new THREE.Face3(7, 6, 12))
	object.faces.push(new THREE.Face3(12, 11, 7))
	object.faces.push(new THREE.Face3(6, 5, 13))
	object.faces.push(new THREE.Face3(13, 12, 6))
	object.computeFaceNormals()
	const sign = new THREE.Mesh(object, safetyOrange)
	sign.position.set(-0.68, 0.9, 0.02)
	sign.rotation.x += 0.4
	sign.rotation.y += 0.6
	sign.rotation.z += 1.35
	sign.geometry.scale(0.5, 0.5, 0.5)
	scene.add(sign)

	const stickG = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 32)
	const stick = new THREE.Mesh(stickG, gray)
	stick.position.set(-0.7, 0.05, 0.02)
	stick.geometry.scale(0.5, 0.5, 0.5)
	scene.add(stick)

	const person = new THREE.Mesh(body, color)
	person.position.set(0, 1.2, -1)
	person.rotation.y -= 1
	person.geometry.scale(0.5, 0.5, 0.5)
	person.add(sign)
	person.add(stick)

	const shadowPersonGeometry = new THREE.Geometry()
	const shadowPersonClone = body.clone()
	shadowPersonGeometry.merge(shadowPersonClone)
	const stickClone = stickG.clone()
	stickClone.translate(-0.7, 0.05, 0.02)
	shadowPersonGeometry.merge(stickClone)
	const shadowPerson = new THREE.Mesh(shadowPersonGeometry, shadows)
	shadowPerson.receiveShadow = true
	const signClone = new THREE.Mesh(object, shadows)
	signClone.position.set(-0.68, 0.9, 0.02)
	signClone.rotation.x += 0.4
	signClone.rotation.y += 0.6
	signClone.rotation.z += 1.35
	shadowPerson.add(signClone)
	person.add(shadowPerson)

	scene.add(person)
	flaggers.push(person)

	const person2 = person.clone(true)
	person2.position.set(1, 1.2, -1)
	scene.add(person2)
	flaggers.push(person2)
}
