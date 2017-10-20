function initBench() {
	const bench = new THREE.Group()
	const benchGeometry = new THREE.Geometry()
	const benchSeat = new THREE.BoxGeometry(2, 0.1, 1)
	benchGeometry.merge(benchSeat)
	const benchBack = new THREE.BoxGeometry(2, 0.8, 0.1)
	benchBack.translate(0, 0.8, -0.55)
	benchGeometry.merge(benchBack)
	benchGeometry.scale(0.8, 0.8, 0.8)
	const benchCore = new THREE.Mesh(benchGeometry, orange)
	benchCore.castShadow = true
	bench.add(benchCore)
	// Metal
	const benchMetal = new THREE.Geometry()
	let metalSide = new THREE.BoxGeometry(0.1, 1.8, 0.1)
	metalSide.translate(-1.05, 0.4, -0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(0.1, 0.6, 0.1)
	metalSide.translate(-1.05, -0.25, 0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(0.1, 0.1, 1)
	metalSide.translate(-1.05, 0, 0)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(2, 0.1, 0.1)
	metalSide.translate(0, 0, 0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0, -1.1)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0.35, 0)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0.9, 0)
	benchMetal.merge(metalSide)
	benchMetal.scale(0.8, 0.8, 0.8)
	const metal = new THREE.Mesh(benchMetal, gray)
	metal.castShadow = true
	bench.add(metal)
	const benchShadow = new THREE.Geometry()
	const coreBenchShadow = benchGeometry.clone()
	benchShadow.merge(coreBenchShadow)
	const metalBenchShadow = benchMetal.clone()
	benchShadow.merge(metalBenchShadow)
	const shadowBench = new THREE.Mesh(benchShadow, shadows)
	bench.add(shadowBench)

	const body = new THREE.Geometry()
	// Arms
	let rightArm = new THREE.BoxGeometry(0.3, 0.4, 0.5)
	rightArm.translate(0.55, 0.1, 0.5)
	rightArm.vertices[4].x += 0.1
	rightArm.vertices[6].x += 0.1
	rightArm.vertices[0].x -= 0.2
	rightArm.vertices[2].x -= 0.2
	rightArm.vertices[0].y += 0.3
	rightArm.vertices[2].y += 0.4
	rightArm.vertices[4].y += 0.3
	rightArm.vertices[5].y += 0.3
	rightArm.vertices[6].y += 0.3
	rightArm.vertices[7].y += 0.4
	body.merge(rightArm)
	rightArm = new THREE.BoxGeometry(0.3, 0.4, 0.5)
	rightArm.translate(-0.55, 0.1, 0.5)
	rightArm.vertices[1].x -= 0.1
	rightArm.vertices[3].x -= 0.1
	rightArm.vertices[5].x += 0.2
	rightArm.vertices[7].x += 0.2
	rightArm.vertices[5].y += 0.3
	rightArm.vertices[7].y += 0.4
	rightArm.vertices[1].y += 0.3
	rightArm.vertices[0].y += 0.3
	rightArm.vertices[3].y += 0.3
	rightArm.vertices[2].y += 0.4
	body.merge(rightArm)
// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	body.merge(head)
	body.scale(0.5, 0.5, 0.5)
	body.translate(0, 0.56, 0)
	const person = new THREE.Mesh(body, skinTone3)
	bench.add(person)
// Clothes
// Shirt
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
	const leftArm = new THREE.BoxGeometry(0.3, 0.5, 0.5)
	leftArm.translate(0.55, 0.55, 0)
	leftArm.vertices[4].x -= 0.05
	leftArm.vertices[5].x -= 0.05
	leftArm.vertices[0].y -= 0.5
	leftArm.vertices[1].y -= 0.5
	leftArm.vertices[2].y -= 0.4
	leftArm.vertices[3].y -= 0.4
	leftArm.vertices[1].z += 0.1
	leftArm.vertices[3].z += 0.1
	torso.merge(leftArm)
	rightArm = new THREE.BoxGeometry(0.3, 0.5, 0.5)
	rightArm.translate(-0.55, 0.55, 0)
	rightArm.vertices[1].x += 0.05
	rightArm.vertices[0].x += 0.05
	rightArm.vertices[5].y -= 0.5
	rightArm.vertices[4].y -= 0.5
	rightArm.vertices[7].y -= 0.4
	rightArm.vertices[6].y -= 0.4
	rightArm.vertices[4].z += 0.1
	rightArm.vertices[6].z += 0.1
	torso.merge(rightArm)
	torso.scale(0.5, 0.5, 0.5)
	torso.translate(0, 0.56, 0)
	const Shirt = new THREE.Mesh(torso, gray)
	bench.add(Shirt)
// Pants
	const pant = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	pant.translate(-0.25, -0.8, 0)
	pant.vertices[3].z += 0.2
	pant.vertices[6].z += 0.2
	let leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(-0.25, -0.8, 0.8)
	leg.vertices[0].x -= 0.1
	leg.vertices[2].x -= 0.1
	leg.vertices[5].x += 0.1
	leg.vertices[7].x += 0.1
	leg.vertices[0].y -= 0.2
	leg.vertices[5].y -= 0.2
	pant.merge(leg)
	leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(0.25, -0.8, 0)
	leg.vertices[3].z += 0.2
	leg.vertices[6].z += 0.2
	pant.merge(leg)
	leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(0.25, -0.8, 0.8)
	leg.vertices[0].x -= 0.1
	leg.vertices[2].x -= 0.1
	leg.vertices[5].x += 0.1
	leg.vertices[7].x += 0.1
	leg.vertices[0].y -= 0.2
	leg.vertices[5].y -= 0.2
	pant.merge(leg)
	pant.scale(0.5, 0.5, 0.5)
	pant.translate(0, 0.56, 0)
	const Pants = new THREE.Mesh(pant, blue)
	bench.add(Pants)
	// Book
	const flap = new THREE.BoxGeometry(0.25, 0.3, 0.02)
	flap.translate(-0.05, 0.75, 0.35)
	flap.rotateY(-0.2)
	const flap2 = new THREE.BoxGeometry(0.25, 0.3, 0.02)
	flap2.translate(0.05, 0.75, 0.35)
	flap2.rotateY(0.2)
	flap.merge(flap2)
	let cover = new THREE.Mesh(flap, red)
	bench.add(cover)
	const pages = new THREE.BoxGeometry(0.25, 0.3, 0.05)
	pages.translate(-0.05, 0.75, 0.32)
	pages.rotateY(-0.2)
	const pages2 = new THREE.BoxGeometry(0.25, 0.3, 0.05)
	pages2.translate(0.05, 0.75, 0.32)
	pages2.rotateY(0.2)
	pages.merge(pages2)
	cover = new THREE.Mesh(pages, offwhite)
	bench.add(cover)

	// Shadows
	const pedestrianShadows = new THREE.Geometry()
	const newBody = body.clone(true)
	pedestrianShadows.merge(newBody)
	const newPages = pages.clone(true)
	pedestrianShadows.merge(newPages)
	const newShirt = torso.clone(true)
	newShirt.scale(1.01, 1.01, 1.01)
	pedestrianShadows.merge(newShirt)
	const newPants = pant.clone(true)
	newPants.scale(1.01, 1.01, 1.01)
	pedestrianShadows.merge(newPants)
	const newCover = flap.clone(true)
	pedestrianShadows.merge(newCover)
	const shadowPerson = new THREE.Mesh(pedestrianShadows, shadows)
	bench.add(shadowPerson)

	// Add to scene
	bench.position.set(0, 0.95, -7)
	scene.add(bench)
}
