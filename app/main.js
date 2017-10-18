/* Variables */
var scene, camera, controls, renderer, ambient, sun, raycaster
var objects = []
var flaggers = []

raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var offset = new THREE.Vector3()
var intersection = new THREE.Vector3()
var selected = null, hovered = null
// Scenery
var road = new THREE.MeshLambertMaterial({ color: 0x87836E })
var lines = new THREE.LineBasicMaterial({ color: 0xFFFFFF })
var divider = new THREE.MeshLambertMaterial({ color: 0xFFFF86 })
var grass = new THREE.MeshLambertMaterial({ color: 0x77c997 })
var treeTall = new THREE.MeshLambertMaterial({ color: 0x62c192})
var treeShort = new THREE.MeshLambertMaterial({ color: 0x78c9a1 })
var shadows = new THREE.ShadowMaterial({ opacity: .3  })
var windowColor = new THREE.MeshLambertMaterial({ color: 0xD0DDE3, transparent: true, opacity: .5 })
var indoorColor = new THREE.MeshBasicMaterial({ color: 0xD0DDE3})
var brick = new THREE.MeshLambertMaterial({ color: 0xaa5050 })
var stone = new THREE.MeshLambertMaterial({ color: 0xe5d2a9 })
var truckMaterial = new THREE.MeshLambertMaterial({ color: 0xef8547 })
var foundation = new THREE.MeshLambertMaterial({ color: 0xF4EEEF })
var awningRed = new THREE.MeshLambertMaterial({ color: 0xbad3d8 })
var molding = new THREE.MeshLambertMaterial({ color: 0xbad3d8 })
var couchFabric = new THREE.MeshLambertMaterial({ color: 0x638464 })
var blueFabric = new THREE.MeshLambertMaterial({ color: 0x5e7e9b })
var purpleFabric = new THREE.MeshLambertMaterial({ color: 0x805c8e})
var tanFabric = new THREE.MeshLambertMaterial({ color: 0xe8c1a0 })
// Skin
var skinTone1 = new THREE.MeshLambertMaterial({ color: 0x8d5524 }) // Brown
var skinTone2 = new THREE.MeshLambertMaterial({ color: 0xc68642 }) // Light Brown
var skinTone3 = new THREE.MeshLambertMaterial({ color: 0xf1c27d }) // Tan
var skinTone4 = new THREE.MeshLambertMaterial({ color: 0xffdbac }) // Pale

// Colors
var red = new THREE.MeshLambertMaterial({ color: 0xF87676})
var green = new THREE.MeshLambertMaterial({ color: 0x78C789 })
var blue = new THREE.MeshLambertMaterial({ color: 0x22B8E2 })
var orange = new THREE.MeshLambertMaterial({ color: 0xF6B331 })
var safetyOrange = new THREE.MeshLambertMaterial({ color: 0xFF7900})
var yellow = new THREE.MeshLambertMaterial({ color: 0xFDDB4C })
var purple = new THREE.MeshLambertMaterial({ color: 0xB78DD1 })
var white = new THREE.MeshLambertMaterial({ color: 0xffffff })
var offwhite = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 })
var gray = new THREE.MeshLambertMaterial({ color: 0x555555 })
var palegray = new THREE.MeshLambertMaterial({ color: 0xa5a5a5 })
var jean = new THREE.MeshLambertMaterial({ color: 0x416bad })
// Signs
var workerSign = new THREE.TextureLoader().load( "includes/images/sign-01.png" )
var workerSignMaterial = new THREE.MeshBasicMaterial( { map: workerSign } )
var flaggerSign = new THREE.TextureLoader().load( "includes/images/sign-02.png" )
var flaggerSignMaterial = new THREE.MeshBasicMaterial( { map: flaggerSign } )
var flagAheadSign = new THREE.TextureLoader().load( "includes/images/sign-03.png" )
var flagAheadSignMaterial = new THREE.MeshBasicMaterial( { map: flagAheadSign } )
var menWorkSign = new THREE.TextureLoader().load( "includes/images/sign-04.png" )
var menWorkSignMaterial = new THREE.MeshBasicMaterial( { map: menWorkSign } )
var prepareStopSign = new THREE.TextureLoader().load( "includes/images/sign-05.png" )
var prepareStopSignMaterial = new THREE.MeshBasicMaterial( { map: prepareStopSign } )
var oneLaneSign = new THREE.TextureLoader().load( "includes/images/sign-06.png" )
var oneLaneSignMaterial = new THREE.MeshBasicMaterial( { map: oneLaneSign } )
var workAheadSign = new THREE.TextureLoader().load( "includes/images/sign-07.png" )
var workAheadSignMaterial = new THREE.MeshBasicMaterial( { map: workAheadSign } )
// Geometry
var tallTree = new THREE.Geometry()
var tallCone = new THREE.ConeGeometry( 1.68, 4, 32 )
tallCone.translate(0, 1.35, 0)
tallTree.merge(tallCone)
var tallSphere = new THREE.SphereGeometry( 1.8, 60, 60)
tallSphere.translate(0, -1.3, 0)
tallTree.merge(tallSphere)
var shortTree = tallTree.clone()
shortTree.scale(.5, .5, .5)
/* Cone */
var coreGeometry = new THREE.CylinderGeometry(.07, .2, .5, 32, .8, false, .8)
var coneBottomG = new THREE.BoxGeometry( .5, .06, .5 )
coneBottomG.translate(0, -.23, 0)
var coneGeometry = new THREE.Geometry()
coneGeometry.merge(coreGeometry)
coneGeometry.merge(coneBottomG)
var stripeGeometry = new THREE.CylinderGeometry(.116, .155, .15, 32, 1, false, .8)
var stripe = new THREE.Mesh( stripeGeometry, white )

