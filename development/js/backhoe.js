function initBackHoe()  {

	var backHoe = new THREE.Group()
	var shadowHoe = new THREE.Geometry()
	// Cabin
	var coreGeometry = new THREE.Geometry()
	var blockGeometry = new THREE.BoxGeometry( 4, .5, 1.2 )
	blockGeometry.translate(.75, .25, -.5)
	coreGeometry.merge(blockGeometry)
	var backAngle = new THREE.BoxGeometry( .5, .5, 1.2 )
	backAngle.translate(-1, 1, -.5)
  backAngle.vertices[4].y -= .5
  backAngle.vertices[5].y -= .5
	coreGeometry.merge(backAngle)
	var backSolid = new THREE.BoxGeometry( .25, .5, 1.2 )
	backSolid.translate(-.63, 1, -.5)
	coreGeometry.merge(backSolid)
	var middleSolid = new THREE.BoxGeometry( 2.5, .25, 1.2 )
	middleSolid.translate(0, .625, -.5)
	coreGeometry.merge(middleSolid)
	var roofSolid = new THREE.BoxGeometry( 1.9, .1, 1.3 )
	roofSolid.translate(.4, 2.3, -.5)
	coreGeometry.merge(roofSolid)
	// Arms
	var armBase = new THREE.BoxGeometry( .75, .5, .25 )
	armBase.translate(2.55, .25, .25)
  armBase.vertices[4].x -= .5
  armBase.vertices[5].x -= .5
  armBase.vertices[0].y += .55
  armBase.vertices[1].y += .55
  armBase.vertices[0].x -= .4
  armBase.vertices[1].x -= .4
  armBase.vertices[2].y += 1
  armBase.vertices[3].y += 1
  armBase.vertices[6].y += .5
  armBase.vertices[7].y += .5
  armBase.vertices[6].x += .2
  armBase.vertices[7].x += .2
	coreGeometry.merge(armBase)
	armBase.translate(0, 0, -1.5)
	coreGeometry.merge(armBase)
	var armLeft = new THREE.BoxGeometry( 1, .25, .3 )
	armLeft.translate(3.025, 1.18, .25)
  armLeft.vertices[4].x += .35
  armLeft.vertices[5].x += .35
  armLeft.vertices[0].y -= .3
  armLeft.vertices[1].y -= .3
  armLeft.vertices[2].y -= .5
  armLeft.vertices[3].y -= .5
	coreGeometry.merge(armLeft)
	armLeft.translate(0, 0, -1.5)
	coreGeometry.merge(armLeft)
	var armRight = new THREE.BoxGeometry( .75, .45, .3 )
	armRight.translate(3.9, .78, .25)
  armRight.vertices[0].y -= .5
  armRight.vertices[1].y -= .5
  armRight.vertices[0].x += .2
  armRight.vertices[1].x += .2
  armRight.vertices[2].y -= .5
  armRight.vertices[3].y -= .5
	coreGeometry.merge(armRight)
	armRight.translate(0, 0, -1.5)
	coreGeometry.merge(armRight)
	//Assemble Orange Base
	var shadowCoreGeometry = coreGeometry.clone(true)
	shadowHoe.merge(shadowCoreGeometry)
	var core = new THREE.Mesh( coreGeometry, truckMaterial )
	core.castShadow = true
	backHoe.add(core)
	// Windows
	var windowGeometry = new THREE.Geometry()
	//Front
	windowGeometry.vertices.push( new THREE.Vector3( -.5, 2.25, 0) )			// 0
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, 2.25, 0) )			// 1
	windowGeometry.vertices.push( new THREE.Vector3( 2.25, .75, 0) )	// 2
	windowGeometry.vertices.push( new THREE.Vector3( 2.25, .5, 0) )		// 3
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, .5, 0) )			// 4
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, .75, 0) )		// 5
	windowGeometry.vertices.push( new THREE.Vector3( -.5, .75, 0) )		// 6
	// Back
	windowGeometry.vertices.push( new THREE.Vector3( -.5, 2.25, -1) )		// 7
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, 2.25, -1) )		// 8
	windowGeometry.vertices.push( new THREE.Vector3( 2.25, .75, -1) )	// 9
	windowGeometry.vertices.push( new THREE.Vector3( 2.25, .5, -1) )	// 10
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, .5, -1) )		// 11
	windowGeometry.vertices.push( new THREE.Vector3( 1.25, .75, -1) )	// 12
	windowGeometry.vertices.push( new THREE.Vector3( -.5, .75, -1) )  // 13
	// Faces - Front
	windowGeometry.faces.push( new THREE.Face3( 6, 1, 0) )
	windowGeometry.faces.push( new THREE.Face3( 1, 6, 5) )
	windowGeometry.faces.push( new THREE.Face3( 5, 2, 1) )
	windowGeometry.faces.push( new THREE.Face3( 2, 5, 3) )
	windowGeometry.faces.push( new THREE.Face3( 4, 3, 5) )
	// Faces - Front2
	windowGeometry.faces.push( new THREE.Face3( 6, 0, 1) )
	windowGeometry.faces.push( new THREE.Face3( 1, 5, 6) )
	windowGeometry.faces.push( new THREE.Face3( 5, 1, 2) )
	windowGeometry.faces.push( new THREE.Face3( 2, 3, 5) )
	windowGeometry.faces.push( new THREE.Face3( 4, 5, 3) )
	// Faces - Back
	windowGeometry.faces.push( new THREE.Face3( 13, 8, 7) )
	windowGeometry.faces.push( new THREE.Face3( 8, 13, 12) )
	windowGeometry.faces.push( new THREE.Face3( 12, 9, 8) )
	windowGeometry.faces.push( new THREE.Face3( 9, 12, 10) )
	windowGeometry.faces.push( new THREE.Face3( 11, 10, 12) )
	// Faces - Back2
	windowGeometry.faces.push( new THREE.Face3( 13, 7, 8) )
	windowGeometry.faces.push( new THREE.Face3( 8, 12, 13) )
	windowGeometry.faces.push( new THREE.Face3( 12, 8, 9) )
	windowGeometry.faces.push( new THREE.Face3( 9, 10, 12) )
	windowGeometry.faces.push( new THREE.Face3( 11, 12, 10) )
	// Faces - Top
	windowGeometry.faces.push( new THREE.Face3( 0, 8, 7) )
	windowGeometry.faces.push( new THREE.Face3( 8, 0, 1) )
	// Faces - Top Side
	windowGeometry.faces.push( new THREE.Face3( 8, 1, 2) )
	windowGeometry.faces.push( new THREE.Face3( 8, 2, 9) )
	// Faces - Right Side
	windowGeometry.faces.push( new THREE.Face3( 2, 3, 9) )
	windowGeometry.faces.push( new THREE.Face3( 9, 3, 10) )
	// Faces - Right Bottom
	windowGeometry.faces.push( new THREE.Face3( 11, 10, 4) )
	windowGeometry.faces.push( new THREE.Face3( 10, 3, 4) )
	// Faces - Middle Side
	windowGeometry.faces.push( new THREE.Face3( 5, 12, 4) )
	windowGeometry.faces.push( new THREE.Face3( 12, 11, 4) )
	// Faces - Bottom
	windowGeometry.faces.push( new THREE.Face3( 13, 12, 6) )
	windowGeometry.faces.push( new THREE.Face3( 12, 5, 6) )
	// Faces - Left Side
	windowGeometry.faces.push( new THREE.Face3( 0, 7, 6) )
	windowGeometry.faces.push( new THREE.Face3( 7, 13, 6) )
	windowGeometry.computeFaceNormals()
	var truckWindows = new THREE.Mesh( windowGeometry, windowColor )
	backHoe.add(truckWindows)
	// Cabin Frame
	var cabinGeometry = new THREE.Geometry()
	var verticalBarGeometry = new THREE.BoxGeometry( .1, 1.5, .1 )
	verticalBarGeometry.translate(-.45, 1.5, .05)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(.55, 0, 0)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(-.55, 0, 0)
	cabinGeometry.merge(verticalBarGeometry)
	var verticalBarGeometry = new THREE.BoxGeometry( .05, 1.5, .1 )
	verticalBarGeometry.translate(1.23, 1.5, .05)
	cabinGeometry.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometry)
	var verticalBarGeometryBig = new THREE.BoxGeometry( .05, 1.75, .1 )
	verticalBarGeometryBig.translate(1.28, 1.375, .05)
  verticalBarGeometryBig.vertices[0].y -= .05
  verticalBarGeometryBig.vertices[1].y -= .05
	cabinGeometry.merge(verticalBarGeometryBig)
	verticalBarGeometryBig.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometryBig)
	var verticalBarGeometryLittle = new THREE.BoxGeometry( .1, .25, .1 )
	verticalBarGeometryLittle.translate(2.3, .625, .05)
  verticalBarGeometryLittle.vertices[0].y -= .05
  verticalBarGeometryLittle.vertices[1].y -= .05
	cabinGeometry.merge(verticalBarGeometryLittle)
	verticalBarGeometryLittle.translate(0, 0, -1.1)
	cabinGeometry.merge(verticalBarGeometryLittle)
	var horizontalBarGeometry = new THREE.BoxGeometry( 1.75, .1, .1 )
	horizontalBarGeometry.translate(.375, 2.2, .05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	var horizontalBarGeometry = new THREE.BoxGeometry( 1, .1, .1 )
	horizontalBarGeometry.translate(1.75, .55, .05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	var horizontalBarGeometry = new THREE.BoxGeometry( 1.75, .5, .1 )
	horizontalBarGeometry.translate(.4, 1, .05)
	cabinGeometry.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(horizontalBarGeometry)
	var backBarGeometry = new THREE.BoxGeometry( .01, .2, 1 )
	backBarGeometry.translate(-.496, 1.3, -.5)
	cabinGeometry.merge(backBarGeometry)
	backBarGeometry.translate(0, .9, 0)
	cabinGeometry.merge(backBarGeometry)
	var diagonalBarGeometry = new THREE.BoxGeometry( 1.045, .1, .1 )
	diagonalBarGeometry.translate(1.825, 2.155, .05)
  diagonalBarGeometry.vertices[0].y -= 1.5
  diagonalBarGeometry.vertices[1].y -= 1.5
  diagonalBarGeometry.vertices[2].y -= 1.5
  diagonalBarGeometry.vertices[3].y -= 1.5
	cabinGeometry.merge(diagonalBarGeometry)
	diagonalBarGeometry.translate(0, 0, -1.1)
	cabinGeometry.merge(diagonalBarGeometry)
	var frontBarGeometry = new THREE.BoxGeometry( .1, .1, 1 )
	frontBarGeometry.translate(2.3, .55, -.5)
	cabinGeometry.merge(frontBarGeometry)
	var shadowCabin = cabinGeometry.clone(true)
	shadowHoe.merge(shadowCabin)
	var cabin = new THREE.Mesh( cabinGeometry, gray )
	cabin.castShadow = true
	backHoe.add(cabin)
  // Inside
  var truckSeat = new THREE.Geometry()
	var truckSeatButt = new THREE.BoxGeometry( .4, .1, .4 )
  truckSeatButt.translate(.7, .75, -.5)
  truckSeat.merge(truckSeatButt)
	var truckSeatBack = new THREE.BoxGeometry( .1, .7, .4 )
  truckSeatBack.translate(.45, 1.05, -.5)
  truckSeat.merge(truckSeatBack)
	var truckSteering = new THREE.CylinderGeometry( .2, .2, .05, 32 )
  truckSteering.translate(1.5, -.75, -.5)
  truckSteering.rotateZ(1.2)
  truckSeat.merge(truckSteering)
	var truckConsole = new THREE.BoxGeometry( .95, .24, .98 )
	truckConsole.translate(1.75, .65, -.5)
	truckSeat.merge(truckConsole)
	var truckInnerConsole = new THREE.BoxGeometry( .95, .5, .98 )
	truckInnerConsole.translate(1.75, 1, -.5)
  truckInnerConsole.vertices[0].x -= .4
  truckInnerConsole.vertices[1].x -= .4
	truckSeat.merge(truckInnerConsole)
	var truckSeatPiece = new THREE.Mesh( truckSeat, gray )
	truckSeatPiece.castShadow = true
	backHoe.add(truckSeatPiece)
	// Wheels
	var shape = new THREE.Shape();
  shape.moveTo(0, .75)
  shape.bezierCurveTo(0,1.75, 1.5,1.75, 1.5,.75)
	shape.lineTo(1.125, .75)
  shape.bezierCurveTo(1.125,1.25, .375,1.25, .375,.75)
  shape.bezierCurveTo(.375,.35, 1.125,.35, 1.125,.75)
	shape.lineTo(1.5, .75)
  shape.bezierCurveTo(1.5,-.125, 0,-.125, 0,.75)

  var extrudeSettings = {
      amount : .5,
      steps : 50,
      bevelEnabled: false,
      curveSegments: 8
  };
	var truckWheel = new THREE.Group()
	var truckRubber = new THREE.Geometry()
  var truckTire = new THREE.ExtrudeGeometry( shape, extrudeSettings )
	truckTire.translate(-1, -1, 0)
	truckRubber.merge(truckTire)
	truckTire.translate(0, 0, -1.5)
	truckRubber.merge(truckTire)
	truckTire.translate(3.2, 0, 0)
	truckRubber.merge(truckTire)
	truckTire.translate(0, 0, 1.5)
	truckRubber.merge(truckTire)
	var nut = new THREE.CylinderGeometry(.15, .15, .3, 6)
  nut.rotateX(1.6)
	nut.translate(-.25, -.2, .3)
	truckRubber.merge(nut)
	nut.translate(0, 0, -1.5)
	truckRubber.merge(nut)
	nut.translate(3.2, 0, 0)
	truckRubber.merge(nut)
	nut.translate(0, 0, 1.5)
	truckRubber.merge(nut)
	var truckBumper = new THREE.BoxGeometry( .2, .2, 1.5 )
	truckBumper.translate(-1.25, 0, -.5)
	truckRubber.merge(truckBumper)
	var truckBumper = new THREE.BoxGeometry( .32, .2, 1.5 )
	truckBumper.translate(-1.19, -.2, -.5)
	truckRubber.merge(truckBumper)
	var truckBumper = new THREE.BoxGeometry( 1.25, .2, 1.5 )
	truckBumper.translate(1.25, -.2, -.5)
	truckRubber.merge(truckBumper)
	var truckBumper = new THREE.BoxGeometry( .2, .2, .9 )
	truckBumper.translate(2.75, -.2, -.45)
	truckRubber.merge(truckBumper)
	var truckLicense = new THREE.BoxGeometry( .05, .2, .5 )
	truckLicense.translate(-1.25, .3, -.5)
	truckRubber.merge(truckLicense)
	var Scoop = new THREE.BoxGeometry( .5, .2, 2 )
  Scoop.rotateZ(.2)
	Scoop.translate(4.825, .7, -.5)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( 1, .2, 2 )
  Scoop.rotateZ(1.15)
	Scoop.translate(4.45, .25, -.5)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( 1, .2, 2 )
  Scoop.rotateZ(-.7)
	Scoop.translate(4.61, -.42, -.5)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( .75, .2, 2 )
	Scoop.translate(5.3, -.717, -.5)
	truckRubber.merge(Scoop)
	// Scoop Sides
	var Scoop = new THREE.BoxGeometry( .5, .25, .2 )
	Scoop.translate(4.839, .53, .4)
  Scoop.vertices[6].y += .2
  Scoop.vertices[7].y += .2
  Scoop.vertices[2].y += .1
  Scoop.vertices[3].y += .1
  Scoop.vertices[2].x -= .15
  Scoop.vertices[3].x -= .15
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( .75, .25, .2 )
	Scoop.translate(5.3, -.5, .4)
  Scoop.vertices[4].x += .2
  Scoop.vertices[5].x += .2
  Scoop.vertices[0].y -= .2
  Scoop.vertices[1].y -= .2
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( .75, .75, .2 )
	Scoop.translate(4.75, .25, .4)
  Scoop.vertices[2].x += .1
  Scoop.vertices[3].x += .1
  Scoop.vertices[4].x += .2
  Scoop.vertices[5].x += .2
  Scoop.vertices[0].x -= .23
  Scoop.vertices[1].x -= .23
  Scoop.vertices[0].y += .02
  Scoop.vertices[1].y += .02
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	var Scoop = new THREE.BoxGeometry( .5, .5, .2 )
	Scoop.translate(4.875, -.375, .4)
  Scoop.vertices[0].x += .1
  Scoop.vertices[1].x += .1
  Scoop.vertices[2].x += .3
  Scoop.vertices[3].x += .3
  Scoop.vertices[4].x -= .25
  Scoop.vertices[5].x -= .25
  Scoop.vertices[6].x += .05
  Scoop.vertices[7].x += .05
  Scoop.vertices[6].y += .05
  Scoop.vertices[7].y += .05
	truckRubber.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	truckRubber.merge(Scoop)
	var shadowRubber = truckRubber.clone(true)
	shadowHoe.merge(shadowRubber)
  var mesh = new THREE.Mesh( truckRubber, gray )
	mesh.castShadow = true
	//mesh.position.set(0, .5, 0)
  truckWheel.add( mesh )
	var truckHub = new THREE.Geometry
	var innerHub = new THREE.TorusGeometry(.34, .1, 4, 50, 6.3)
	innerHub.translate(-.25, -.213, .415)
	truckHub.merge(innerHub)
	innerHub.translate(0, 0, -1.825)
	truckHub.merge(innerHub)
	innerHub.translate(3.2, 0, 0)
	truckHub.merge(innerHub)
	innerHub.translate(0, 0, 1.825)
	truckHub.merge(innerHub)
	var flatHub = new THREE.CylinderGeometry(.5, .5, .3, 32)
	flatHub.translate(-.25, .2, .25)
  flatHub.rotateX(1.6)
	truckHub.merge(flatHub)
	flatHub.translate(0, 0, -1.3)
	truckHub.merge(flatHub)
	flatHub.translate(3.25, 0, 0)
	truckHub.merge(flatHub)
	flatHub.translate(0, 0, 1.3)
	truckHub.merge(flatHub)
	var shadowHub = truckHub.clone(true)
	shadowHoe.merge(shadowHub)
	var backhoeHub = new THREE.Mesh( truckHub, truckMaterial )
	backhoeHub.castShadow = true
	truckWheel.add(backhoeHub)
	//truckWheel.position.set(0, .2, 0)
	backHoe.add(truckWheel)
	// Add To scene
	var backhoeShadow = new THREE.Mesh( shadowHoe, shadows )
	backHoe.add(backhoeShadow)
	backHoe.position.set(2.5, 1.4, 2.8)
	scene.add(backHoe)
}
