function initWorkers()	{
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		gray,						// 0
		jean,						// 1
		skinTone1,			// 2
		skinTone2,			// 3
		skinTone3,			// 4
		skinTone4,			// 5
		yellow,					// 6
		truckMaterial,	// 7
		offwhite,				// 8
		shadows					// 9
	]

	// Person 1
	let body = new THREE.Geometry()
	// Arms
	let rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
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
	// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(2.7, 2.5, 6.5)
	head.rotateY(-1)
	body.merge(head)

	body.scale(0.5, 0.5, 0.5)
	body.translate(4.55, 0.6, 3.5)
	const min = 2
	const max = 5
	let skinTone = ~~(Math.random() * (max - min)) + min

	shadow.merge(body)
	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = skinTone
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Person 2
	body = new THREE.Geometry()
	rightArm.rotateY(1.5)
	rightArm.translate(-5.4, 0.1, .35)
	body.merge(rightArm)

	head.translate(4.1, 0, -1)
	body.merge(head)

	leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[4].y -= 0.75
	leftArm.vertices[5].y -= 0.75
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[0].x += 0.05
	leftArm.vertices[1].x += 0.05
	leftArm.vertices[4].x += 0.5
	leftArm.vertices[5].x += 0.5
	leftArm.vertices[6].x += 0.5
	leftArm.vertices[7].x += 0.5
	leftArm.vertices[4].z += 0.15
	leftArm.vertices[5].z -= 0.15
	leftArm.vertices[6].z += 0.15
	leftArm.vertices[7].z -= 0.15
	leftArm.rotateY(0.5)
	leftArm.translate(0.065, 1.3, 4.79)
	body.merge(leftArm)
	body.scale(0.5, 0.5, 0.5)
	body.translate(4.52, 0.55, 3.52)

	skinTone = 0
	skinTone = ~~(Math.random() * (max - min)) + min

	shadow.merge(body)
	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = skinTone
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Person 3
	body = new THREE.Geometry()
	rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm.translate(0.85, 1.8, 0)
	rightArm.vertices[0].y -= 0.45
	rightArm.vertices[1].y -= 0.45
	rightArm.vertices[2].y -= 0.2
	rightArm.vertices[3].y -= 0.2
	rightArm.vertices[0].x -= 0.5
	rightArm.vertices[1].x -= 0.5
	rightArm.vertices[2].x -= 0.5
	rightArm.vertices[3].x -= 0.5
	rightArm.vertices[0].z += 0.45
	rightArm.vertices[1].z += 0.85
	rightArm.vertices[2].z += 0.45
	rightArm.vertices[3].z += 0.85
	rightArm.vertices[4].z += 0.02
	rightArm.vertices[6].z -= 0.04
	body.merge(rightArm)
	leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 1.8, 0)
	leftArm.vertices[5].y -= 0.45
	leftArm.vertices[4].y -= 0.45
	leftArm.vertices[7].y -= 0.2
	leftArm.vertices[6].y -= 0.2
	leftArm.vertices[5].x += 0.5
	leftArm.vertices[4].x += 0.5
	leftArm.vertices[7].x += 0.5
	leftArm.vertices[6].x += 0.5
	leftArm.vertices[5].z += 0.45
	leftArm.vertices[4].z += 0.85
	leftArm.vertices[7].z += 0.45
	leftArm.vertices[6].z += 0.85
	leftArm.vertices[1].z += 0.02
	leftArm.vertices[3].z -= 0.04
	body.merge(leftArm)
	head.translate(-0.1, 0, -5)
	body.merge(head)
	body.scale(0.5, 0.5, 0.5)
	body.rotateY(-0.35)
	body.translate(5.95, 0.6, 5.875)

	skinTone = 0
	skinTone = ~~(Math.random() * (max - min)) + min

	shadow.merge(body)
	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = skinTone
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Shirt
	const shirt = new THREE.Geometry()
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	torso.scale(0.5, 0.5, 0.5)
	torso.rotateY(-1)
	torso.translate(2.55, 1.25, 6.4)
	shirt.merge(torso)
	torso.rotateY(1.5)
	torso.translate(-2, 0, 8)
	shirt.merge(torso)
	torso.rotateY(-0.8)
	torso.translate(7, 0, -1.5)
	shirt.merge(torso)

	shadow.merge(torso)
	for (var j = 0; j < shirt.faces.length; j++) {
		shirt.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(shirt))