function init() {
	scene = new THREE.Scene()
	// Scenery
	initRoad()
	initTrees()
	initShop()
	initApartment()
	initBench()
	//initBackHoe()
	initTruck()
	initWorkers()
	// Mechanics
	initCamera()
	initLights()
	initRender()
  return
}

function initCamera() {
	camera = new THREE.PerspectiveCamera( 60, ((window.innerWidth-100) / (window.innerHeight-50)), 1, 100 )
	camera.position.set(0, 23, 20)
	camera.lookAt( 0, 0, 0 )
}

function initLights() {
		ambient = new THREE.HemisphereLight(0xdeeef2,0x665c6d, 1.2)
		sun = new THREE.SpotLight(0xfcdc74, .2)
		sun.position.set(-50, 40, -5)
		sun.castShadow = true
		sun.shadow.camera.left = -10
		sun.shadow.camera.right = 10
		sun.shadow.camera.top = 10
		sun.shadow.camera.bottom = -10
		sun.shadow.camera.near = .1
		sun.shadow.camera.far = 1000
		sun.shadow.mapSize.width = 2048
		sun.shadow.mapSize.height = 2048
		scene.add(ambient)
		scene.add(sun)
}

function initRender() {
	renderer = new THREE.WebGLRenderer({antialias: true})
	renderer.setSize( window.innerWidth-100, (window.innerHeight-55) )
	renderer.setClearColor( 0xffffff, 1 )
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	var container = document.getElementById('container')
	container.appendChild( renderer.domElement )
	controls = new THREE.OrbitControls( camera, renderer.domElement )
/*
	container.addEventListener( 'mousemove', onDocumentMouseMove, false )
	container.addEventListener( 'mouseup', onDocumentMouseCancel, false )
	container.addEventListener( 'mousedown', onDocumentMouseDown, false )
	container.addEventListener( 'touchmove', onDocumentTouchMove, false )
	container.addEventListener( 'touchstart', onDocumentTouchStart, false )
	container.addEventListener( 'touchend', onDocumentTouchEnd, false )
*/
}

function initRoad()  {

	let topGeometry = new THREE.BoxGeometry( 45, 1, 10 )
	let grassTop = new THREE.Mesh( topGeometry, grass )
	grassTop.position.set(0, 0, -9)
	scene.add( grassTop )

	let roadGeometry = new THREE.BoxGeometry( 45, 1, 8 )
	let roadMesh = new THREE.Mesh( roadGeometry, road )
	roadMesh.position.set(0, 0, 0)
	scene.add( roadMesh )

	let lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, .51, -3.7),
		new THREE.Vector3(22.5, .51, -3.7)
	)
	let topLine = new THREE.Line(lineGeometry, lines)
	scene.add(topLine)

	lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, .51, 3.7),
		new THREE.Vector3(22.5, .51, 3.7)
	)
	let bottomLine = new THREE.Line(lineGeometry, lines)
	scene.add(bottomLine)

	let bottomGeometry = new THREE.BoxGeometry( 45, 1, 7 )
	let grassBottom = new THREE.Mesh( bottomGeometry, grass )
	grassBottom.position.set(0, 0, 7.5)
	scene.add( grassBottom )

	let dividerGeometry = new THREE.BoxGeometry( 1, .1, .2 )
	let yellowLines = new THREE.Mesh( dividerGeometry, divider )
	yellowLines.position.set(0, .5, 0)
	scene.add( yellowLines )
	for (let i = 22; i>-23; i-=2) {
		let newyellowLines = yellowLines.clone()
		newyellowLines.position.set(i, .5, 0)
		scene.add( newyellowLines )
	}
  let shadowGeometry = new THREE.BoxGeometry( 45, 1, 25 )
  let floorShadows = new THREE.Mesh( shadowGeometry, shadows )
  floorShadows.position.set(0, .05, -1.5)
  //floorShadows.rotateX(-1.572)
  floorShadows.receiveShadow = true
  scene.add( floorShadows )
  objects.push(floorShadows)

  let coneCore = new THREE.Mesh( coneGeometry, gray )
	//coneCore.receiveShadow = true
	coneCore.castShadow = true
	let cone = new THREE.Group()
	cone.add(coneCore)
	cone.add(stripe)
	cone.position.set(0, .75, .5)
	scene.add(cone)
	for (let i = 1.5; i<10; i+=1.5) {
		let newCone = cone.clone()
		newCone.position.set(i, .75, .5)
		scene.add(newCone)
	}
}

