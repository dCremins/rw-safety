var showing = 'none'

function slide(id) {
  switch(showing) {
    case id:
      document.getElementById(id).removeAttribute("style")
      document.getElementsByClassName(id)[0].removeAttribute("style")
      break
    case 'group-1':
      document.getElementById('group-1').removeAttribute("style")
      document.getElementsByClassName('group-1')[0].removeAttribute("style")
      break
    case 'group-2':
      document.getElementById('group-2').removeAttribute("style")
      document.getElementsByClassName('group-2')[0].removeAttribute("style")
      break
    case 'group-3':
      document.getElementById('group-3').removeAttribute("style")
      document.getElementsByClassName('group-3')[0].removeAttribute("style")
      break
    case 'group-4':
      document.getElementById('group-4').removeAttribute("style")
      document.getElementsByClassName('group-4')[0].removeAttribute("style")
      break
    case 'group-5':
      document.getElementById('group-5').removeAttribute("style")
      document.getElementsByClassName('group-5')[0].removeAttribute("style")
      break
    case 'group-6':
      document.getElementById('group-6').removeAttribute("style")
      document.getElementsByClassName('group-6')[0].removeAttribute("style")
      break
    default:
      break
  }
  if (showing !== id) {
    document.getElementsByClassName(id)[0].style.backgroundColor = "#666"
    document.getElementById(id).style.width = "300px"
    showing = id
  } else {
    showing = 'none'
  }
}

function onDocumentMouseMove( event ) {
	event.preventDefault()
	var rect = renderer.domElement.getBoundingClientRect()
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
	raycaster.setFromCamera( mouse, camera )
	if ( selected ) {
			if ( raycaster.intersectObjects( objects ) ) {
				selected.position.set(0, 1, 0)
				selected.position.set( raycaster.intersectObjects( objects )[0].point.x, selected.position.y, raycaster.intersectObjects( objects )[0].point.z );
			}
		}
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( flaggers );
		if ( intersects.length > 0 ) {
			var object = intersects[ 0 ].object;
			if ( hovered !== object ) {
				renderer.domElement.style.cursor = 'pointer';
				hovered = object;
			}
		} else {
			if ( hovered !== null ) {
				renderer.domElement.style.cursor = 'auto';
				hovered = null;
			}
		}
}

function onDocumentTouchMove( event ) {
	event.preventDefault()
  event = event.changedTouches[ 0 ]
	var rect = renderer.domElement.getBoundingClientRect()
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
	raycaster.setFromCamera( mouse, camera )
	if ( selected ) {
		if ( raycaster.intersectObjects( objects ) ) {
			selected.position.set(0, 1, 0)
			selected.position.set( raycaster.intersectObjects( objects )[0].point.x, selected.position.y, raycaster.intersectObjects( objects )[0].point.z );
		}
	}
}

function onDocumentMouseDown( event ) {
	controls.enabled = false
	event.preventDefault();
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( flaggers );
	if ( intersects.length > 0 ) {
		selected = intersects[ 0 ].object;
		if ( raycaster.intersectObjects( objects ) ) {
			offset.copy( intersection ).sub( selected.position );
		}
		renderer.domElement.style.cursor = 'move';
	}
}

function onDocumentTouchStart( event ) {
	controls.enabled = false
	event.preventDefault()
  event = event.changedTouches[ 0 ]
	var rect = renderer.domElement.getBoundingClientRect()
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( flaggers )
	if ( intersects.length > 0 ) {
		selected = intersects[ 0 ].object;
		if ( raycaster.intersectObjects( objects ) ) {
			offset.copy( intersection ).sub( selected.position );
		}
		renderer.domElement.style.cursor = 'move';
	}
}

function onDocumentMouseCancel( event ) {
	controls.enabled = true
	event.preventDefault();
	if ( selected ) {
		selected = null;
	}
	renderer.domElement.style.cursor = 'auto';
}

function onDocumentTouchEnd( event ) {
  controls.enabled = true
  event.preventDefault();
  if ( selected ) {
    selected = null;
  }
  renderer.domElement.style.cursor = 'auto';
}



