function test(group, color) {
  // Remove old render if it exists
  if (scene.getObjectByName(group)) {
    scene.remove(scene.getObjectByName(group))
  }

  if (scene.getObjectByName('signGroup-'+group)) {
    scene.remove(scene.getObjectByName('signGroup-'+group))
  }
  var coneCore = new THREE.Mesh( coneGeometry, color )
  var shadowCone = new THREE.Mesh( coneGeometry, shadows )
  shadowCone.scale.set(1.05, 1.05, 1.05)
	//coneCore.receiveShadow = true
	coneCore.castShadow = true
	var cone = new THREE.Group()
  var newStripe = stripe.clone()
	cone.add(coneCore)
	cone.add(newStripe)
  var initialX
  var coneGroup = new THREE.Group()
  var shadowGroup = new THREE.Group()

/* Buffer */

  switch(group) {
    case 1:
      initialX = 0
      break
    case 2:
      initialX = -.5
      break
    case 3:
      initialX = -1.5
      break
    case 4:
      initialX = -2
      break
    case 5:
      initialX = -2.5
      break
    case 6:
      initialX = -3
      break
    default:
      break
  }
  var buffer = Number(document.getElementById('buffer-'+group).value)
	cone.position.set(initialX, .75, .5)
	coneGroup.add(cone)
	shadowCone.position.set(initialX, .75, .5)
	shadowGroup.add(shadowCone)
  var x = initialX
  var cones = 1+(buffer/100)
  var spacing = (buffer/50)/cones

  while ( Math.abs(x-spacing) <= (Math.abs((buffer/50))-initialX) && Math.abs(x) <= 23 ) {
  	var newCone = cone.clone()
    var newShadowCone = shadowCone.clone()
  	newShadowCone.position.set(x, .75, .5)
  	shadowGroup.add(newShadowCone)
    x -= spacing
  	newCone.position.set(x, .75, .5)
  	coneGroup.add(newCone)
  }

/* Transition Taper */

  var upstream = Number(document.getElementById('upstream-'+group).value)
  var cones = 2+(upstream/100)
  var spacing = (upstream/50)/cones
  var length = (buffer/50) + (upstream/50)
  var y = (3/cones)+.5
  for (var i=1; i <= cones; i++) {
    var newCone = cone.clone()
    x -= spacing
  	newCone.position.set(x, .75, y)
    var newShadowCone = shadowCone.clone()
  	newShadowCone.position.set(x, .75, y)
  	shadowGroup.add(newShadowCone)
    y+=3/cones
  	coneGroup.add(newCone)
  }

/* Sign Spacing */
signSpace(color, group, x)

/* Downstream Taper */

  switch(group) {
    case 1:
      initialX = 10
      break
    case 2:
      initialX = 10.5
      break
    case 3:
      initialX = 11
      break
    case 4:
      initialX = 11.5
      break
    case 5:
      initialX = 12
      break
    case 6:
      initialX = 12.5
      break
    default:
      break
  }
  var downstream = Number(document.getElementById('downstream-'+group).value)
  var x = initialX
  var cones = 2+(downstream/100)
  var spacing = (downstream/50)/cones
  var y = .5
  while ( Math.abs(x) <= ((downstream/50)+initialX) && Math.abs(x) <= 21.5 ) {
  	var newCone = cone.clone()
  	newCone.position.set(x, .75, y)
    var newShadowCone = shadowCone.clone()
  	newShadowCone.position.set(x, .75, y)
  	shadowGroup.add(newShadowCone)
    y+=3/cones
    x += spacing
  	coneGroup.add(newCone)
  }

/* Give Group A Name and Add To Scene */
  coneGroup.name = group
  shadowGroup.name = group
  scene.add(coneGroup)
  scene.add(shadowGroup)


/* Close Sidebar */
  slide('group-'+group)
  flagger(color)

  /* ------ */

}
