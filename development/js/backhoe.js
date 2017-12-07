function initBackHoe() {
	let meshes = new THREE.Geometry()
	const materials = [
		truckMaterial,			// 0
		windowColor,				// 1
		gray,								// 2
		shadows							// 3
	]

	const shadowHoe = new THREE.Geometry()
	// Cabin
	const coreGeometry = new THREE.Geometry()
	const blockGeometry = new THREE.BoxGeometry(4, 0.5, 1.2)
	blockGeometry.translate(0.75, 0.25, -0.5)
	coreGeometry.merge(blockGeometry)
	const backAngle = new THREE.BoxGeometry(0.5, 0.5, 1.2)
	backAngle.translate(-1, 1, -0.5)
	backAngle.vertices[4].y -= 0.5
	backAngle.vertices[5].y -= 0.5
	coreGeometry.merge(backAngle)
	const backSolid = new THREE.BoxGeometry(0.25, 0.5, 1.2)
	backSolid.translate(-0.63, 1, -0.5)
	coreGeometry.merge(backSolid)
	const middleSolid = new THREE.BoxGeometry(2.5, 0.25, 1.2)
	middleSolid.translate(0, 0.625, -0.5)
	coreGeometry.merge(middleSolid)
	const roofSolid = new THREE.BoxGeometry(1.9, 0.1, 1.3)
	roofSolid.translate(0.4, 2.3, -0.5)
	coreGeometry.merge(roofSolid)
	// Arms
	const armBase = new THREE.BoxGeometry(0.75, 0.5, 0.25)
	armBase.translate(2.55, 0.25, 0.25)
	armBase.vertices[4].x -= 0.5
	armBase.vertices[5].x -= 0.5
	armBase.vertices[0].y += 0.55
	armBase.vertices[1].y += 0.55
	armBase.vertices[0].x -= 0.4
	armBase.vertices[1].x -= 0.4
	armBase.vertices[2].y += 1
	armBase.vertices[3].y += 1
	armBase.vertices[6].y += 0.5
	armBase.vertices[7].y += 0.5
	armBase.vertices[6].x += 0.2
	armBase.vertices[7].x += 0.2
	coreGeometry.merge(armBase)
	armBase.translate(0, 0, -1.5)
	coreGeometry.merge(armBase)
	const armLeft = new THREE.BoxGeometry(1, 0.25, 0.3)
	armLeft.translate(3.025, 1.18, 0.25)
	armLeft.vertices[4].x += 0.35
	armLeft.vertices[5].x += 0.35
	armLeft.vertices[0].y -= 0.3
	armLeft.vertices[1].y -= 0.3
	armLeft.vertices[2].y -= 0.5
	armLeft.vertices[3].y -= 0.5
	coreGeometry.merge(armLeft)
	armLeft.translate(0, 0, -1.5)
	coreGeometry.merge(armLeft)
	const armRight = new THREE.BoxGeometry(0.75, 0.45, 0.3)
	armRight.translate(3.9, 0.78, 0.25)
	armRight.vertices[0].y -= 0.5
	armRight.vertices[1].y -= 0.5
	armRight.vertices[0].x += 0.2
	armRight.vertices[1].x += 0.2
	armRight.vertices[2].y -= 0.5
	armRight.vertices[3].y -= 0.5
	coreGeometry.merge(armRight)
	armRight.translate(0, 0, -1.5)
	coreGeometry.merge(armRight)
	// Assemble Orange Base
	shadowHoe.merge(coreGeometry)

	for (var j = 0; j < coreGeometry.faces.length; j++) {
		coreGeometry.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(coreGeometry))
	// Windows
	const windowGeometry = new THREE.BoxGeometry(2.75, 1.75, 1.125)
	windowGeometry.translate(.94, 1.375, -.5)
	windowGeometry.vertices[0].x -= 1.1
	windowGeometry.vertices[1].x -= 1.1
	windowGeometry.vertices[3].y += .15
	windowGeometry.vertices[2].y += .15

	for (var j = 0; j < windowGeometry.faces.length; j++) {
		windowGeometry.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(windowGeometry))
	// Cabin Frame
	const cabinGeometry = new THREE.Geometry()
	let verticalBarGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1)
	verticalBarGeometry.translate(-0.45, 1.5, 0.05)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0.55, 0, 0)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(-0.55, 0, 0)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry = new THREE.BoxGeometry(0.05, 1.5, 0.1)
	verticalBarGeometry.translate(1.23, 1.5, 0.05)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometry)
	const verticalBarGeometryBig = new THREE.BoxGeometry(0.05, 1.75, 0.1)
	verticalBarGeometryBig.translate(1.28, 1.375, 0.05)
	verticalBarGeometryBig.vertices[0].y -= 0.05
	verticalBarGeometryBig.vertices[1].y -= 0.05
	cabinGeometry.merge(verticalBarGeometryBig)
	verticalBarGeometryBig.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometryBig)
	const verticalBarGeometryLittle = new THREE.BoxGeometry(0.1, 0.25, 0.1)
	verticalBarGeometryLittle.translate(2.3, 0.625, 0.05)
	verticalBarGeometryLittle.vertices[0].y -= 0.05
	verticalBarGeometryLittle.vertices[1].y -= 0.05
	cabinGeometry.merge(verticalBarGeometryLittle)
	verticalBarGeometryLittle.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometryLittle)
	let horizontalBarGeometry = new THREE.BoxGeometry(1.75, 0.1, 0.1)
	horizontalBarGeometry.translate(0.375, 2.2, 0.05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry = new THREE.BoxGeometry(1, 0.1, 0.1)
	horizontalBarGeometry.translate(1.75, 0.55, 0.05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry = new THREE.BoxGeometry(1.75, 0.5, 0.1)
	horizontalBarGeometry.translate(0.4, 1, 0.05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	const backBarGeometry = new THREE.BoxGeometry(0.01, 0.2, 1)
	backBarGeometry.translate(-0.496, 1.3, -0.5)
	cabinGeometry.merge(backBarGeometry)
	backBarGeometry.translate(0, 0.9, 0)
	cabinGeometry.merge(backBarGeometry)
	const diagonalBarGeometry = new THREE.BoxGeometry(1.045, 0.1, 0.1)
	diagonalBarGeometry.translate(1.825, 2.155, 0.05)
	diagonalBarGeometry.vertices[0].y -= 1.5
	diagonalBarGeometry.vertices[1].y -= 1.5
	diagonalBarGeometry.vertices[2].y -= 1.5
	diagonalBarGeometry.vertices[3].y -= 1.5
	cabinGeometry.merge(diagonalBarGeometry)
	diagonalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(diagonalBarGeometry)
	const frontBarGeometry = new THREE.BoxGeometry(0.1, 0.1, 1)
	frontBarGeometry.translate(2.3, 0.55, -0.5)
	cabinGeometry.merge(frontBarGeometry)
	shadowHoe.merge(cabinGeometry)

	for (var j = 0; j < cabinGeometry.faces.length; j++) {
		cabinGeometry.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(cabinGeometry))
  // Inside
	const truckSeat = new THREE.Geometry()
	const truckSeatButt = new THREE.BoxGeometry(0.4, 0.1, 0.4)
	truckSeatButt.translate(0.7, 0.75, -0.5)
	truckSeat.merge(truckSeatButt)
	const truckSeatBack = new THREE.BoxGeometry(0.1, 0.7, 0.4)
	truckSeatBack.translate(0.45, 1.05, -0.5)
	truckSeat.merge(truckSeatBack)
	const truckSteering = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32)
	truckSteering.translate(1.5, -0.75, -0.5)
	truckSteering.rotateZ(1.2)
	truckSeat.merge(truckSteering)
	const truckConsole = new THREE.BoxGeometry(0.95, 0.24, 0.98)
	truckConsole.translate(1.75, 0.65, -0.5)
	truckSeat.merge(truckConsole)
	const truckInnerConsole = new THREE.BoxGeometry(0.95, 0.5, 0.98)
	truckInnerConsole.translate(1.75, 1, -0.5)
	truckInnerConsole.vertices[0].x -= 0.4
	truckInnerConsole.vertices[1].x -= 0.4
	truckSeat.merge(truckInnerConsole)

	for (var j = 0; j < truckSeat.faces.length; j++) {
		truckSeat.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(truckSeat))
	// Wheels
	const shape = new THREE.Shape()
	shape.moveTo(0, 0.75)
	shape.bezierCurveTo(0, 1.75, 1.5, 1.75, 1.5, 0.75)
	shape.lineTo(1.125, 0.75001)
	shape.bezierCurveTo(1.125, 1.25, 0.375, 1.25, 0.375, 0.75)
	shape.bezierCurveTo(0.375, 0.35, 1.125, 0.35, 1.125, 0.75)
	shape.lineTo(1.5, 0.75001)
	shape.bezierCurveTo(1.5, -0.125, 0, -0.125, 0, 0.75)

	const extrudeSettings = {
		amount: 0.5,
		steps: 50,
		bevelEnabled: false,
		curveSegments: 8
	}
	const truckWheel = new THREE.Group()
	const truckRubber = new THREE.Geometry()
	const truckTire = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	truckTire.translate(-1, -1, 0)
	truckRubber.merge(truckTire)
	truckTire.translate(0, 0, -1.5)
	truckRubber.merge(truckTire)
	truckTire.translate(3.2, 0, 0)
	truckRubber.merge(truckTire)
	truckTire.translate(0, 0, 1.5)
	truckRubber.merge(truckTire)
	const nut = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 6)
	nut.rotateX(1.6)
	nut.translate(-0.25, -0.2, 0.3)
	truckRubber.merge(nut)
	nut.translate(0, 0, -1.5)
	truckRubber.merge(nut)
	nut.translate(3.2, 0, 0)
	truckRubber.merge(nut)
	nut.translate(0, 0, 1.5)
	truckRubber.merge(nut)
	let truckBumper = new THREE.BoxGeometry(0.2, 0.2, 1.5)
	truckBumper.translate(-1.25, 0, -0.5)
	truckRubber.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(0.32, 0.2, 1.5)
	truckBumper.translate(-1.19, -0.2, -0.5)
	truckRubber.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(1.25, 0.2, 1.5)
	truckBumper.translate(1.25, -0.2, -0.5)
	truckRubber.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(0.2, 0.2, 0.9)
	truckBumper.translate(2.75, -0.2, -0.45)
	truckRubber.merge(truckBumper)
	const truckLicense = new THREE.BoxGeometry(0.05, 0.2, 0.5)
	truckLicense.translate(-1.25, 0.3, -0.5)
	truckRubber.merge(truckLicense)
	let Scoop = new THREE.BoxGeometry(0.5, 0.2, 2)
	Scoop.rotateZ(0.2)
	Scoop.translate(4.825, 0.7, -0.5)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(1, 0.2, 2)
	Scoop.rotateZ(1.15)
	Scoop.translate(4.45, 0.25, -0.5)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(1, 0.2, 2)
	Scoop.rotateZ(-0.7)
	Scoop.translate(4.61, -0.42, -0.5)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.2, 2)
	Scoop.translate(5.3, -0.717, -0.5)
	truckRubber.merge(Scoop)
	// Scoop Sides
	Scoop = new THREE.BoxGeometry(0.5, 0.25, 0.2)
	Scoop.translate(4.839, 0.53, 0.4)
	Scoop.vertices[6].y += 0.2
	Scoop.vertices[7].y += 0.2
	Scoop.vertices[2].y += 0.1
	Scoop.vertices[3].y += 0.1
	Scoop.vertices[2].x -= 0.15
	Scoop.vertices[3].x -= 0.15
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.25, 0.2)
	Scoop.translate(5.3, -0.5, 0.4)
	Scoop.vertices[4].x += 0.2
	Scoop.vertices[5].x += 0.2
	Scoop.vertices[0].y -= 0.2
	Scoop.vertices[1].y -= 0.2
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.75, 0.2)
	Scoop.translate(4.75, 0.25, 0.4)
	Scoop.vertices[2].x += 0.1
	Scoop.vertices[3].x += 0.1
	Scoop.vertices[4].x += 0.2
	Scoop.vertices[5].x += 0.2
	Scoop.vertices[0].x -= 0.23
	Scoop.vertices[1].x -= 0.23
	Scoop.vertices[0].y += 0.02
	Scoop.vertices[1].y += 0.02
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.5, 0.5, 0.2)
	Scoop.translate(4.875, -0.375, 0.4)
	Scoop.vertices[0].x += 0.1
	Scoop.vertices[1].x += 0.1
	Scoop.vertices[2].x += 0.3
	Scoop.vertices[3].x += 0.3
	Scoop.vertices[4].x -= 0.25
	Scoop.vertices[5].x -= 0.25
	Scoop.vertices[6].x += 0.05
	Scoop.vertices[7].x += 0.05
	Scoop.vertices[6].y += 0.05
	Scoop.vertices[7].y += 0.05
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	shadowHoe.merge(truckRubber)

	for (var j = 0; j < truckRubber.faces.length; j++) {
		truckRubber.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(truckRubber))

	const truckHub = new THREE.Geometry()
	const innerHub = new THREE.TorusGeometry(0.34, 0.1, 4, 50, 6.3)
	innerHub.translate(-0.25, -0.213, 0.415)
	truckHub.merge(innerHub)
	innerHub.translate(0, 0, -1.825)
	truckHub.merge(innerHub)
	innerHub.translate(3.2, 0, 0)
	truckHub.merge(innerHub)
	innerHub.translate(0, 0, 1.825)
	truckHub.merge(innerHub)
	const flatHub = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32)
	flatHub.translate(-0.25, 0.2, 0.25)
	flatHub.rotateX(1.6)
	truckHub.merge(flatHub)
	flatHub.translate(0, 0, -1.3)
	truckHub.merge(flatHub)
	flatHub.translate(3.25, 0, 0)
	truckHub.merge(flatHub)
	flatHub.translate(0, 0, 1.3)
	truckHub.merge(flatHub)
	shadowHoe.merge(truckHub)

	for (var j = 0; j < truckHub.faces.length; j++) {
		truckHub.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(truckHub))
	// Add To scene

	for (var j = 0; j < shadowHoe.faces.length; j++) {
		shadowHoe.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(shadowHoe))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.position.set(2.5, 1.4, -15)
	scene.add(combinedMesh)
}
