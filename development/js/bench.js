function initBench()  {

  var bench = new THREE.Group()
  var benchGeometry = new THREE.Geometry()
  var benchSeat = new THREE.BoxGeometry(2, .1, 1)
  benchGeometry.merge(benchSeat)
  var benchBack = new THREE.BoxGeometry(2, .8, .1)
  benchBack.translate(0, .8, -.55)
  benchGeometry.merge(benchBack)
  benchGeometry.scale(.8, .8, .8)
  var benchCore = new THREE.Mesh(benchGeometry, orange)
	benchCore.castShadow = true
  bench.add(benchCore)
  //metal
  var benchMetal = new THREE.Geometry()
  var metalSide = new THREE.BoxGeometry(.1, 1.8, .1)
  metalSide.translate(-1.05, .4, -.55)
  benchMetal.merge(metalSide)
  metalSide.translate(2.1, 0, 0)
  benchMetal.merge(metalSide)
  var metalSide = new THREE.BoxGeometry(.1, .6, .1)
  metalSide.translate(-1.05, -.25, .55)
  benchMetal.merge(metalSide)
  metalSide.translate(2.1, 0, 0)
  benchMetal.merge(metalSide)
  var metalSide = new THREE.BoxGeometry(.1, .1, 1)
  metalSide.translate(-1.05, 0, 0)
  benchMetal.merge(metalSide)
  metalSide.translate(2.1, 0, 0)
  benchMetal.merge(metalSide)
  var metalSide = new THREE.BoxGeometry(2, .1, .1)
  metalSide.translate(0, 0, .55)
  benchMetal.merge(metalSide)
  metalSide.translate(0, 0, -1.1)
  benchMetal.merge(metalSide)
  metalSide.translate(0, .35, 0)
  benchMetal.merge(metalSide)
  metalSide.translate(0, .9, 0)
  benchMetal.merge(metalSide)
  benchMetal.scale(.8, .8, .8)
  var metal = new THREE.Mesh(benchMetal, gray)
	metal.castShadow = true
  bench.add(metal)
  var benchShadow = new THREE.Geometry()
  var coreBenchShadow = benchGeometry.clone()
  benchShadow.merge(coreBenchShadow)
  var metalBenchShadow = benchMetal.clone()
  benchShadow.merge(metalBenchShadow)
  var shadowBench = new THREE.Mesh(benchShadow, shadows)
  bench.add(shadowBench)

  	var body = new THREE.Geometry()
  		// Arms
    	var rightArm = new THREE.BoxGeometry( .3, .4, .5 )
  		rightArm.translate(.55, .1, .5)
  		rightArm.vertices[4].x+= .1;
  		rightArm.vertices[6].x+= .1;
  		rightArm.vertices[0].x-= .2;
  		rightArm.vertices[2].x-= .2;
  		rightArm.vertices[0].y+= .3;
  		rightArm.vertices[2].y+= .4;
  		rightArm.vertices[4].y+= .3;
  		rightArm.vertices[5].y+= .3;
  		rightArm.vertices[6].y+= .3;
  		rightArm.vertices[7].y+= .4;
  		body.merge(rightArm)
    	var rightArm = new THREE.BoxGeometry( .3, .4, .5 )
  		rightArm.translate(-.55, .1, .5)
  		rightArm.vertices[1].x-= .1;
  		rightArm.vertices[3].x-= .1;
  		rightArm.vertices[5].x+= .2;
  		rightArm.vertices[7].x+= .2;
  		rightArm.vertices[5].y+= .3;
  		rightArm.vertices[7].y+= .4;
  		rightArm.vertices[1].y+= .3;
  		rightArm.vertices[0].y+= .3;
  		rightArm.vertices[3].y+= .3;
  		rightArm.vertices[2].y+= .4;
  		body.merge(rightArm)
  		// Head
    	var head = new THREE.SphereGeometry( .35, 32, 32 )
  		head.translate(0, 1.3, 0)
  		body.merge(head)
    	body.scale(.5, .5, .5)
    	body.translate(0, .56, 0)
    var person = new THREE.Mesh( body, skinTone3 )
    bench.add(person)
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
    	var leftArm = new THREE.BoxGeometry( .3, .5, .5 )
  		leftArm.translate(.55, .55, 0)
  		leftArm.vertices[4].x-= .05;
  		leftArm.vertices[5].x-= .05;
  		leftArm.vertices[0].y-= .5;
  		leftArm.vertices[1].y-= .5;
  		leftArm.vertices[2].y-= .4;
  		leftArm.vertices[3].y-= .4;
  		leftArm.vertices[1].z+= .1;
  		leftArm.vertices[3].z+= .1;
  		torso.merge(leftArm)
    	var rightArm = new THREE.BoxGeometry( .3, .5, .5 )
  		rightArm.translate(-.55, .55, 0)
  		rightArm.vertices[1].x+= .05;
  		rightArm.vertices[0].x+= .05;
  		rightArm.vertices[5].y-= .5;
  		rightArm.vertices[4].y-= .5;
  		rightArm.vertices[7].y-= .4;
  		rightArm.vertices[6].y-= .4;
  		rightArm.vertices[4].z+= .1;
  		rightArm.vertices[6].z+= .1;
  		torso.merge(rightArm)
    	torso.scale(.5, .5, .5)
    	torso.translate(0, .56, 0)
    var Shirt = new THREE.Mesh( torso, gray )
    bench.add(Shirt)
  		// Pants
    	var pant = new THREE.BoxGeometry( .5, .5, .8 )
  		pant.translate(-.25, -.8, 0)
  		pant.vertices[3].z+=.2;
  		pant.vertices[6].z+=.2;
    	var leg = new THREE.BoxGeometry( .5, .5, .8 )
  		leg.translate(-.25, -.8, .8)
  		leg.vertices[0].x-=.1;
  		leg.vertices[2].x-=.1;
  		leg.vertices[5].x+=.1;
  		leg.vertices[7].x+=.1;
  		leg.vertices[0].y-=.2;
  		leg.vertices[5].y-=.2;
  		pant.merge(leg)
    	var leg = new THREE.BoxGeometry( .5, .5, .8 )
  		leg.translate(.25, -.8, 0)
  		leg.vertices[3].z+=.2;
  		leg.vertices[6].z+=.2;
  		pant.merge(leg)
    	var leg = new THREE.BoxGeometry( .5, .5, .8 )
  		leg.translate(.25, -.8, .8)
  		leg.vertices[0].x-=.1;
  		leg.vertices[2].x-=.1;
  		leg.vertices[5].x+=.1;
  		leg.vertices[7].x+=.1;
  		leg.vertices[0].y-=.2;
  		leg.vertices[5].y-=.2;
  		pant.merge(leg)
    	pant.scale(.5, .5, .5)
    	pant.translate(0, .56, 0)
    var Pants = new THREE.Mesh( pant, blue )
    bench.add(Pants)
    //book
    var flap = new THREE.BoxGeometry( .25, .3, .02 )
    flap.translate(-.05, .75, .35)
    flap.rotateY(-.2)
    var flap2 = new THREE.BoxGeometry( .25, .3, .02 )
    flap2.translate(.05, .75, .35)
    flap2.rotateY(.2)
    flap.merge(flap2)
    var cover = new THREE.Mesh( flap, red )
    bench.add(cover)
    var pages = new THREE.BoxGeometry( .25, .3, .05 )
    pages.translate(-.05, .75, .32)
    pages.rotateY(-.2)
    var pages2 = new THREE.BoxGeometry( .25, .3, .05 )
    pages2.translate(.05, .75, .32)
    pages2.rotateY(.2)
    pages.merge(pages2)
    var cover = new THREE.Mesh( pages, offwhite )
    bench.add(cover)

    //Shadows
		var pedestrianShadows = new THREE.Geometry()
		var newBody = body.clone(true)
		pedestrianShadows.merge(newBody)
		var newPages = pages.clone(true)
		pedestrianShadows.merge(newPages)
		var newShirt = torso.clone(true)
    newShirt.scale(1.01, 1.01, 1.01)
		pedestrianShadows.merge(newShirt)
		var newPants = pant.clone(true)
    newPants.scale(1.01, 1.01, 1.01)
		pedestrianShadows.merge(newPants)
		var newCover = flap.clone(true)
		pedestrianShadows.merge(newCover)
    var shadowPerson = new THREE.Mesh(pedestrianShadows, shadows)
    bench.add(shadowPerson)

    // Add to scene
    bench.position.set(0, .95, -7)
    scene.add(bench)
}