function initTrees() {
	// Geometry
	var trees = new THREE.Geometry()
	var tallTree = new THREE.Geometry()
	var tallCone = new THREE.ConeGeometry( 1.68, 4, 32 )
	tallCone.translate(0, 1.35, 0)
	tallTree.merge(tallCone)
	var tallSphere = new THREE.SphereGeometry( 1.8, 60, 60)
	tallSphere.translate(0, -1.3, 0)
	tallTree.merge(tallSphere)

	tallTree.translate(-18, 3, -10.5)
	trees.merge(tallTree)
	tallTree.translate(7, 0, 18.5)
	trees.merge(tallTree)

	var shortTree = tallTree.clone()
	shortTree.scale(.5, .5, .5)
	shortTree.translate(0, .2, -12)
	trees.merge(shortTree)
	shortTree.translate(17.5, 0, 14)
	trees.merge(shortTree)
	shortTree.translate(4.5, 0, -16.5)
	trees.merge(shortTree)

	var allTrees = new THREE.Mesh(trees, treeTall)
	allTrees.castShadow = true
	scene.add( allTrees )
	var treeShadows = new THREE.Mesh(trees, shadows)
	treeShadows.receiveShadow = true
	scene.add( treeShadows )
}

function initShop()  {

  var shop = new THREE.Group()
  var shopBase = new THREE.Geometry()
  var shopShadowGeometry = new THREE.Geometry()

// Foundation
  var bottom = new THREE.BoxGeometry(10, 1, 5)
  shopBase.merge(bottom)
  var bottomStair = new THREE.BoxGeometry(2, .5, .5)
  bottomStair.translate(0, .25, 2.75)
  shopBase.merge(bottomStair)
  var topStair = new THREE.BoxGeometry(2, .5, 1)
  topStair.translate(0, -.25, 3)
  shopBase.merge(topStair)
  var shopBaseShadow = shopBase.clone()
  shopShadowGeometry.merge(shopBaseShadow)
  var building = new THREE.Mesh(shopBase, foundation)
	building.castShadow = true
  shop.add(building)

// Building
  var glass = new THREE.BoxGeometry(9.75, 4.9, .125)
  glass.translate(0, 3, 2.4)
  var windows = new THREE.Mesh(glass, windowColor)
  shop.add(windows)

  var shopCore = new THREE.Geometry()
  var bottomFront = new THREE.BoxGeometry(4, 1, .75)
  bottomFront.translate(-3, 1, 2.125)
  shopCore.merge(bottomFront)
  bottomFront.translate(6, 0, 0)
  shopCore.merge(bottomFront)
  var topFront = new THREE.BoxGeometry(10, 2, .75)
  topFront.translate(0, 5, 2.12)
  shopCore.merge(topFront)
  var sides = new THREE.BoxGeometry(1, 5.5, 3.25)
  sides.translate(-4.5, 3.25, .126)
  shopCore.merge(sides)
  sides.translate(9, 0, 0)
  shopCore.merge(sides)
  var inner = new THREE.BoxGeometry(1, 2.5, .5)
  inner.translate(-1.5, 2.75, 2.25)
  shopCore.merge(inner)
  inner.translate(3, 0, 0)
  shopCore.merge(inner)
  var center = new THREE.BoxGeometry(10, 5.5, 1)
  center.translate(0, 3.25, -2)
  shopCore.merge(center)
  var top = new THREE.BoxGeometry(8, 1, 3.25)
  top.translate(0, 5.5, .125)
  shopCore.merge(top)
  var coreShopShadow = shopCore.clone()
  shopShadowGeometry.merge(coreShopShadow)
  var building = new THREE.Mesh(shopCore, stone)
	building.castShadow = true
  shop.add(building)

// Insides

  var insideShadowGeometry = new THREE.Geometry()

  var counter = new THREE.BoxGeometry(3, 1.5, 1)
  counter.translate(0, 1.25, 0)
  var coreCountersShadow = counter.clone()
  insideShadowGeometry.merge(coreCountersShadow)
  var Counters = new THREE.Mesh(counter, stone)
  shop.add(Counters)

  var shelf = new THREE.BoxGeometry(.5, .1, 3)
  shelf.translate(3.75, 2, 0)
  var shelf2 = new THREE.BoxGeometry(.5, .1, 3)
  shelf2.translate(3.75, 3, 0)
  shelf.merge(shelf2)
  shelf2.translate(0, 1, 0)
  shelf.merge(shelf2)
  shelf2.translate(-7.5, 0, 0)
  shelf.merge(shelf2)
  shelf2.translate(0, -1, 0)
  shelf.merge(shelf2)
  shelf2.translate(0, -1, 0)
  shelf.merge(shelf2)
  var coreShelvesShadow = shelf.clone()
  insideShadowGeometry.merge(coreShelvesShadow)
  var shelves = new THREE.Mesh(shelf, stone)
  shop.add(shelves)

  var book1 = new THREE.BoxGeometry(.7, .75, .2)
  book1.translate(3.75, 3.45, 0)
  var book2 = new THREE.BoxGeometry(.7, .75, .2)
  book2.translate(3.75, 3.45, 1)
  book1.merge(book2)
  book2.translate(0, 1, -1.5)
  book1.merge(book2)
  book2.translate(0, -2, -.5)
  book1.merge(book2)
  book2.translate(0, 0, .75)
  book1.merge(book2)
  book2.translate(0, 0, 1)
  book1.merge(book2)
  book2.translate(-7.5, 0, 0)
  book1.merge(book2)
  book2.translate(0, 0, -1.5)
  book1.merge(book2)
  book2.translate(0, 1, .5)
  book1.merge(book2)
  book2.translate(0, 0, .75)
  book1.merge(book2)
  book2.translate(0, 1, .25)
  book1.merge(book2)
  book2.translate(0, 0, -.75)
  book1.merge(book2)
  book2.translate(0, 0, -.5)
  book1.merge(book2)
  var book7 = new THREE.BoxGeometry(.7, .75, .2)
  book7.translate(-3.5, 1.87, 2.25)
  book1.merge(book7)
  var coreRedShadow = book1.clone()
  insideShadowGeometry.merge(coreRedShadow)
  var redBooks = new THREE.Mesh(book1, red)
  redBooks.castShadow = true
  shop.add(redBooks)

  var books2 = new THREE.Geometry()
  var book3 = new THREE.BoxGeometry(.7, .75, .2)
  book3.translate(3.75, 3.45, 1.2)
  books2.merge(book3)
  book3.translate(0, 1, -1.5)
  books2.merge(book3)
  book3.translate(0, -2, -.5)
  books2.merge(book3)
  book3.translate(0, 0, .75)
  books2.merge(book3)
  book3.translate(0, 0, 1)
  books2.merge(book3)
  book3.translate(-7.5, 0, 0)
  books2.merge(book3)
  book3.translate(0, 0, -1.5)
  books2.merge(book3)
  book3.translate(0, 1, .5)
  books2.merge(book3)
  book3.translate(0, 0, .75)
  books2.merge(book3)
  book3.translate(0, 1, .25)
  books2.merge(book3)
  book3.translate(0, 0, -.75)
  books2.merge(book3)
  book3.translate(0, 0, -.5)
  books2.merge(book3)
  var book8 = new THREE.BoxGeometry(.7, .75, .2)
  book8.translate(-2.5, 1.87, 2.25)
  books2.merge(book8)
  var coreBlueShadow = books2.clone()
  insideShadowGeometry.merge(coreBlueShadow)
  var blueBooks = new THREE.Mesh(books2, blue)
  blueBooks.castShadow = true
  shop.add(blueBooks)

  var books3 = new THREE.Geometry()
  var book4 = new THREE.BoxGeometry(.7, .75, .2)
  book4.translate(3.75, 3.45, 1.4)
  books3.merge(book4)
  book4.translate(0, 1, -1.5)
  books3.merge(book4)
  book4.translate(0, -2, -.5)
  books3.merge(book4)
  book4.translate(0, 0, .75)
  books3.merge(book4)
  book4.translate(0, 0, 1)
  books3.merge(book4)
  book4.translate(-7.5, 0, 0)
  books3.merge(book4)
  book4.translate(0, 0, -1.5)
  books3.merge(book4)
  book4.translate(0, 1, .5)
  books3.merge(book4)
  book4.translate(0, 0, .75)
  books3.merge(book4)
  book4.translate(0, 1, .25)
  books3.merge(book4)
  book4.translate(0, 0, -.75)
  books3.merge(book4)
  book4.translate(0, 0, -1.5)
  books3.merge(book4)
  book4.translate(7.5, 0, 2)
  books3.merge(book4)
  book4.translate(0, -1, -1.75)
  books3.merge(book4)
  var corePurpleShadow = books3.clone()
  insideShadowGeometry.merge(corePurpleShadow)
  var purpleBooks = new THREE.Mesh(books3, purple)
  purpleBooks.castShadow = true
  shop.add(purpleBooks)

  var books4 = new THREE.Geometry()
  var book5 = new THREE.BoxGeometry(.7, .75, .2)
  book5.translate(3.75, 3.45, .6)
  books4.merge(book5)
  book5.translate(0, 0, -1)
  books4.merge(book5)
  book5.translate(0, 1, -.75)
  books4.merge(book5)
  book5.translate(0, 0, 1.5)
  books4.merge(book5)
  book5.translate(0, 0, .75)
  books4.merge(book5)
  book5.translate(-7.5, -1, -1.75)
  books4.merge(book5)
  book5.translate(0, -1, -.5)
  books4.merge(book5)
  book5.translate(0, 0, 1.5)
  books4.merge(book5)
  var book6 = new THREE.BoxGeometry(.7, .75, .2)
  book6.translate(3.5, 1.87, 2.25)
  books4.merge(book6)
  var coreOrangeShadow = books4.clone()
  insideShadowGeometry.merge(coreOrangeShadow)
  var orangeBooks = new THREE.Mesh(books4, orange)
  orangeBooks.castShadow = true
  shop.add(orangeBooks)
  var shopInsideShadow = new THREE.Mesh(insideShadowGeometry, shadows)
  shopInsideShadow.receiveShadow = true
  shop.add(shopInsideShadow)

// Awning
  // White Stripes
  var awningA = new THREE.Geometry()
  var aA1 = new THREE.BoxGeometry(1.1, 1.25, 2)
  aA1.translate(-4.4, 5.25, 3.5)
  aA1.vertices[0].y-=.9;
  aA1.vertices[5].y-=.9;
  awningA.merge(aA1)
  aA1.translate(2.2, 0, 0)
  awningA.merge(aA1)
  aA1.translate(2.2, 0, 0)
  awningA.merge(aA1)
  aA1.translate(2.2, 0, 0)
  awningA.merge(aA1)
  aA1.translate(2.2, 0, 0)
  awningA.merge(aA1)
  var aShadow = awningA.clone()
  shopShadowGeometry.merge(aShadow)
  var As = new THREE.Mesh(awningA, offwhite)
  As.castShadow = true
  // Red Stripes
  var awningB = new THREE.Geometry()
  var aB1 = new THREE.BoxGeometry(1.1, 1.25, 2)
  aB1.translate(-3.3, 5.25, 3.5)
  aB1.vertices[0].y-=.9;
  aB1.vertices[5].y-=.9;
  awningB.merge(aB1)
  aB1.translate(2.2, 0, 0)
  awningB.merge(aB1)
  aB1.translate(2.2, 0, 0)
  awningB.merge(aB1)
  aB1.translate(2.2, 0, 0)
  awningB.merge(aB1)
  var bShadow = awningB.clone()
  shopShadowGeometry.merge(bShadow)
  var Bs = new THREE.Mesh(awningB, blue)
  Bs.castShadow = true
  shop.add(As)
  shop.add(Bs)
  var shopShadow = new THREE.Mesh(shopShadowGeometry, shadows)
  shopShadow.receiveShadow = true
  shop.add(shopShadow)

// Add To Scene
  shop.position.set(8, 1, -8) // 8, -9
  scene.add(shop)

}

