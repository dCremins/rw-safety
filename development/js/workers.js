function initWorkers()	{
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

	// Person 1
	let body = new THREE.Geometry()
	// Arms
	const rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm.translate(3.55, 1.8, 6.5)
	rightArm.vertices[0].y -= 0.75
	rightArm.vertices[1].y -= 0.75
	rightArm.vertices[2].y -= 0.5
	rightArm.vertices[3].y -= 0.5
	rightArm.vertices[0].x -= 0.5
	rightArm.vertices[1].x -= 0.5
	rightArm.vertices[2].x -= 0.5
	rightArm.vertices[3].x -= 0.5
	rightArm.vertices[0].z -= 0.15
	rightArm.vertices[1].z += 0.15
	rightArm.vertices[2].z -= 0.15
	rightArm.vertices[3].z += 0.15
	rightArm.rotateY(-1)
	body.merge(rightArm)
	rightArm.translate(2.9, 0, -0.2)
	rightArm.rotateY(1.8)
	body.merge(rightArm)
	rightArm.translate(1.4, 0, 0.1)
	rightArm.rotateY(-1.4)
	body.merge(rightArm)
	let leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(1.85, 1.8, 6.5)
	leftArm.vertices[5].y += 0.3
	leftArm.vertices[4].y += 0.3
	leftArm.vertices[7].y += 0.55
	leftArm.vertices[6].y += 0.55
	leftArm.vertices[5].x += 0.8
	leftArm.vertices[4].x += 0.8
	leftArm.vertices[7].x += 0.8
	leftArm.vertices[6].x += 0.8
	leftArm.vertices[5].z += 0.9
	leftArm.vertices[4].z += 1.05
	leftArm.vertices[7].z += 0.9
	leftArm.vertices[6].z += 1.05
	leftArm.rotateY(-1)
	body.merge(leftArm)
	leftArm.translate(2.9, 0, -0.2)
	leftArm.rotateY(1.8)
	body.merge(leftArm)
	leftArm.translate(1.4, 0, 0.1)
	leftArm.rotateY(-1.4)
	body.merge(leftArm)
	// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(2.7, 2.5, 6.5)
	head.rotateY(-1)
	body.merge(head)
	head.translate(2.9, 0, -0.2)
	head.rotateY(1.8)
	body.merge(head)
	head.translate(1.4, 0, 0.1)
	head.rotateY(-1.4)
	body.merge(head)

	body.scale(0.5, 0.5, 0.5)

	shadow.merge(body)
	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Clothes
	// Shirt
	const shirt = new THREE.Geometry()
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
	head.translate(2.7, , -0.2)
	body.merge(head)
	head.translate(2.9, 0, -0.2)
	head.rotateY(1.8)
	body.merge(head)
	head.translate(1.4, 0, 0.1)
	head.rotateY(-1.4)
	body.merge(head)

	shadow.merge(torso)
	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))
		// Pants
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
	leftLeg.merge(rightLeg)

	shadow.merge(leftLeg)
	for (var j = 0; j < leftLeg.faces.length; j++) {
		leftLeg.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(leftLeg))

	// Person 2
	body = new THREE.Geometry()
	body.merge(rightArm)
	body.merge(head)
	leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[5].y -= 0.75
	leftArm.vertices[4].y -= 0.75
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[5].x += 0.5
	leftArm.vertices[4].x += 0.5
	leftArm.vertices[7].x += 0.5
	leftArm.vertices[6].x += 0.5
	leftArm.vertices[5].z -= 0.15
	leftArm.vertices[4].z += 0.15
	leftArm.vertices[7].z -= 0.15
	leftArm.vertices[6].z += 0.15
	body.merge(leftArm)
	// Head
	const head2 = new THREE.SphereGeometry(0.35, 32, 32)
	head2.translate(0, 1.3, 0)
	body2.merge(head2)
	const person2 = new THREE.Mesh(body2, skinTone4)
	person2.castShadow = true
	person2.geometry.scale(0.5, 0.5, 0.5)
	worker2.add(person2)
	// Clothes
	// Shirt
	const shirt2 = new THREE.Mesh(torso, palegray)
	shirt2.castShadow = true
	const shadowShirt2 = torso.clone(true)
	shadowPerson2.merge(shadowShirt2)
	worker2.add(shirt2)
	// Pants
	const pants2 = new THREE.Mesh(leftLeg, jean)
	pants2.castShadow = true
	const shadowPant2 = leftLeg.clone(true)
	shadowPerson2.merge(shadowPant2)
	worker2.add(pants2)

	// Person 3
	const body3 = new THREE.Geometry()
	const rightArm3 = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm3.translate(0.85, 0.6, 0)
	rightArm3.vertices[0].y -= 0.45
	rightArm3.vertices[1].y -= 0.45
	rightArm3.vertices[2].y -= 0.2
	rightArm3.vertices[3].y -= 0.2
	rightArm3.vertices[0].x -= 0.5
	rightArm3.vertices[1].x -= 0.5
	rightArm3.vertices[2].x -= 0.5
	rightArm3.vertices[3].x -= 0.5
	rightArm3.vertices[0].z += 0.45
	rightArm3.vertices[1].z += 0.85
	rightArm3.vertices[2].z += 0.45
	rightArm3.vertices[3].z += 0.85
	body3.merge(rightArm3)
	const leftArm3 = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm3.translate(-0.85, 0.6, 0)
	leftArm3.vertices[5].y -= 0.45
	leftArm3.vertices[4].y -= 0.45
	leftArm3.vertices[7].y -= 0.2
	leftArm3.vertices[6].y -= 0.2
	leftArm3.vertices[5].x += 0.5
	leftArm3.vertices[4].x += 0.5
	leftArm3.vertices[7].x += 0.5
	leftArm3.vertices[6].x += 0.5
	leftArm3.vertices[5].z += 0.45
	leftArm3.vertices[4].z += 0.85
	leftArm3.vertices[7].z += 0.45
	leftArm3.vertices[6].z += 0.85
	body3.merge(leftArm3)
	// Head
	const head3 = new THREE.SphereGeometry(0.35, 32, 32)
	head3.translate(0, 1.3, 0)
	body3.merge(head3)
	const person3 = new THREE.Mesh(body3, skinTone1)
	person3.castShadow = true
	person3.geometry.scale(0.5, 0.5, 0.5)
	worker3.add(person3)
	// Clothes
	// Shirt
	const shirt3 = new THREE.Mesh(torso, palegray)
	shirt3.castShadow = true
	const shadowShirt3 = torso.clone(true)
	shadowPerson3.merge(shadowShirt3)
	worker3.add(shirt3)
	// Pants
	const pants3 = new THREE.Mesh(leftLeg, jean)
	pants3.castShadow = true
	const shadowPant3 = leftLeg.clone(true)
	shadowPerson3.merge(shadowPant3)
	worker3.add(pants3)

