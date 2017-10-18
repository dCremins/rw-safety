function initWorkers()  {

  var worker = new THREE.Group()
  var worker2 = new THREE.Group()
  var worker3 = new THREE.Group()
  var shadowPerson1 = new THREE.Geometry()
  var shadowPerson2 = new THREE.Geometry()
  var shadowPerson3 = new THREE.Geometry()

  // Person 1
	var body = new THREE.Geometry()
  // Arms
    var rightArm = new THREE.BoxGeometry( 1, .4, .5 )
    rightArm.translate(.85, .6, 0)
    rightArm.vertices[0].y-=.75;
    rightArm.vertices[1].y-=.75;
    rightArm.vertices[2].y-=.5;
    rightArm.vertices[3].y-=.5;
    rightArm.vertices[0].x-=.5;
    rightArm.vertices[1].x-=.5;
    rightArm.vertices[2].x-=.5;
    rightArm.vertices[3].x-=.5;
    rightArm.vertices[0].z-=.15;
    rightArm.vertices[1].z+=.15;
    rightArm.vertices[2].z-=.15;
    rightArm.vertices[3].z+=.15;
  body.merge(rightArm)
    var leftArm = new THREE.BoxGeometry( 1, .4, .5 )
    leftArm.translate(-.85, .6, 0)
    leftArm.vertices[5].y+=.3;
    leftArm.vertices[4].y+=.3
    leftArm.vertices[7].y+=.55;
    leftArm.vertices[6].y+=.55;
    leftArm.vertices[5].x+=.8;
    leftArm.vertices[4].x+=.8;
    leftArm.vertices[7].x+=.8;
    leftArm.vertices[6].x+=.8;
    leftArm.vertices[5].z+=.9;
    leftArm.vertices[4].z+=1.05;
    leftArm.vertices[7].z+=.9;
    leftArm.vertices[6].z+=1.05;
  body.merge(leftArm)
  // Head
    var head = new THREE.SphereGeometry( .35, 32, 32 )
    head.translate(0, 1.3, 0)
  body.merge(head)
  // Mesh
  var person = new THREE.Mesh( body, skinTone2 )
	person.castShadow = true
	person.geometry.scale(.5, .5, .5)
  let shadowBody = body.clone(true)
  shadowPerson1.merge(shadowBody)
  worker.add(person)
  // Clothes
		// Shirt
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
    var shirt1 = new THREE.Mesh( torso, palegray )
  	shirt1.castShadow = true
  	shirt1.geometry.scale(.5, .5, .5)
    let shadowShirt = torso.clone(true)
    shadowPerson1.merge(shadowShirt)
  worker.add(shirt1)
    // Pants
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
    leftLeg.merge(rightLeg)

    var pants1 = new THREE.Mesh( leftLeg, jean )
  	pants1.castShadow = true
  	pants1.geometry.scale(.5, .5, .5)
    let shadowPant = leftLeg.clone(true)
    shadowPerson1.merge(shadowPant)
  worker.add(pants1)

  // Person 2
  var body2 = new THREE.Geometry()
    var rightArm2 = rightArm.clone()
  body2.merge(rightArm2)
    var leftArm2 = new THREE.BoxGeometry( 1, .4, .5 )
    leftArm2.translate(-.85, .6, 0)
    leftArm2.vertices[5].y-=.75;
    leftArm2.vertices[4].y-=.75
    leftArm2.vertices[7].y-=.5;
    leftArm2.vertices[6].y-=.5;
    leftArm2.vertices[5].x+=.5;
    leftArm2.vertices[4].x+=.5;
    leftArm2.vertices[7].x+=.5;
    leftArm2.vertices[6].x+=.5;
    leftArm2.vertices[5].z-=.15;
    leftArm2.vertices[4].z+=.15;
    leftArm2.vertices[7].z-=.15;
    leftArm2.vertices[6].z+=.15;
  body2.merge(leftArm2)
    // Head
    var head2 = new THREE.SphereGeometry( .35, 32, 32 )
    head2.translate(0, 1.3, 0)
  body2.merge(head2)
  var person2 = new THREE.Mesh( body2, skinTone4 )
	person2.castShadow = true
  person2.geometry.scale(.5, .5, .5)
	worker2.add(person2)
  // Clothes
		// Shirt
    var shirt2 = new THREE.Mesh( torso, palegray )
  	shirt2.castShadow = true
    let shadowShirt2 = torso.clone(true)
    shadowPerson2.merge(shadowShirt2)
  worker2.add(shirt2)
    // Pants
    var pants2 = new THREE.Mesh( leftLeg, jean )
  	pants2.castShadow = true
    let shadowPant2 = leftLeg.clone(true)
    shadowPerson2.merge(shadowPant2)
  worker2.add(pants2)

  // Person 3
  var body3 = new THREE.Geometry()
    var rightArm3 = new THREE.BoxGeometry( 1, .4, .5 )
    rightArm3.translate(.85, .6, 0)
    rightArm3.vertices[0].y-=.45;
    rightArm3.vertices[1].y-=.45;
    rightArm3.vertices[2].y-=.2;
    rightArm3.vertices[3].y-=.2;
    rightArm3.vertices[0].x-=.5;
    rightArm3.vertices[1].x-=.5;
    rightArm3.vertices[2].x-=.5;
    rightArm3.vertices[3].x-=.5;
    rightArm3.vertices[0].z+=.45;
    rightArm3.vertices[1].z+=.85;
    rightArm3.vertices[2].z+=.45;
    rightArm3.vertices[3].z+=.85;
  body3.merge(rightArm3)
    var leftArm3 = new THREE.BoxGeometry( 1, .4, .5 )
    leftArm3.translate(-.85, .6, 0)
    leftArm3.vertices[5].y-=.45;
    leftArm3.vertices[4].y-=.45;
    leftArm3.vertices[7].y-=.2;
    leftArm3.vertices[6].y-=.2;
    leftArm3.vertices[5].x+=.5;
    leftArm3.vertices[4].x+=.5;
    leftArm3.vertices[7].x+=.5;
    leftArm3.vertices[6].x+=.5;
    leftArm3.vertices[5].z+=.45;
    leftArm3.vertices[4].z+=.85;
    leftArm3.vertices[7].z+=.45;
    leftArm3.vertices[6].z+=.85;
  body3.merge(leftArm3)
    //Head
    var head3 = new THREE.SphereGeometry( .35, 32, 32 )
    head3.translate(0, 1.3, 0)
  body3.merge(head3)
  var person3 = new THREE.Mesh( body3, skinTone1 )
	person3.castShadow = true
  person3.geometry.scale(.5, .5, .5)
	worker3.add(person3)
  // Clothes
		// Shirt
    var shirt3 = new THREE.Mesh( torso, palegray )
  	shirt3.castShadow = true
    let shadowShirt3 = torso.clone(true)
    shadowPerson3.merge(shadowShirt3)
  worker3.add(shirt3)
    // Pants
    var pants3 = new THREE.Mesh( leftLeg, jean )
  	pants3.castShadow = true
    let shadowPant3 = leftLeg.clone(true)
    shadowPerson3.merge(shadowPant3)
  worker3.add(pants3)

// hat
  var hat = new THREE.Geometry()
  var dome = new THREE.SphereGeometry(.2, 32, 32, 1, 6.3, 0, 1.5)
  dome.translate(0, .7, 0)
  hat.merge(dome)
  var brim = new THREE.CylinderGeometry(.2, .2, .02, 32)
  brim.translate(0, .72, .1)
  hat.merge(brim)
  var constHat = new THREE.Mesh(hat, truckMaterial)
	constHat.castShadow = true
  var hat2 = constHat.clone()
  var hat3 = constHat.clone()
// vest
  var vestGeometry = new THREE.Geometry()
  var left = new THREE.BoxGeometry( .2, .5, .4 )
  left.translate(-.13, .17, 0)
  left.vertices[0].z-=.05;
  left.vertices[1].z+=.05;
  left.vertices[4].z+=.05;
  left.vertices[4].x+=.05;
  left.vertices[5].z-=.05;
  left.vertices[5].x+=.05;
  vestGeometry.merge(left)
  var right = new THREE.BoxGeometry( .2, .5, .4 )
  right.translate(.13, .17, 0)
  right.vertices[5].z-=.05;
  right.vertices[4].z+=.05;
  right.vertices[1].z+=.05;
  right.vertices[1].x-=.05;
  right.vertices[0].z-=.05;
  right.vertices[0].x-=.05;
  vestGeometry.merge(right)
  var back = new THREE.BoxGeometry( .2, .5, .025 )
  back.translate(0, .17, -.1875)
  back.vertices[0].z+=.05;
  back.vertices[1].z+=.05;
  back.vertices[4].z+=.05;
  back.vertices[5].z+=.05;
  vestGeometry.merge(back)
  var vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.castShadow = true
	// Stripes
	var vestStripes = new THREE.Geometry()
  var stripeFront = new THREE.BoxGeometry( .05, .5, .001 )
  stripeFront.translate(-.11, .17, .201)
  stripeFront.vertices[0].z-=.05;
  stripeFront.vertices[1].z-=.05;
  stripeFront.vertices[4].z-=.05;
  stripeFront.vertices[5].z-=.05;
  vestStripes.merge(stripeFront)
  stripeFront.translate(.22, 0, 0)
  vestStripes.merge(stripeFront)
  var stripeBack = new THREE.BoxGeometry( .05, .5, .001 )
  stripeBack.translate(-.11, .17, -.201)
  stripeBack.vertices[0].z+=.05;
  stripeBack.vertices[1].z+=.05;
  stripeBack.vertices[4].z+=.05;
  stripeBack.vertices[5].z+=.05;
  vestStripes.merge(stripeBack)
  stripeBack.translate(.22, 0, 0)
  vestStripes.merge(stripeBack)
  var stripeTop = new THREE.BoxGeometry( .05, .001, .3 )
  stripeTop.translate(-.11, .42, 0)
  vestStripes.merge(stripeTop)
  stripeTop.translate(.22, 0, 0)
  vestStripes.merge(stripeTop)
  var stripeBottom1 = new THREE.BoxGeometry( .2, .2, .001 )
  stripeBottom1.translate(-.13, .02, .201)
  stripeBottom1.vertices[4].x+=.02;
  stripeBottom1.vertices[5].x+=.02;
  stripeBottom1.vertices[0].z-=.02;
  stripeBottom1.vertices[1].z-=.02;
  stripeBottom1.vertices[4].z-=.02;
  stripeBottom1.vertices[5].z-=.02;
  vestStripes.merge(stripeBottom1)
  var stripeBottom2 = new THREE.BoxGeometry( .2, .2, .001 )
  stripeBottom2.translate(.13, .02, .201)
  stripeBottom2.vertices[0].x-=.02;
  stripeBottom2.vertices[1].x-=.02;
  stripeBottom2.vertices[0].z-=.02;
  stripeBottom2.vertices[1].z-=.02;
  stripeBottom2.vertices[4].z-=.02;
  stripeBottom2.vertices[5].z-=.02;
  vestStripes.merge(stripeBottom2)
  var stripeBottom3 = new THREE.BoxGeometry( .001, .2, .4 )
  stripeBottom3.translate(-.23, .02, 0)
  stripeBottom3.vertices[0].x+=.02;
  stripeBottom3.vertices[1].x+=.02;
  stripeBottom3.vertices[4].x+=.02;
  stripeBottom3.vertices[5].x+=.02;
  stripeBottom3.vertices[0].z-=.02;
  stripeBottom3.vertices[1].z+=.02;
  stripeBottom3.vertices[4].z+=.02;
  stripeBottom3.vertices[5].z-=.02;
  vestStripes.merge(stripeBottom3)
  var stripeBottom4 = new THREE.BoxGeometry( .001, .2, .4 )
  stripeBottom4.translate(.23, .02, 0)
  stripeBottom4.vertices[0].x-=.02;
  stripeBottom4.vertices[1].x-=.02;
  stripeBottom4.vertices[4].x-=.02;
  stripeBottom4.vertices[5].x-=.02;
  stripeBottom4.vertices[0].z-=.02;
  stripeBottom4.vertices[1].z+=.02;
  stripeBottom4.vertices[4].z+=.02;
  stripeBottom4.vertices[5].z-=.02;
  vestStripes.merge(stripeBottom4)
  var stripeBottom5 = new THREE.BoxGeometry( .45, .2, .001 )
  stripeBottom5.translate(0, .02, -.201)
  stripeBottom5.vertices[0].x-=.02;
  stripeBottom5.vertices[1].x-=.02;
  stripeBottom5.vertices[4].x+=.02;
  stripeBottom5.vertices[5].x+=.02;
  stripeBottom5.vertices[0].z+=.02;
  stripeBottom5.vertices[1].z+=.02;
  stripeBottom5.vertices[4].z+=.02;
  stripeBottom5.vertices[5].z+=.02;
  vestStripes.merge(stripeBottom5)
  var stripes = new THREE.Mesh(vestStripes, yellow)
  var vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.add(stripes)
  var vest2 = vest.clone()
  var vest3 = vest.clone()

  //paper
  var paper = new THREE.BoxGeometry( .8, .6, .025 )
  paper.translate(0, .3, .25)
  paper.rotateX(.4)
  var sheet = new THREE.Mesh(paper, white)
	sheet.castShadow = true

  worker.add(constHat)
  worker.add(vest)
  var shadow1 = new THREE.Mesh(shadowPerson1, shadows)
  worker.add(shadow1)

	//worker.position.set(0, 1.2, 0)
	worker.position.set(2.7, 1.2, 6.5)
  worker.rotation.y -= 1
  scene.add(worker)

	worker2.add(hat2)
	worker2.add(vest2)
  //var shadow2 = new THREE.Mesh(shadowPerson2, shadows)
  //worker2.add(shadow2)
  worker2.position.set(5.6, 1.2, 6.3)
  worker2.rotation.y += .8
  scene.add(worker2)

	worker3.add(hat3)
	worker3.add(vest3)
  worker3.add(sheet)
  //var shadow3 = new THREE.Mesh(shadowPerson3, shadows)
  //worker3.add(shadow3)
  worker3.position.set(7, 1.2, 6.4)
  worker3.rotation.y -= .6
  scene.add(worker3)
}
