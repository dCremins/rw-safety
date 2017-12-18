function flagger(group, color) {
	let meshes = new THREE.Geometry()
	const materials = [
		color,					// 0
		gray,						// 1
		jean,						// 2
		skinTone1,			// 3
		skinTone2,			// 4
		skinTone3,			// 5
		yellow,					// 6
		truckMaterial,	// 7
		shadows					// 8
	]

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
	torso.rotateY(-.5)
	torso.translate(.45, 0, .7)
	torso.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))

	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))


// Hat
	const hat = new THREE.Geometry()
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	hat.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	hat.merge(brim)
	hat.rotateY(-.5)
	hat.translate(.225, 0, .345)

	for (var j = 0; j < hat.faces.length; j++) {
		hat.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(hat))

	for (var j = 0; j < hat.faces.length; j++) {
		hat.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(hat))
// Vest
	const vestGeometry = new THREE.Geometry()
	const left = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	left.translate(-0.13, 0.17, 0)
	left.vertices[0].z -= 0.05
	left.vertices[1].z += 0.05
	left.vertices[4].z += 0.05
	left.vertices[4].x += 0.05
	left.vertices[5].z -= 0.05
	left.vertices[5].x += 0.05
	vestGeometry.merge(left)
	const right = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	right.translate(0.13, 0.17, 0)
	right.vertices[5].z -= 0.05
	right.vertices[4].z += 0.05
	right.vertices[1].z += 0.05
	right.vertices[1].x -= 0.05
	right.vertices[0].z -= 0.05
	right.vertices[0].x -= 0.05
	vestGeometry.merge(right)
	const back = new THREE.BoxGeometry(0.2, 0.5, 0.025)
	back.translate(0, 0.17, -0.1875)
	back.vertices[0].z += 0.05
	back.vertices[1].z += 0.05
	back.vertices[4].z += 0.05
	back.vertices[5].z += 0.05
	vestGeometry.merge(back)
	vestGeometry.rotateY(-.5)
	vestGeometry.translate(.225, 0, .345)

	for (var j = 0; j < vestGeometry.faces.length; j++) {
		vestGeometry.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(vestGeometry))

	for (var j = 0; j < vestGeometry.faces.length; j++) {
		vestGeometry.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(vestGeometry))
	// Stripes
	const vestStripes = new THREE.Geometry()
	let stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, 0.201)
	stripe.vertices[0].z -= 0.05
	stripe.vertices[1].z -= 0.05
	stripe.vertices[4].z -= 0.05
	stripe.vertices[5].z -= 0.05
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, -0.201)
	stripe.vertices[0].z += 0.05
	stripe.vertices[1].z += 0.05
	stripe.vertices[4].z += 0.05
	stripe.vertices[5].z += 0.05
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripe.translate(-0.11, 0.42, 0)
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(-0.13, 0.02, 0.201)
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(0.13, 0.02, 0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(-0.23, 0.02, 0)
	stripe.vertices[0].x += 0.02
	stripe.vertices[1].x += 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(0.23, 0.02, 0)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x -= 0.02
	stripe.vertices[5].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripe.translate(0, 0.02, -0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z += 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z += 0.02
	vestStripes.merge(stripe)
	vestStripes.rotateY(-.5)
	vestStripes.translate(.225, 0, .345)

	for (var j = 0; j < vestStripes.faces.length; j++) {
		vestStripes.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(vestStripes))

	for (var j = 0; j < vestStripes.faces.length; j++) {
		vestStripes.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(vestStripes))


	const pants = new THREE.Geometry()
	// Legs
	let leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.translate(-0.25, -1, 0)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	pants.merge(leftLeg)
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
	pants.merge(rightLeg)
	pants.rotateY(-.5)
	pants.translate(.45, 0, .7)
	pants.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < pants.faces.length; j++) {
		pants.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(pants))

	for (var j = 0; j < pants.faces.length; j++) {
		pants.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(pants))

	const body = new THREE.Geometry()
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
	body.rotateY(-.5)
	body.translate(.45, 0, .7)
	body.scale(0.5, 0.5, 0.5)
		let min = 3
  	let max = 5
		let skinTone = ~~(Math.random() * (max - min)) + min

	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = skinTone
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Flag
	const object = new THREE.CylinderGeometry(.4, .4, .1, 8)
	object.translate(.75, .25, -.55)
	object.rotateZ(1.25)
	object.rotateY(.75)
	object.rotateX(.5)

	for (var j = 0; j < object.faces.length; j++) {
		object.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(object))

	for (var j = 0; j < object.faces.length; j++) {
		object.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(object))

	const stick = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 32)
	stick.translate(-0.7, 0.05, 0.02)
	stick.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < stick.faces.length; j++) {
		stick.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(stick))

	for (var j = 0; j < stick.faces.length; j++) {
		stick.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(stick))
	//meshes.translate(2, 0, -2.8)


	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.rotation.set(0, -1.2, 0)
	combinedMesh.position.set(-10, 1.2, -13.5)
	combinedMesh.name = (group+'-flagger1')
	scene.add(combinedMesh)
	flaggers.push(combinedMesh)

	const person2 = combinedMesh.clone(true)
	person2.rotation.set(0, 2.4, 0)
	person2.position.set(10, 1.2, -26.5)
	person2.name = (group+'-flagger2')
	scene.add(person2)
	flaggers.push(person2)

}
