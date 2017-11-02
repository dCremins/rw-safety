function initApartment() {
	const meshes = new THREE.Geometry()
	const officeShadows = new THREE.Geometry()
	const materials = [
		foundation,
		brick,
		windowColor,
		couchFabric,
		blueFabric,
		purpleFabric,
		tanFabric,
		stone,
		shadows
	]

  // Outside Walls
	const base = new THREE.Geometry()
	const left = new THREE.BoxGeometry(0.5, 10, 1)
	left.translate(-3.5, 5.25, 3.25)
	base.merge(left)
	left.translate(0, 0, -2.125)
	base.merge(left)
	left.translate(0, 0, -2.125)
	base.merge(left)
	left.translate(0, 0, -2.125)
	base.merge(left)
	left.translate(7, 0, 0)
	base.merge(left)
	left.translate(0, 0, 2.125)
	base.merge(left)
	left.translate(0, 0, 2.125)
	base.merge(left)
	left.translate(0, 0, 2.125)
	base.merge(left)
	const back = new THREE.BoxGeometry(1, 10, 0.5)
	back.translate(-1.5, 5.25, -3.375)
	base.merge(back)
	back.translate(3, 0, 0)
	base.merge(back)
	back.translate(0, 0, 6.875)
	base.merge(back)
	back.translate(-3, 0, 0)
	base.merge(back)
	const backSide = new THREE.BoxGeometry(1.25, 3.5, 0.5)
	backSide.translate(-2.625, 2, 3.5)
	base.merge(backSide)
	backSide.translate(5.25, 0, 0)
	base.merge(backSide)
	backSide.translate(0, 0, -6.875)
	base.merge(backSide)
	backSide.translate(-5.25, 0, 0)
	base.merge(backSide)
	let front = new THREE.BoxGeometry(1.25, 1.75, 0.5)
	front.translate(-2.625, 6.25, 3.5)
	base.merge(front)
	front.translate(0, 3.125, 0)
	base.merge(front)
	front.translate(5.25, 0, 0)
	base.merge(front)
	front.translate(0, -3.125, 0)
	base.merge(front)
	front.translate(0, 0, -6.875)
	base.merge(front)
	front.translate(0, 3.125, 0)
	base.merge(front)
	front.translate(-5.25, 0, 0)
	base.merge(front)
	front.translate(0, -3.125, 0)
	base.merge(front)
	front = new THREE.BoxGeometry(2, 7.5, 0.5)
	front.translate(0, 6.5, 3.5)
	base.merge(front)
	front = new THREE.BoxGeometry(2, 10, 0.5)
	front.translate(0, 5.25, -3.375)
	base.merge(front)
	let side = new THREE.BoxGeometry(0.5, 3.5, 1.15)
	side.translate(-3.5, 2, 2.19)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(7, 0, 0)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	side = new THREE.BoxGeometry(0.5, 1.75, 1.15)
	side.translate(-3.5, 6.25, 2.19)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(7, 0, 0)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	side.translate(0, 3.125, 0)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(0, 0, -2.125)
	base.merge(side)
	side.translate(-7, 0, 0)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	side.translate(0, 0, 2.125)
	base.merge(side)
	const floor = new THREE.BoxGeometry(6.5, 0.25, 6.5)
	floor.translate(0, 3, 0)
	base.merge(floor)
	floor.translate(0, 3.5, 0)
	base.merge(floor)
	floor.translate(0, 3.63, 0)
	base.merge(floor)
	const innerWall = new THREE.BoxGeometry(0.25, 7.25, 6.5)
	innerWall.translate(0, 6.67, 0)
	base.merge(innerWall)

	for (var j = 0; j < base.faces.length; j++) {
		base.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(base))

	for (var j = 0; j < base.faces.length; j++) {
		base.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(base))

  // Windows
	const windows = new THREE.Geometry()
	let windowSide = new THREE.BoxGeometry(7, 9.5, 0.1)
	windowSide.translate(0, 5, 3.5)
	windows.merge(windowSide)
	windowSide.translate(0, 0, -7)
	windows.merge(windowSide)
	windowSide = new THREE.BoxGeometry(0.1, 9.5, 7)
	windowSide.translate(3.5, 5, 0)
	windows.merge(windowSide)
	windowSide.translate(-7, 0, 0)
	windows.merge(windowSide)

	for (var j = 0; j < windows.faces.length; j++) {
		windows.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(windows))

  // Roof & Foundation

	const cap = new THREE.Geometry()

	const found = new THREE.BoxGeometry(8, 0.5, 8)
	cap.merge(found)

	const step = new THREE.BoxGeometry(8.25, 0.25, 8.25)
	step.translate(0, -0.125, 0)
	cap.merge(step)

	const capLeft = new THREE.BoxGeometry(0.25, 0.5, 7.375)
	capLeft.translate(-3.88, 10.5, 0.05)
	cap.merge(capLeft)
	capLeft.translate(7.76, 0, 0)
	cap.merge(capLeft)
	const capFront = new THREE.BoxGeometry(8.01, 0.5, 0.25)
	capFront.translate(0, 10.5, 3.86)
	cap.merge(capFront)
	capFront.translate(0, 0, -7.6)
	cap.merge(capFront)
  // Sill
  // Fronts - bottom
	const sillBottom = new THREE.Geometry()
	const sill1 = new THREE.BoxGeometry(1.5, 0.1, 0.1)
	sill1.translate(-2.6, 7.125, 3.8)
	sillBottom.merge(sill1)
	sill1.translate(0, 0, -7.475)
	sillBottom.merge(sill1)
	let sill2 = new THREE.BoxGeometry(1.22, 0.1, 0.5)
	sill2.translate(-2.62, 7.125, 3.5)
	sillBottom.merge(sill2)
	sill2.translate(0, 0, -6.875)
	sillBottom.merge(sill2)
	cap.merge(sillBottom)
	sillBottom.translate(5.25, 0, 0)
	cap.merge(sillBottom)
	sillBottom.translate(0, -3.375, 0)
	cap.merge(sillBottom)
	sillBottom.translate(-5.25, 0, 0)
	cap.merge(sillBottom)
  // Fronts - top
	const sillTop = new THREE.Geometry()
	let sill3 = new THREE.BoxGeometry(1.375, 0.1, 0.1)
	sill3.translate(-2.6, 8.5, 3.8)
	sillTop.merge(sill3)
	sill3.translate(0, 0, -7.475)
	sillTop.merge(sill3)
	let sill4 = new THREE.BoxGeometry(1.25, 0.1, 0.1)
	sill4.translate(-2.625, 7.75, 3.55)
	sillTop.merge(sill4)
	sill4.translate(0, 0, -7.1)
	sillTop.merge(sill4)
	cap.merge(sillTop)
	sillTop.translate(5.25, 0, 0)
	cap.merge(sillTop)
	sillTop.translate(0, -3.12, 0)
	cap.merge(sillTop)
	sillTop.translate(-5.25, 0, 0)
	cap.merge(sillTop)
  // Sides-Top
	const sillTopSide = new THREE.Geometry()
	const sill = new THREE.BoxGeometry(0.1, 0.1, 1.375)
	sill.translate(3.8, 8.5, 2.175)
	sillTopSide.merge(sill)
	sill.translate(-7.6, 0, 0)
	sillTopSide.merge(sill)
	sill2 = new THREE.BoxGeometry(0.1, 0.1, 1.25)
	sill2.translate(3.55, 7.75, 2.175)
	sillTopSide.merge(sill2)
	sill2.translate(-7.1, 0, 0)
	sillTopSide.merge(sill2)
	cap.merge(sillTopSide)
	sillTopSide.translate(0, 0, -2.125)
	cap.merge(sillTopSide)
	sillTopSide.translate(0, 0, -2.125)
	cap.merge(sillTopSide)
	sillTopSide.translate(0, -3.125, 0)
	cap.merge(sillTopSide)
	sillTopSide.translate(0, 0, 2.125)
	cap.merge(sillTopSide)
	sillTopSide.translate(0, 0, 2.125)
	cap.merge(sillTopSide)
	const sillBottomSide = new THREE.Geometry()
	sill3 = new THREE.BoxGeometry(0.1, 0.1, 1.5)
	sill3.translate(3.8, 7.1, 2.175)
	sillBottomSide.merge(sill3)
	sill3.translate(-7.6, 0, 0)
	sillBottomSide.merge(sill3)
	sill4 = new THREE.BoxGeometry(0.5, 0.1, 1.22)
	sill4.translate(3.51, 7.1, 2.175)
	sillBottomSide.merge(sill4)
	sill4.translate(-7.02, 0, 0)
	sillBottomSide.merge(sill4)
	cap.merge(sillBottomSide)
	sillBottomSide.translate(0, 0, -2.125)
	cap.merge(sillBottomSide)
	sillBottomSide.translate(0, 0, -2.125)
	cap.merge(sillBottomSide)
	sillBottomSide.translate(0, -3.37, 0)
	cap.merge(sillBottomSide)
	sillBottomSide.translate(0, 0, 2.125)
	cap.merge(sillBottomSide)
	sillBottomSide.translate(0, 0, 2.125)
	cap.merge(sillBottomSide)
  // Door
	const doorSill = new THREE.BoxGeometry(2.5, 0.25, 0.2)
	doorSill.translate(0, 2.87, 3.75)
	cap.merge(doorSill)
	const doorSillSide = new THREE.BoxGeometry(0.1, 2.5, 0.1)
	doorSillSide.translate(-1, 1.5, 3.75)
	cap.merge(doorSillSide)
	doorSillSide.translate(1, 0, 0)
	cap.merge(doorSillSide)
	doorSillSide.translate(1, 0, 0)
	cap.merge(doorSillSide)
  // Add to building
	for (var j = 0; j < cap.faces.length; j++) {
		cap.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(cap))

	for (var j = 0; j < cap.faces.length; j++) {
		cap.faces[j].materialIndex = 8;
	}
	officeShadows.mergeMesh(new THREE.Mesh(cap))

  // Set Decorations
	const Green = new THREE.Geometry()
	const Blue = new THREE.Geometry()
	const Purple = new THREE.Geometry()
	const Tan = new THREE.Geometry()

	const couchSeat = new THREE.BoxGeometry(0.75, 0.25, 1.65)
	couchSeat.translate(-1, 6.75, -0.01)
	Green.merge(couchSeat)
	Blue.merge(couchSeat)
	Purple.merge(couchSeat)
	Tan.merge(couchSeat)

	const couchBack = new THREE.BoxGeometry(0.25, 0.75, 1.65)
	couchBack.translate(-0.5, 7, -0.01)
	Green.merge(couchBack)
	Blue.merge(couchBack)
	Purple.merge(couchBack)
	Tan.merge(couchBack)

	const armRest = new THREE.BoxGeometry(1, 0.5, 0.25)
	armRest.translate(-0.87, 6.87, 0.92)
	Green.merge(armRest)
	Blue.merge(armRest)
	Purple.merge(armRest)
	Tan.merge(armRest)
	armRest.translate(0, 0, -1.84)
	Green.merge(armRest)
	Blue.merge(armRest)
	Purple.merge(armRest)
	Tan.merge(armRest)

	const cushion = new THREE.BoxGeometry(0.75, 0.15, 0.5)
	cushion.translate(-1, 6.86, 0)
	Green.merge(cushion)
	Blue.merge(cushion)
	Purple.merge(cushion)
	Tan.merge(cushion)
	cushion.translate(0, 0, -0.52)
	Green.merge(cushion)
	Blue.merge(cushion)
	Purple.merge(cushion)
	Tan.merge(cushion)
	cushion.translate(0, 0, 1.04)
	Green.merge(cushion)
	Blue.merge(cushion)
	Purple.merge(cushion)
	Tan.merge(cushion)


	Green.rotateY(1.25)
	Green.translate(-1.25, 0, -3)
	Blue.rotateY(-1.25)
	Blue.translate(2.25, 0, 3.25)
	Purple.rotateY(1)
	Purple.translate(2.5, -3.5, -3.25)
	Tan.rotateY(-1.5)
	Tan.translate(-2.25, -3.5, 3.25)

	const sheets = new THREE.BoxGeometry(2.2, 0.5, 1.2)
	sheets.translate(-1.5, 3.55, -2)
	sheets.rotateY(-1.55)
	sheets.translate(-3, 0, 0)
	Blue.merge(sheets)
	sheets.translate(0, 3.5, 3)
	Purple.merge(sheets)
	sheets.rotateY(1.55)
	sheets.translate(.325, 0, -3.075)
	Purple.merge(sheets)
	sheets.translate(-.75, -3.5, 3.985)
	Green.merge(sheets)

  // Green
	for (var j = 0; j < Green.faces.length; j++) {
		Green.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(Green))

	// Blue
	for (var j = 0; j < Blue.faces.length; j++) {
		Blue.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(Blue))

	// Purple
	for (var j = 0; j < Purple.faces.length; j++) {
		Purple.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(Purple))

	// Tan
	for (var j = 0; j < Tan.faces.length; j++) {
		Tan.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(Tan))


	const mattress = new THREE.BoxGeometry(2.5, 0.45, 1)
	mattress.rotateY(-1.55)
	mattress.translate(-1.02, 3.475, -1.75)
	for (var j = 0; j < mattress.faces.length; j++) {
		mattress.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(mattress))

	const mattress2 = mattress.clone()
	mattress2.rotateY(1.55)
	mattress2.translate(3.3, 0, 1)
	for (var j = 0; j < mattress2.faces.length; j++) {
		mattress2.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(mattress2))

	const mattress3 = mattress.clone()
	mattress3.rotateY(1.55)
	mattress3.translate(3.3, 3.5, -3)
	for (var j = 0; j < mattress3.faces.length; j++) {
		mattress3.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(mattress3))

	const mattress4 = mattress.clone()
	mattress4.translate(0, 3.5, 3)
	for (var j = 0; j < mattress4.faces.length; j++) {
		mattress4.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(mattress4))

  // Lobby
	const lobbyDesk = new THREE.Geometry()
	let deskFront = new THREE.BoxGeometry(3, 1, 0.1)
	deskFront.translate(0, 1, -0.5)
	lobbyDesk.merge(deskFront)
	deskFront = new THREE.BoxGeometry(0.1, 1, 1)
	deskFront.translate(1.45, 1, -1)
	lobbyDesk.merge(deskFront)
	deskFront.translate(-2.9, 0, 0)
	lobbyDesk.merge(deskFront)
	deskFront = new THREE.BoxGeometry(3.2, 0.1, 1.2)
	deskFront.translate(0, 1.55, -1)
	lobbyDesk.merge(deskFront)
	deskFront = new THREE.BoxGeometry(3.1, 0.1, 1.1)
	deskFront.translate(0, 1.65, -1)
	lobbyDesk.merge(deskFront)
	for (var j = 0; j < lobbyDesk.faces.length; j++) {
		lobbyDesk.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(lobbyDesk))

// Create the combined mesh
let combinedMesh = new THREE.Mesh(meshes, materials)
combinedMesh.position.set(-11, 0.75, -9)
combinedMesh.castShadow = true
scene.add(combinedMesh)

}