// Vest
	const vest = new THREE.Geometry()
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
	vestGeometry.rotateY(-1)
	vestGeometry.translate(2.55, 1.19, 6.4)
	vest.merge(vestGeometry)
	vestGeometry.rotateY(1.5)
	vestGeometry.translate(-2, 0, 8)
	vest.merge(vestGeometry)
	vestGeometry.rotateY(-0.8)
	vestGeometry.translate(7, 0, -1.5)
	vest.merge(vestGeometry)

	shadow.merge(vest)
	for (var j = 0; j < vest.faces.length; j++) {
		vest.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(vest))

	const stripes = new THREE.Geometry()
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
	vestStripes.merge(back)
	vestStripes.rotateY(-1)
	vestStripes.translate(2.55, 1.19, 6.4)
	stripes.merge(vestStripes)
	vestStripes.rotateY(1.5)
	vestStripes.translate(-2, 0, 8)
	stripes.merge(vestStripes)
	vestStripes.rotateY(-0.8)
	vestStripes.translate(7, 0, -1.5)
	stripes.merge(vestStripes)

	shadow.merge(stripes)
	for (var j = 0; j < stripes.faces.length; j++) {
		stripes.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(stripes))
// Pants
	const pants = new THREE.Geometry()
	const leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	leftLeg.scale(0.5, 0.5, 0.5)
	leftLeg.rotateY(-1)
	leftLeg.translate(2.485, 0.702, 6.3)
	pants.merge(leftLeg)
	leftLeg.rotateY(1.5)
	leftLeg.translate(-2, 0, 8)
	pants.merge(leftLeg)
	leftLeg.rotateY(-0.8)
	leftLeg.translate(7, 0, -1.5)
	pants.merge(leftLeg)
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	rightLeg.scale(0.5, 0.5, 0.5)
	rightLeg.rotateY(-1)
	rightLeg.translate(2.615, 0.702, 6.5)
	pants.merge(rightLeg)
	rightLeg.rotateY(1.5)
	rightLeg.translate(-2, 0, 8)
	pants.merge(rightLeg)
	rightLeg.rotateY(-0.8)
	rightLeg.translate(7, 0, -1.5)
	pants.merge(rightLeg)

	shadow.merge(pants)
	for (var j = 0; j < pants.faces.length; j++) {
		pants.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(pants))

// Hat
	const hat = new THREE.Geometry()
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(2.55, 1.83, 6.39)
	hat.merge(dome)
	dome.translate(2, 0, -0.5)
	hat.merge(dome)
	dome.translate(1.425, 0, -0.125)
	hat.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(2.45, 1.846, 6.45)
	hat.merge(brim)
	brim.translate(2.15, 0, -0.45)
	hat.merge(brim)
	brim.translate(1.325, 0, -0.125)
	hat.merge(brim)

	shadow.merge(hat)
	for (var j = 0; j < hat.faces.length; j++) {
		hat.faces[j].materialIndex = 7
	}
	meshes.mergeMesh(new THREE.Mesh(hat))

	// Paper
	const paper = new THREE.BoxGeometry(0.8, 0.6, 0.025)
	paper.rotateX(0.3)
	paper.rotateY(-0.3)
	paper.translate(5.85, 1.3, 6.15)

	shadow.merge(paper)
	for (var j = 0; j < paper.faces.length; j++) {
		paper.faces[j].materialIndex = 8
	}
	meshes.mergeMesh(new THREE.Mesh(paper))

	for (var j = 0; j < shadow.faces.length; j++) {
		shadow.faces[j].materialIndex = 9
	}
	meshes.mergeMesh(new THREE.Mesh(shadow))
	meshes.translate(-2.5, 0, -4.5)

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.position.set(0, 0, -13)
	scene.add(combinedMesh)
}
