

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