// Hat
	const hat = new THREE.Geometry()
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	hat.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	hat.merge(brim)
	const constHat = new THREE.Mesh(hat, truckMaterial)
	constHat.castShadow = true
	const hat2 = constHat.clone()
	const hat3 = constHat.clone()
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
	let vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.castShadow = true
	// Stripes
	const vestStripes = new THREE.Geometry()
	const stripeFront = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeFront.translate(-0.11, 0.17, 0.201)
	stripeFront.vertices[0].z -= 0.05
	stripeFront.vertices[1].z -= 0.05
	stripeFront.vertices[4].z -= 0.05
	stripeFront.vertices[5].z -= 0.05
	vestStripes.merge(stripeFront)
	stripeFront.translate(0.22, 0, 0)
	vestStripes.merge(stripeFront)
	const stripeBack = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeBack.translate(-0.11, 0.17, -0.201)
	stripeBack.vertices[0].z += 0.05
	stripeBack.vertices[1].z += 0.05
	stripeBack.vertices[4].z += 0.05
	stripeBack.vertices[5].z += 0.05
	vestStripes.merge(stripeBack)
	stripeBack.translate(0.22, 0, 0)
	vestStripes.merge(stripeBack)
	const stripeTop = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripeTop.translate(-0.11, 0.42, 0)
	vestStripes.merge(stripeTop)
	stripeTop.translate(0.22, 0, 0)
	vestStripes.merge(stripeTop)
	const stripeBottom1 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom1.translate(-0.13, 0.02, 0.201)
	stripeBottom1.vertices[4].x += 0.02
	stripeBottom1.vertices[5].x += 0.02
	stripeBottom1.vertices[0].z -= 0.02
	stripeBottom1.vertices[1].z -= 0.02
	stripeBottom1.vertices[4].z -= 0.02
	stripeBottom1.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom1)
	const stripeBottom2 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom2.translate(0.13, 0.02, 0.201)
	stripeBottom2.vertices[0].x -= 0.02
	stripeBottom2.vertices[1].x -= 0.02
	stripeBottom2.vertices[0].z -= 0.02
	stripeBottom2.vertices[1].z -= 0.02
	stripeBottom2.vertices[4].z -= 0.02
	stripeBottom2.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom2)
	const stripeBottom3 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom3.translate(-0.23, 0.02, 0)
	stripeBottom3.vertices[0].x += 0.02
	stripeBottom3.vertices[1].x += 0.02
	stripeBottom3.vertices[4].x += 0.02
	stripeBottom3.vertices[5].x += 0.02
	stripeBottom3.vertices[0].z -= 0.02
	stripeBottom3.vertices[1].z += 0.02
	stripeBottom3.vertices[4].z += 0.02
	stripeBottom3.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom3)
	const stripeBottom4 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom4.translate(0.23, 0.02, 0)
	stripeBottom4.vertices[0].x -= 0.02
	stripeBottom4.vertices[1].x -= 0.02
	stripeBottom4.vertices[4].x -= 0.02
	stripeBottom4.vertices[5].x -= 0.02
	stripeBottom4.vertices[0].z -= 0.02
	stripeBottom4.vertices[1].z += 0.02
	stripeBottom4.vertices[4].z += 0.02
	stripeBottom4.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom4)
	const stripeBottom5 = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripeBottom5.translate(0, 0.02, -0.201)
	stripeBottom5.vertices[0].x -= 0.02
	stripeBottom5.vertices[1].x -= 0.02
	stripeBottom5.vertices[4].x += 0.02
	stripeBottom5.vertices[5].x += 0.02
	stripeBottom5.vertices[0].z += 0.02
	stripeBottom5.vertices[1].z += 0.02
	stripeBottom5.vertices[4].z += 0.02
	stripeBottom5.vertices[5].z += 0.02
	vestStripes.merge(stripeBottom5)
	const stripes = new THREE.Mesh(vestStripes, yellow)
	vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.add(stripes)
	const vest2 = vest.clone()
	const vest3 = vest.clone()

	// Paper
	const paper = new THREE.BoxGeometry(0.8, 0.6, 0.025)
	paper.translate(0, 0.3, 0.25)
	paper.rotateX(0.4)
	const sheet = new THREE.Mesh(paper, white)
	sheet.castShadow = true

	worker.add(constHat)
	worker.add(vest)
	const shadow1 = new THREE.Mesh(shadowPerson1, shadows)
	worker.add(shadow1)

	scene.add(worker)

	worker2.add(hat2)
	worker2.add(vest2)
	const shadow2 = new THREE.Mesh(shadowPerson2, shadows)
	worker2.add(shadow2)
	scene.add(worker2)

	worker3.add(hat3)
	worker3.add(vest3)
	worker3.add(sheet)
	const shadow3 = new THREE.Mesh(shadowPerson3, shadows)
	worker3.add(shadow3)
	scene.add(worker3)
}