function flagger(color) {
	var body = new THREE.Geometry()
		// Torso
  	var torso = new THREE.BoxGeometry( 1, 1.4, .8 )
		torso.translate(0, .1, 0)
		torso.vertices[0].z-=.15;
		torso.vertices[0].x-=.15;
		torso.vertices[1].z+=.15;
		torso.vertices[1].x-=.15;
		torso.vertices[4].z+=.15;
		torso.vertices[4].x+=.15;
		torso.vertices[5].z-=.15;
		torso.vertices[5].x+=.15;
		body.merge(torso)
		// Legs
  	var leftLeg = new THREE.BoxGeometry( .5, .8, .8 )
		leftLeg.translate(-.25, -1, 0)
		leftLeg.vertices[0].x-=.1;
		leftLeg.vertices[1].x-=.1;
		leftLeg.vertices[2].x-=.3;
		leftLeg.vertices[2].z-=.3;
		leftLeg.vertices[3].x-=.3;
		leftLeg.vertices[3].z+=.3;
		leftLeg.vertices[6].z+=.3;
		leftLeg.vertices[7].z-=.3;
		body.merge(leftLeg)
  	var rightLeg = new THREE.BoxGeometry( .5, .8, .8 )
		rightLeg.translate(.25, -1, 0)
		rightLeg.vertices[4].x+=.1;
		rightLeg.vertices[5].x+=.1;
		rightLeg.vertices[2].z-=.3;
		rightLeg.vertices[3].z+=.3;
		rightLeg.vertices[6].x+=.3;
		rightLeg.vertices[6].z+=.3;
		rightLeg.vertices[7].x+=.3;
		rightLeg.vertices[7].z-=.3;
		body.merge(rightLeg)
		// Arms
  	var rightArm1 = new THREE.BoxGeometry( .5, .4, .5 )
		rightArm1.translate(.64, .6, 0)
		rightArm1.vertices[0].y -= .1;
		rightArm1.vertices[0].z += .1;
		rightArm1.vertices[0].x -= .2;

		rightArm1.vertices[1].y -= .08;
		rightArm1.vertices[1].z += .3;
		rightArm1.vertices[1].x -= .1;

		rightArm1.vertices[2].z += .1;
		rightArm1.vertices[2].x -= .05;
		rightArm1.vertices[2].y += .1;

		rightArm1.vertices[3].y += .2;
		rightArm1.vertices[3].z += .4;
		rightArm1.vertices[3].x += .2;

		rightArm1.vertices[4].x -= .04;
		rightArm1.vertices[5].x -= .04;
		body.merge(rightArm1)
  	var rightArm2 = new THREE.BoxGeometry( .5, .3, .3 )
		rightArm2.translate(1.14, .6, .3)
		rightArm2.vertices[0].y+=.25;
		rightArm2.vertices[0].z-=.1;
		rightArm2.vertices[0].x-=.65;

		rightArm2.vertices[1].y+=.25;
		rightArm2.vertices[1].z+=.05;
		rightArm2.vertices[1].x-=.5;

		rightArm2.vertices[2].y+=.55;
		rightArm2.vertices[2].z-=.05;
		rightArm2.vertices[2].x-=.55;

		rightArm2.vertices[3].y+=.55;
		rightArm2.vertices[3].z+=.1;
		rightArm2.vertices[3].x-=.4;

		rightArm2.vertices[4].x-=.1;
		rightArm2.vertices[4].z-=.1;
		rightArm2.vertices[4].y-=.03;

		rightArm2.vertices[5].y-=.05;
		rightArm2.vertices[5].z-=.1;
		rightArm2.vertices[5].x-=.2;

		rightArm2.vertices[6].x+=.2;
		rightArm2.vertices[6].y+=.15;
		rightArm2.vertices[6].z+=.0;

		rightArm2.vertices[7].x-=.05;
		rightArm2.vertices[7].z-=.1;
		rightArm2.vertices[7].y+=.05;
		body.merge(rightArm2)
  	var leftArm = new THREE.BoxGeometry( 1, .4, .5 )
		leftArm.translate(-.85, .6, 0)
		leftArm.vertices[5].y-=.8;
		leftArm.vertices[5].z-=.1;
		leftArm.vertices[4].y-=.8;
		leftArm.vertices[4].z+=.1;
		leftArm.vertices[7].y-=.5;
		leftArm.vertices[7].z-=.1;
		leftArm.vertices[6].y-=.5;
		leftArm.vertices[6].z+=.1;
		leftArm.vertices[3].x-=.04;
		leftArm.vertices[2].x-=.04;
		body.merge(leftArm)
		// Head
  	var head = new THREE.SphereGeometry( .35, 32, 32 )
		head.translate(0, 1.3, 0)
		body.merge(head)
		// Flag
		var object = new THREE.Geometry();
		object.vertices.push( new THREE.Vector3( 0, .15, 0))
		  for (var i = 0; i <= 7; i++) {
		    var angle = (i * 2 * Math.PI / 8)
		    object.vertices.push( new THREE.Vector3( .6 * Math.sin(angle),  .15, .6 * Math.cos(angle)))
		  }
			object.vertices.push( new THREE.Vector3( 0, 0, 0))
		  for (var i = 7; i >= 0; i--) {
		    var angle = (i * 2 * Math.PI / 8)
		    object.vertices.push( new THREE.Vector3(.6 * Math.sin(angle) , 0, .6 * Math.cos(angle)))
		  }
		  object.faces.push( new THREE.Face3( 0, 1, 2) )
		  object.faces.push( new THREE.Face3( 0, 2, 3) )
		  object.faces.push( new THREE.Face3( 0, 3, 4) )
		  object.faces.push( new THREE.Face3( 0, 4, 5) )
		  object.faces.push( new THREE.Face3( 0, 5, 6) )
		  object.faces.push( new THREE.Face3( 0, 6, 7) )
		  object.faces.push( new THREE.Face3( 0, 7, 8) )
		  object.faces.push( new THREE.Face3( 0, 8, 1) )
		  object.faces.push( new THREE.Face3( 9, 10, 11) )
		  object.faces.push( new THREE.Face3( 9, 11, 12) )
		  object.faces.push( new THREE.Face3( 9, 12, 13) )
		  object.faces.push( new THREE.Face3( 9, 13, 14) )
		  object.faces.push( new THREE.Face3( 9, 14, 15) )
		  object.faces.push( new THREE.Face3( 9, 15, 16) )
		  object.faces.push( new THREE.Face3( 9, 16, 17) )
		  object.faces.push( new THREE.Face3( 9, 17, 10) )
		  object.faces.push( new THREE.Face3( 5, 4, 14 ) )
		  object.faces.push( new THREE.Face3( 14, 13, 5 ) )
		  object.faces.push( new THREE.Face3( 4, 3, 15 ) )
		  object.faces.push( new THREE.Face3( 15, 14, 4 ) )
		  object.faces.push( new THREE.Face3( 3, 2, 16 ) )
		  object.faces.push( new THREE.Face3( 16, 15, 3 ) )
		  object.faces.push( new THREE.Face3( 2, 1, 17 ) )
		  object.faces.push( new THREE.Face3( 17, 16, 2 ) )
		  object.faces.push( new THREE.Face3( 1, 8, 10 ) )
		  object.faces.push( new THREE.Face3( 10, 17, 1 ) )
		  object.faces.push( new THREE.Face3( 8, 7, 11 ) )
		  object.faces.push( new THREE.Face3( 11, 10, 8 ) )
		  object.faces.push( new THREE.Face3( 7, 6, 12 ) )
		  object.faces.push( new THREE.Face3( 12, 11, 7 ) )
		  object.faces.push( new THREE.Face3( 6, 5, 13 ) )
		  object.faces.push( new THREE.Face3( 13, 12, 6 ) )
		  object.computeFaceNormals();
			sign = new THREE.Mesh( object, safetyOrange )
			sign.position.set(-.68, .9, .02)
			sign.rotation.x += .4
			sign.rotation.y += .6
			sign.rotation.z += 1.35
			sign.geometry.scale(.5, .5, .5)
			scene.add(sign)
	  	var stickG = new THREE.CylinderGeometry( .05, .05, 2.4, 32 )
			stick = new THREE.Mesh( stickG, gray )
			stick.position.set(-.7, .05, .02)
			stick.geometry.scale(.5, .5, .5)
			scene.add(stick)

    	var person = new THREE.Mesh( body, color )
    	person.position.set(0, 1.2, -1)
    	person.rotation.y -= 1
    	person.geometry.scale(.5, .5, .5)
    	person.add(sign)
    	person.add(stick)

			var shadowPersonGeometry = new THREE.Geometry()
			shadowPersonClone = body.clone()
			shadowPersonGeometry.merge(shadowPersonClone)
			stickClone = stickG.clone()
			stickClone.translate(-.7, .05, .02)
			shadowPersonGeometry.merge(stickClone)
    	var shadowPerson = new THREE.Mesh( shadowPersonGeometry, shadows )
    	//shadowPerson.position.set(0, 1.2, -1)
    	//shadowPerson.rotation.y -= 1
			shadowPerson.receiveShadow = true
			signClone = new THREE.Mesh( object, shadows )
			signClone.position.set(-.68, .9, .02)
			signClone.rotation.x += .4
			signClone.rotation.y += .6
			signClone.rotation.z += 1.35
			shadowPerson.add(signClone)
			person.add(shadowPerson)


	scene.add(person)
  flaggers.push(person)

  var person2 = person.clone(true)
  person2.position.set(1, 1.2, -1)
  scene.add(person2)
  flaggers.push(person2)
}