function initApartment() {

  var office = new THREE.Group()
  var officeShadows = new THREE.Geometry()

  // Foundation
  var found = new THREE.BoxGeometry(8, .5, 8)
  var step = new THREE.BoxGeometry(8.25, .25, 8.25)
  step.translate(0, -.125, 0)
  found.merge(step)
  var foundShadow = found.clone(true)
  officeShadows.merge(found)
  var buildingFound = new THREE.Mesh(found, foundation)
  buildingFound.castShadow = true
  office.add(buildingFound)

  // Outside Walls
  var base = new THREE.Geometry()
  var left = new THREE.BoxGeometry(.5, 10, 1)
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
  var back = new THREE.BoxGeometry(1, 10, .5)
  back.translate(-1.5, 5.25, -3.375)
	base.merge(back)
  back.translate(3, 0, 0)
	base.merge(back)
  back.translate(0, 0, 6.875)
	base.merge(back)
  back.translate(-3, 0, 0)
	base.merge(back)
  var backSide = new THREE.BoxGeometry(1.25, 3.5, .5)
  backSide.translate(-2.625, 2, 3.5)
	base.merge(backSide)
  backSide.translate(5.25, 0, 0)
	base.merge(backSide)
  backSide.translate(0, 0, -6.875)
	base.merge(backSide)
  backSide.translate(-5.25, 0, 0)
	base.merge(backSide)
  var front = new THREE.BoxGeometry(1.25, 1.75, .5)
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
  var front = new THREE.BoxGeometry(2, 7.5, .5)
  front.translate(0, 6.5, 3.5)
	base.merge(front)
  var front = new THREE.BoxGeometry(2, 10, .5)
  front.translate(0, 5.25, -3.375)
	base.merge(front)
  var side = new THREE.BoxGeometry(.5, 3.5, 1.15)
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
  var side = new THREE.BoxGeometry(.5, 1.75, 1.15)
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
  var floor = new THREE.BoxGeometry(6.5, .25, 6.5)
  floor.translate(0, 3, 0)
	base.merge(floor)
  floor.translate(0, 3.5, 0)
	base.merge(floor)
  floor.translate(0, 3.63, 0)
	base.merge(floor)
  var innerWall = new THREE.BoxGeometry(.25, 7.25, 6.5)
  innerWall.translate(0, 6.67, 0)
	base.merge(innerWall)

  // Windows
  var windows = new THREE.Geometry()
  var windowSide = new THREE.BoxGeometry(7, 9.5, .1)
  windowSide.translate(0, 5, 3.5)
	windows.merge(windowSide)
  windowSide.translate(0, 0, -7)
	windows.merge(windowSide)
  var windowSide = new THREE.BoxGeometry(.1, 9.5, 7)
  windowSide.translate(3.5, 5, 0)
	windows.merge(windowSide)
  windowSide.translate(-7, 0, 0)
	windows.merge(windowSide)
  var windowMesh = new THREE.Mesh(windows, windowColor)
  office.add(windowMesh)



  // roof
	var cap = new THREE.Geometry()
  var capLeft = new THREE.BoxGeometry(.25, .5, 7.375)
	capLeft.translate(-3.88, 10.5, .05)
	cap.merge(capLeft)
	capLeft.translate(7.76, 0, 0)
	cap.merge(capLeft)
  var capFront = new THREE.BoxGeometry(8.01, .5, .25)
	capFront.translate(0, 10.5, 3.86)
	cap.merge(capFront)
	capFront.translate(0, 0, -7.6)
	cap.merge(capFront)
  // sill
  // fronts - bottom
  var sillBottom = new THREE.Geometry()
  var sill1 = new THREE.BoxGeometry(1.5, .1, .1)
	sill1.translate(-2.6, 7.125, 3.8)
	sillBottom.merge(sill1)
	sill1.translate(0, 0, -7.475)
	sillBottom.merge(sill1)
  var sill2 = new THREE.BoxGeometry(1.22, .1, .5)
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
  // fronts - top
  var sillTop = new THREE.Geometry()
  var sill3 = new THREE.BoxGeometry(1.375, .1, .1)
	sill3.translate(-2.6, 8.5, 3.8)
	sillTop.merge(sill3)
	sill3.translate(0, 0, -7.475)
	sillTop.merge(sill3)
  var sill4 = new THREE.BoxGeometry(1.25, .1, .1)
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
  //sides-Top
  var sillTopSide = new THREE.Geometry()
  var sill = new THREE.BoxGeometry(.1, .1, 1.375)
	sill.translate(3.8, 8.5, 2.175)
	sillTopSide.merge(sill)
	sill.translate(-7.6, 0, 0)
	sillTopSide.merge(sill)
  var sill2 = new THREE.BoxGeometry(.1, .1, 1.25)
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
  var sillBottomSide = new THREE.Geometry()
  var sill3 = new THREE.BoxGeometry(.1, .1, 1.5)
	sill3.translate(3.8, 7.1, 2.175)
	sillBottomSide.merge(sill3)
	sill3.translate(-7.6, 0, 0)
	sillBottomSide.merge(sill3)
  var sill4 = new THREE.BoxGeometry(.5, .1, 1.22)
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
  var doorSill = new THREE.BoxGeometry(2.5, .25, .2)
	doorSill.translate(0, 2.87, 3.75)
	cap.merge(doorSill)
  var doorSillSide = new THREE.BoxGeometry(.1, 2.5, .1)
	doorSillSide.translate(-1, 1.5, 3.75)
	cap.merge(doorSillSide)
	doorSillSide.translate(1, 0, 0)
	cap.merge(doorSillSide)
	doorSillSide.translate(1, 0, 0)
	cap.merge(doorSillSide)
  // add to building
  var roofShadow = cap.clone(true)
  officeShadows.merge(roofShadow)
  var roof = new THREE.Mesh(cap, foundation)
  roof.castShadow = true
  office.add(roof)

  // Assemble
  var baseShadow = base.clone(true)
  officeShadows.merge(baseShadow)
  var building = new THREE.Mesh(base, brick)
  building.castShadow = true
  office.add(building)
  var buildingShadows = new THREE.Mesh(officeShadows, shadows)
  buildingShadows.receiveShadow = true
  office.add(buildingShadows)

  // Set Decorations
  var decorations = new THREE.Group()
  var decorationShadows = new THREE.Geometry()
  // Couch
  var couchGeometry = new THREE.Geometry()
  var couchSeat = new THREE.BoxGeometry(.75, .25, 1.65)
  couchSeat.translate(-1, 6.75, -.01)
	couchGeometry.merge(couchSeat)
  var couchBack = new THREE.BoxGeometry(.25, .75, 1.65)
  couchBack.translate(-.5, 7, -.01)
	couchGeometry.merge(couchBack)
  var armRest = new THREE.BoxGeometry(1, .5, .25)
  armRest.translate(-.87, 6.87, .92)
	couchGeometry.merge(armRest)
  armRest.translate(0, 0, -1.84)
	couchGeometry.merge(armRest)
  var cushion = new THREE.BoxGeometry(.75, .15, .5)
  cushion.translate(-1, 6.86, 0)
	couchGeometry.merge(cushion)
  cushion.translate(0, 0, -.52)
	couchGeometry.merge(cushion)
  cushion.translate(0, 0, 1.04)
	couchGeometry.merge(cushion)
  couchGeometry.rotateY(1.25)
  couchGeometry.translate(-1.25, 0, -3)
  var couchShadow = couchGeometry.clone(true)
  decorationShadows.merge(couchShadow)
  var couch = new THREE.Mesh(couchGeometry, couchFabric)
  couch.castShadow = true
  decorations.add(couch)

  var blueCouch = couchGeometry.clone(true)
  blueCouch.rotateY(2)
  blueCouch.translate(2.5, 0, -1)
  var couchShadow = blueCouch.clone(true)
  decorationShadows.merge(couchShadow)
  var couch2 = new THREE.Mesh(blueCouch, blueFabric)
  couch2.castShadow = true
  decorations.add(couch2)

  var purpleCouch = couchGeometry.clone(true)
  purpleCouch.rotateY(-1)
  purpleCouch.translate(1.5, -3.5, 1)
  var couchShadow = purpleCouch.clone(true)
  decorationShadows.merge(couchShadow)
  var couch3 = new THREE.Mesh(purpleCouch, purpleFabric)
  couch3.castShadow = true
  decorations.add(couch3)

  var tanCouch = couchGeometry.clone(true)
  tanCouch.rotateY(3.5)
  tanCouch.translate(-3.75, -3.5, .5)
  var couchShadow = tanCouch.clone(true)
  decorationShadows.merge(couchShadow)
  var couch4 = new THREE.Mesh(tanCouch, tanFabric)
  couch4.castShadow = true
  decorations.add(couch4)

  // Bed
  var bed = new THREE.Group()
  var sheets = new THREE.BoxGeometry(2, .1, 1)
  sheets.translate(-1.5, 3.7, -2)
  var sheetsSide = new THREE.BoxGeometry(2, .5, .1)
  sheetsSide.translate(-1.5, 3.5, -1.5)
  sheets.merge(sheetsSide)
  sheetsSide.translate(0, 0, -1)
  sheets.merge(sheetsSide)
  var sheetsEnd = new THREE.BoxGeometry(.1, .5, 1.1)
  sheetsEnd.translate(-.5, 3.5, -2)
  sheets.merge(sheetsEnd)
  sheets.rotateY(-1.55)
  sheets.translate(-3, 0, 0)
  var sheetsShadow = sheets.clone(true)
  decorationShadows.merge(sheetsShadow)
  var bedSheet = new THREE.Mesh(sheets, blueFabric)
  bedSheet.castShadow = true
  bed.add(bedSheet)
  var sheets2 = sheets.clone()
  sheets2.rotateY(1.55)
  sheets2.translate(3.5, 0, 1)
  var sheetsShadow = sheets2.clone(true)
  decorationShadows.merge(sheetsShadow)
  var bedSheet2 = new THREE.Mesh(sheets2, couchFabric)
  bed.add(bedSheet2)
  var sheets3 = sheets.clone()
  sheets3.rotateY(1.55)
  sheets3.translate(3.5, 3.5, -3)
  var sheetsShadow = sheets3.clone(true)
  decorationShadows.merge(sheetsShadow)
  var bedSheet3 = new THREE.Mesh(sheets3, purpleFabric)
  bed.add(bedSheet3)
  var sheets4 = sheets.clone()
  sheets4.rotateY(3.14)
  sheets4.translate(-2.05, 3.5, -.5)
  var sheetsShadow = sheets4.clone(true)
  decorationShadows.merge(sheetsShadow)
  var bedSheet4 = new THREE.Mesh(sheets4, blueFabric)
  bed.add(bedSheet4)

  var mattress = new THREE.BoxGeometry(2.5, .45, 1)
  mattress.rotateY(-1.55)
  mattress.translate(-1.02, 3.475, -1.75)
  var mattressShadow = mattress.clone(true)
  decorationShadows.merge(mattressShadow)
  var bedMattress = new THREE.Mesh(mattress, tanFabric)
  bed.add(bedMattress)
  var mattress2 = mattress.clone()
  mattress2.rotateY(1.55)
  mattress2.translate(3.3, 0, 1)
  var mattressShadow = mattress2.clone(true)
  decorationShadows.merge(mattressShadow)
  var bedMattress2 = new THREE.Mesh(mattress2, tanFabric)
  bed.add(bedMattress2)
  var mattress3 = mattress.clone()
  mattress3.rotateY(1.55)
  mattress3.translate(3.3, 3.5, -3)
  var mattressShadow = mattress3.clone(true)
  decorationShadows.merge(mattressShadow)
  var bedMattress3 = new THREE.Mesh(mattress3, tanFabric)
  bed.add(bedMattress3)
  var mattress4 = mattress.clone()
  mattress4.translate(0, 3.5, 3)
  var mattressShadow = mattress4.clone(true)
  decorationShadows.merge(mattressShadow)
  var bedMattress4 = new THREE.Mesh(mattress4, tanFabric)
  bed.add(bedMattress4)

  decorations.add(bed)

  // Lobby
  var lobbyDesk = new THREE.Geometry()
  var deskFront = new THREE.BoxGeometry(3, 1, .1)
  deskFront.translate(0, 1, -.5)
	lobbyDesk.merge(deskFront)
  var deskFront = new THREE.BoxGeometry(.1, 1, 1)
  deskFront.translate(1.45, 1, -1)
	lobbyDesk.merge(deskFront)
  deskFront.translate(-2.9, 0, 0)
	lobbyDesk.merge(deskFront)
  var deskFront = new THREE.BoxGeometry(3.2, .1, 1.2)
  deskFront.translate(0, 1.55, -1)
	lobbyDesk.merge(deskFront)
  var deskFront = new THREE.BoxGeometry(3.1, .1, 1.1)
  deskFront.translate(0, 1.65, -1)
	lobbyDesk.merge(deskFront)
  var lobbyShadow = lobbyDesk.clone(true)
  decorationShadows.merge(lobbyShadow)
  var lobby = new THREE.Mesh(lobbyDesk, stone)
  decorations.add(lobby)

  var interiorShadows = new THREE.Mesh(decorationShadows, shadows)
  interiorShadows.receiveShadow = true
  office.add(interiorShadows)

  office.add(decorations)

  // Add to scene
  office.position.set(-11, .75, -9) //-10, -.5, -6
	//office.scale.set(1.7, 1.7, 1.7)
  scene.add(office)
}

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

function render() {
		scene.position.set(0, 0, 3)
		renderer.render(scene, camera);
}

function animate() {
		requestAnimationFrame(animate);
		render();
		controls.update();
}

init()
animate()

//# sourceMappingURL=maps/main.js.map
