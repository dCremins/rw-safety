function initTruck() {

	var truck = new THREE.Group()
	var shadowCopy = new THREE.Geometry()
	// Base
  var core = new THREE.Geometry()
	var nose = new THREE.BoxGeometry( 1, .8, 1.3 )
  nose.translate(-.6, 0, 0)
  core.merge(nose)
	var cabin = new THREE.BoxGeometry( .1, .8, 1.3 )
  cabin.translate(.52, .25, 0)
  core.merge(cabin)
	var cabinSide = new THREE.BoxGeometry( .1, .7, .3 )
  cabinSide.translate(.52, .85, .5)
  core.merge(cabinSide)
  cabinSide.translate(0, 0, -1)
  core.merge(cabinSide)
	var roof = new THREE.BoxGeometry( .8, .1, 1.3 )
  roof.translate(.17, 1.15, 0)
  roof.vertices[6].x-= .05
  roof.vertices[7].x-= .05
  core.merge(roof)
	var shieldRight = new THREE.BoxGeometry( .1, 1, .1 )
  shieldRight.translate(-.6, .52, -.6)
  shieldRight.rotateZ(-.4)
  core.merge(shieldRight)
  shieldRight.translate(0, 0, 1.2)
  core.merge(shieldRight)
	var windshield = new THREE.BoxGeometry( 1, .8, 1.29 )
  // x
  windshield.vertices[4].x+= .26
  windshield.vertices[5].x+= .26
  windshield.vertices[6].x-= .035
  windshield.vertices[7].x-= .035
  // y
	windshield.vertices[0].y+= 2.2
  windshield.vertices[1].y+= 2.2
  windshield.vertices[2].y+= 2.3
  windshield.vertices[3].y+= 2.3
  windshield.vertices[4].y+= 2.2
  windshield.vertices[5].y+= 2.2
  windshield.vertices[6].y+= 2.3
  windshield.vertices[7].y+= 2.3
	var shield = new THREE.Mesh( windshield, windowColor )
	truck.add(shield)
	var bed = new THREE.BoxGeometry( 3.2, .3, 1.3 )
  bed.translate(.9, -.31, 0)
  core.merge(bed)
	var bedSide = new THREE.BoxGeometry( 2.68, .6, .1 )
  bedSide.translate(1.15, .1, .6)
  core.merge(bedSide)
  bedSide.translate(0, 0, -1.2)
  core.merge(bedSide)
	var bedBack = new THREE.BoxGeometry( .1, .6, 1.3 )
  bedBack.translate(2.45, .1, 0)
  core.merge(bedBack)
	core.translate(0, 1.5, 0)
	var shadowCore = core.clone(true)
	shadowCopy.merge(shadowCore)
	var base = new THREE.Mesh( core, offwhite )
	base.castShadow = true
	truck.add(base)
  // Inside
  var seat = new THREE.Geometry()
	var seatButt = new THREE.BoxGeometry( .4, .1, .4 )
  seatButt.translate(.25, 1.6, .3)
  seat.merge(seatButt)
  seatButt.translate(0, 0, -.6)
  seat.merge(seatButt)
	var seatBack = new THREE.BoxGeometry( .1, .7, .4 )
  seatBack.translate(.45, 1.8, .3)
  seat.merge(seatBack)
  seatBack.translate(0, 0, -.6)
  seat.merge(seatBack)
	var steering = new THREE.CylinderGeometry( .2, .2, .05, 32 )
  steering.translate(-1.9, .65, .3)
  steering.rotateZ(-1.2)
  seat.merge(steering)
	var shadowSeat = seat.clone(true)
	shadowCopy.merge(shadowSeat)
	var seatPiece = new THREE.Mesh( seat, gray )
	truck.add(seatPiece)
  // Bumper

  var bumperGeometry = new THREE.Geometry()
	var frontBumper = new THREE.BoxGeometry( .4, .1, 1.4 )
  frontBumper.translate(-.95, 1.05, 0)
  frontBumper.vertices[2].x+= .01
  frontBumper.vertices[3].x+= .01
  bumperGeometry.merge(frontBumper)
	var middleBumper = new THREE.BoxGeometry( 1.1, .1, 1.4 )
  middleBumper.translate(.7, 1.05, 0)
  middleBumper.vertices[2].x+= .01
  middleBumper.vertices[3].x+= .01
  middleBumper.vertices[6].x-= .01
  middleBumper.vertices[7].x-= .01
  bumperGeometry.merge(middleBumper)
	var backBumper = new THREE.BoxGeometry( .4, .1, 1.4 )
  backBumper.translate(2.35, 1.05, 0)
  backBumper.vertices[6].x-= .01
  backBumper.vertices[7].x-= .01
  bumperGeometry.merge(backBumper)
	var shadowBumper = bumperGeometry.clone(true)
	shadowCopy.merge(shadowBumper)
	var bumper = new THREE.Mesh( bumperGeometry, palegray )
	truck.add(bumper)
	// Wheels
  var wheels = new THREE.Geometry()
	var wheelGeometry = new THREE.CylinderGeometry( .45, .45, .2, 32 )
  wheelGeometry.translate(-.3, .55, -1.1)
  wheelGeometry.rotateX(1.6)
  wheels.merge(wheelGeometry)
  wheelGeometry.translate(0, 0, -1.2)
  wheels.merge(wheelGeometry)
  wheelGeometry.translate(2, 0, 1.2)
  wheels.merge(wheelGeometry)
  wheelGeometry.translate(0, 0, -1.2)
  wheels.merge(wheelGeometry)
	var grill = new THREE.BoxGeometry( .01, .7, 1.2 )
  grill.translate(-1.1, 1.5, 0)
  wheels.merge(grill)
	var license = new THREE.BoxGeometry( .05, .2, .5 )
  license.translate(2.5, 1.25, 0)
  wheels.merge(license)
	var shadowWheel = wheels.clone(true)
	shadowCopy.merge(shadowWheel)
	var greys = new THREE.Mesh( wheels, gray )
	greys.castShadow = true
	truck.add(greys)
  // Hubcaps
  var hubs = new THREE.Geometry()
	var hubGeometry = new THREE.TorusGeometry( .25, .1, 3, 199 )
  hubGeometry.translate(-.3, 1.09, .63)
  hubs.merge(hubGeometry)
  hubGeometry.translate(0, 0, -1.3)
  hubs.merge(hubGeometry)
  hubGeometry.translate(2, 0, 1.3)
  hubs.merge(hubGeometry)
  hubGeometry.translate(0, 0, -1.3)
  hubs.merge(hubGeometry)
	var shadowHubs = hubs.clone(true)
	shadowCopy.merge(shadowHubs)
	var hubcaps = new THREE.Mesh( hubs, offwhite )
	truck.add(hubcaps)
  //Back
  var brakeLights = new THREE.Geometry()
	var leftLight = new THREE.BoxGeometry( .1, .1, .1 )
  leftLight.translate(2.5, 1.25, .45)
  brakeLights.merge(leftLight)
  leftLight.translate(0, 0, -.9)
  brakeLights.merge(leftLight)
	var shadowlights = brakeLights.clone(true)
	shadowCopy.merge(shadowlights)
	var brakes = new THREE.Mesh( brakeLights, red )
	truck.add(brakes)

  // Lights
	var lightGeometry = new THREE.BoxGeometry( .1, .05, .5 )
	lightGeometry.translate(.2, 2.72, 0)
	var shadowlTopLights = lightGeometry.clone(true)
	shadowCopy.merge(shadowlTopLights)
	var light = new THREE.Mesh( lightGeometry, orange )
	light.castShadow = true
	truck.add( light )

	var baseShadow = new THREE.Mesh( shadowCopy, shadows )
	truck.add(baseShadow)

  truck.position.set(0, 0, 7)
  truck.rotation.y += .5
  truck.scale.set(.9, .9, .9)
  scene.add(truck)
}