var signs = [[], [], [], [], [], [], []]

function signArray(group, checkbox) {
  var idx = signs[group].indexOf(checkbox.value);

    if (idx !== -1) {         // if already in array
    	signs[group].splice(idx, 1); // make sure we remove it
    }

    if (checkbox.checked) {    // if checked
    	signs[group].unshift(checkbox.value);  // add to end of array
    }
}

function signSpace(color, group, start) {
    var signGrouped = new THREE.Group()
    var spacing = Number(document.getElementById('sign-'+group).value)/200

    // Get Signs

    var signImages = signs[group]
    var pos = start-spacing
    for (var i = 0; i < signImages.length && pos >= -22; i++) {
      // Image

    	var signBase = new THREE.CylinderGeometry(.8, .8, .1, 4)
    	signBase.rotateX(1.5)
    	signBase.rotateZ(1.6)

      switch (signImages[i]) {
        case 'worker':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, workerSignMaterial, safetyOrange])
          break
        case 'flagger':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, flaggerSignMaterial, safetyOrange])
          break
        case 'fAhead':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, flagAheadSignMaterial, safetyOrange])
          break
        case 'men':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, menWorkSignMaterial, safetyOrange])
          break
        case 'stop':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, prepareStopSignMaterial, safetyOrange])
          break
        case 'lane':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, oneLaneSignMaterial, safetyOrange])
          break
        default:
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, workAheadSignMaterial, safetyOrange])
          break
      }

    	sign1.position.set(pos, 3, (4+(group*.5)))
    	signGrouped.add(sign1)

      // Group Color Backing

    	var signColor = new THREE.CylinderGeometry(1, 1, .1, 4)
    	signColor.rotateX(1.5)
    	signColor.rotateZ(1.6)
    	var signColorBack = new THREE.Mesh(signColor, color)
    	signColorBack.position.set((pos+.01), 3, (4+(group*.5)))
    	signGrouped.add(signColorBack)

      // Stick

      var stick = new THREE.CylinderGeometry(.05, .05, 2, 32)
    	var signStick = new THREE.Mesh(stick, color)
    	signStick.position.set((pos+.01), 1.2, (4+(group*.5)))
    	signGrouped.add(signStick)
console.log((4+(group/.5)))
      // Position and Add to Scene
      pos -= 2
    }

    signGrouped.name = 'signGroup-'+group
    scene.add(signGrouped)
}

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

//# sourceMappingURL=maps/utilities.js.map
