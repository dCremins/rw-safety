

/* Variables */
let scene
let camera
let controls
let renderer
let ambient
let sun
const objects = []
const flaggers = []

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const offset = new THREE.Vector3()
const intersection = new THREE.Vector3()
let selected = null
let hovered = null
// Scenery
const road = new THREE.MeshLambertMaterial({color: 0x87836E})
const lines = new THREE.LineBasicMaterial({color: 0xFFFFFF})
const divider = new THREE.MeshLambertMaterial({color: 0xFFFF86})
const grass = new THREE.MeshLambertMaterial({color: 0x77C997})
const treeTall = new THREE.MeshLambertMaterial({color: 0x62C192})
const shadows = new THREE.ShadowMaterial({opacity: 0.3})
const windowColor = new THREE.MeshLambertMaterial({color: 0xD0DDE3, transparent: true, opacity: 0.5})
const brick = new THREE.MeshLambertMaterial({color: 0xAA5050})
const stone = new THREE.MeshLambertMaterial({color: 0xE5D2A9})
const truckMaterial = new THREE.MeshLambertMaterial({color: 0xEF8547})
const foundation = new THREE.MeshLambertMaterial({color: 0xF4EEEF})
const couchFabric = new THREE.MeshLambertMaterial({color: 0x638464})
const blueFabric = new THREE.MeshLambertMaterial({color: 0x5E7E9B})
const purpleFabric = new THREE.MeshLambertMaterial({color: 0x805C8E})
const tanFabric = new THREE.MeshLambertMaterial({color: 0xE8C1A0})
// Skin
const skinTone1 = new THREE.MeshLambertMaterial({color: 0x8D5524}) // Brown
const skinTone2 = new THREE.MeshLambertMaterial({color: 0xC68642}) // Light Brown
const skinTone3 = new THREE.MeshLambertMaterial({color: 0xF1C27D}) // Tan
const skinTone4 = new THREE.MeshLambertMaterial({color: 0xFFDBAC}) // Pale

// Colors
const red = new THREE.MeshLambertMaterial({color: 0xF87676})
const green = new THREE.MeshLambertMaterial({color: 0x78C789})
const blue = new THREE.MeshLambertMaterial({color: 0x22B8E2})
const orange = new THREE.MeshLambertMaterial({color: 0xF6B331})
const safetyOrange = new THREE.MeshLambertMaterial({color: 0xFF7900})
const yellow = new THREE.MeshLambertMaterial({color: 0xFDDB4C})
const purple = new THREE.MeshLambertMaterial({color: 0xB78DD1})
const white = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
const offwhite = new THREE.MeshLambertMaterial({color: 0xF2F2F2})
const gray = new THREE.MeshLambertMaterial({color: 0x555555})
const palegray = new THREE.MeshLambertMaterial({color: 0xA5A5A5})
const jean = new THREE.MeshLambertMaterial({color: 0x416BAD})
// Signs
const workerSign = new THREE.TextureLoader().load('images/sign-01.png')
const workerSignMaterial = new THREE.MeshBasicMaterial({map: workerSign})
const flaggerSign = new THREE.TextureLoader().load('images/sign-02.png')
const flaggerSignMaterial = new THREE.MeshBasicMaterial({map: flaggerSign})
const flagAheadSign = new THREE.TextureLoader().load('images/sign-03.png')
const flagAheadSignMaterial = new THREE.MeshBasicMaterial({map: flagAheadSign})
const menWorkSign = new THREE.TextureLoader().load('images/sign-04.png')
const menWorkSignMaterial = new THREE.MeshBasicMaterial({map: menWorkSign})
const prepareStopSign = new THREE.TextureLoader().load('images/sign-05.png')
const prepareStopSignMaterial = new THREE.MeshBasicMaterial({map: prepareStopSign})
const oneLaneSign = new THREE.TextureLoader().load('images/sign-06.png')
const oneLaneSignMaterial = new THREE.MeshBasicMaterial({map: oneLaneSign})
const workAheadSign = new THREE.TextureLoader().load('images/sign-07.png')
const workAheadSignMaterial = new THREE.MeshBasicMaterial({map: workAheadSign})
// Geometry
const tallTree = new THREE.Geometry()
const tallCone = new THREE.ConeGeometry(1.68, 4, 32)
tallCone.translate(0, 1.35, 0)
tallTree.merge(tallCone)
const tallSphere = new THREE.SphereGeometry(1.8, 60, 60)
tallSphere.translate(0, -1.3, 0)
tallTree.merge(tallSphere)
const shortTree = tallTree.clone()
shortTree.scale(0.5, 0.5, 0.5)
/* Cone */
const coreGeometry = new THREE.CylinderGeometry(0.07, 0.2, 0.5, 32, 0.8, false, 0.8)
const coneBottomG = new THREE.BoxGeometry(0.5, 0.06, 0.5)
coneBottomG.translate(0, -0.23, 0)
const coneGeometry = new THREE.Geometry()
coneGeometry.merge(coreGeometry)
coneGeometry.merge(coneBottomG)
const stripeGeometry = new THREE.CylinderGeometry(0.116, 0.155, 0.15, 32, 1, false, 0.8)
const stripe = new THREE.Mesh(stripeGeometry, white)

function init() {
	scene = new THREE.Scene()
	window.scene = scene
	window.THREE = THREE
	// Scenery
	initRoad()
	initTrees()
	initShop()
	initApartment()
	initBench()
	initBackHoe()
	initTruck()
	initWorkers()
	// Mechanics
	initCamera()
	initLights()
	initRender()
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(60, ((window.innerWidth - 110) / (window.innerHeight - 50)), 1, 100)
	camera.position.set(0, 23, 20)
	camera.lookAt(0, 0, 0)
}

function initLights() {
	ambient = new THREE.HemisphereLight(0xDEEEF2, 0x665C6D, 1.2)
	sun = new THREE.SpotLight(0xFCDC74, 0.2)
	sun.position.set(-50, 40, -5)
	sun.castShadow = true
	sun.shadow.camera.left = -10
	sun.shadow.camera.right = 10
	sun.shadow.camera.top = 10
	sun.shadow.camera.bottom = -10
	sun.shadow.camera.near = 0.1
	sun.shadow.camera.far = 1000
	sun.shadow.mapSize.width = 2048
	sun.shadow.mapSize.height = 2048
	scene.add(ambient)
	scene.add(sun)
}

function initRender() {
	renderer = new THREE.WebGLRenderer({antialias: true})
	const container = document.getElementById('container')
	renderer.setSize(window.innerWidth - 110, window.innerHeight)
	renderer.setClearColor(0xFFFFFF, 1)
	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	container.appendChild(renderer.domElement)
	controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.addEventListener( 'change', render )
	//controls.enabled = false

	//container.addEventListener('mousemove', onDocumentMouseMove, false)
	//container.addEventListener('mouseup', onDocumentMouseCancel, false)
	//container.addEventListener('mousedown', onDocumentMouseDown, false)
	/* container.addEventListener('touchmove', onDocumentTouchMove, false)
	container.addEventListener('touchstart', onDocumentTouchStart, false)
	container.addEventListener('touchend', onDocumentTouchEnd, false) */
}

function initRoad() {
	let meshes = new THREE.Geometry()
	const materials = [
		grass,			// 0
		road,				// 1
		divider,		// 2
		lines,			// 3
		gray,				// 4
		white,			// 5
		shadows			// 6
	]

	const topGeometry = new THREE.BoxGeometry(45, 1, 10)
	topGeometry.translate(0, 0, -9)

	for (var j = 0; j < topGeometry.faces.length; j++) {
		topGeometry.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(topGeometry))

	const roadGeometry = new THREE.BoxGeometry(45, 1, 8)

	for (var j = 0; j < roadGeometry.faces.length; j++) {
		roadGeometry.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(roadGeometry))

	let lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, -3.7),
		new THREE.Vector3(22.5, 0.51, -3.7)
	)

	for (var j = 0; j < lineGeometry.faces.length; j++) {
		lineGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(lineGeometry))

	lineGeometry = new THREE.Geometry()
	lineGeometry.vertices.push(
		new THREE.Vector3(-22.5, 0.51, 3.7),
		new THREE.Vector3(22.5, 0.51, 3.7)
	)

	for (var j = 0; j < lineGeometry.faces.length; j++) {
		lineGeometry.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(lineGeometry))

	const bottomGeometry = new THREE.BoxGeometry(45, 1, 7)
	bottomGeometry.translate(0, 0, 7.5)

	for (var j = 0; j < bottomGeometry.faces.length; j++) {
		bottomGeometry.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(bottomGeometry))

	const dividerGeometry = new THREE.Geometry()
	const dividerLine = new THREE.BoxGeometry(1, 0.1, 0.2)
	dividerLine.translate(-22, 0.5, 0)
	dividerGeometry.merge(dividerLine)
	for (let i = 22; i >= -21; i -= 2) {
		dividerLine.translate(2, 0, 0)
		dividerGeometry.merge(dividerLine)
	}

	for (var j = 0; j < dividerGeometry.faces.length; j++) {
		dividerGeometry.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(dividerGeometry))

	const shadowGeometry = new THREE.BoxGeometry(45, 1, 25)
	const floorShadows = new THREE.Mesh(shadowGeometry, shadows)
	floorShadows.position.set(0, 0.05, -1.5)
	floorShadows.receiveShadow = true
	scene.add(floorShadows)
	objects.push(floorShadows)

	const cone = new THREE.Geometry()
	const stripe = new THREE.Geometry()
	const coneCore = coneGeometry.clone(true)
	const stripeCore = stripeGeometry.clone(true)
	coneCore.translate(0, 0.75, 0.5)
	cone.merge(coneCore)
	stripeCore.translate(0, 0.75, 0.5)
	stripe.merge(stripeCore)
	for (var i = 1.5; i <= 10; i += 1.5) {
		coneCore.translate(1.5, 0, 0)
		cone.merge(coneCore)
		stripeCore.translate(1.5, 0, 0)
		stripe.merge(stripeCore)
	}

	for (var j = 0; j < cone.faces.length; j++) {
		cone.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(cone))

	for (var j = 0; j < stripe.faces.length; j++) {
		stripe.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(stripe))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	scene.add(combinedMesh)
}

function initTrees() {
	const trees = new THREE.Geometry()
	const tallTree = new THREE.Geometry()
	const tallCone = new THREE.ConeGeometry(1.68, 4, 32)
	tallCone.translate(0, 1.35, 0)
	tallTree.merge(tallCone)
	const tallSphere = new THREE.SphereGeometry(1.8, 60, 60)
	tallSphere.translate(0, -1.3, 0)
	tallTree.merge(tallSphere)

	tallTree.translate(-18, 3, -10.5)
	trees.merge(tallTree)
	tallTree.translate(7, 0, 18.5)
	trees.merge(tallTree)

	const shortTree = tallTree.clone()
	shortTree.scale(0.5, 0.5, 0.5)
	shortTree.translate(0, 0.2, -12)
	trees.merge(shortTree)
	shortTree.translate(17.5, 0, 14)
	trees.merge(shortTree)
	shortTree.translate(4.5, 0, -16.5)
	trees.merge(shortTree)

	const allTrees = new THREE.Mesh(trees, treeTall)
	allTrees.castShadow = true
	scene.add(allTrees)
	const treeShadows = new THREE.Mesh(trees, shadows)
	treeShadows.receiveShadow = true
	scene.add(treeShadows)
}

function initShop()	{
	let meshes = new THREE.Geometry()
	let shopShadow = new THREE.Geometry()
	const materials = [
		foundation,			// 0
		windowColor,		// 1
		stone,					// 2
		red,						// 3
		blue,						// 4
		purple,					// 5
		orange,					// 6
		offwhite,				// 7
		shadows					// 8
	]

	const shopBase = new THREE.Geometry()

// Foundation
	const bottom = new THREE.BoxGeometry(10, 1, 5)
	shopBase.merge(bottom)
	const bottomStair = new THREE.BoxGeometry(2, 0.5, 0.5)
	bottomStair.translate(0, 0.25, 2.75)
	shopBase.merge(bottomStair)
	const topStair = new THREE.BoxGeometry(2, 0.5, 1)
	topStair.translate(0, -0.25, 3)
	shopBase.merge(topStair)

	for (var j = 0; j < shopBase.faces.length; j++) {
		shopBase.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(shopBase))
	shopShadow.mergeMesh(new THREE.Mesh(shopBase))

// Building
	const glass = new THREE.BoxGeometry(9.75, 4.9, 0.125)
	glass.translate(0, 3, 2.4)

	for (var j = 0; j < glass.faces.length; j++) {
		glass.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(glass))

	const shopCore = new THREE.Geometry()
	const bottomFront = new THREE.BoxGeometry(4, 1, 0.75)
	bottomFront.translate(-3, 1, 2.125)
	shopCore.merge(bottomFront)
	bottomFront.translate(6, 0, 0)
	shopCore.merge(bottomFront)
	const topFront = new THREE.BoxGeometry(10, 2, 0.75)
	topFront.translate(0, 5, 2.12)
	shopCore.merge(topFront)
	const sides = new THREE.BoxGeometry(1, 5.5, 3.25)
	sides.translate(-4.5, 3.25, 0.126)
	shopCore.merge(sides)
	sides.translate(9, 0, 0)
	shopCore.merge(sides)
	const inner = new THREE.BoxGeometry(1, 2.5, 0.5)
	inner.translate(-1.5, 2.75, 2.25)
	shopCore.merge(inner)
	inner.translate(3, 0, 0)
	shopCore.merge(inner)
	const center = new THREE.BoxGeometry(10, 5.5, 1)
	center.translate(0, 3.25, -2)
	shopCore.merge(center)
	const top = new THREE.BoxGeometry(8, 1, 3.25)
	top.translate(0, 5.5, 0.125)
	shopCore.merge(top)
	// Insides
	const counter = new THREE.BoxGeometry(3, 1.5, 1)
	counter.translate(0, 1.25, 0)
	shopCore.merge(counter)
	const shelf = new THREE.BoxGeometry(0.5, 0.1, 3)
	shelf.translate(3.75, 2, 0)
	shopCore.merge(shelf)
	shelf.translate(0, 1, 0)
	shopCore.merge(shelf)
	shelf.translate(0, 1, 0)
	shopCore.merge(shelf)
	shelf.translate(-7.5, 0, 0)
	shopCore.merge(shelf)
	shelf.translate(0, -1, 0)
	shopCore.merge(shelf)
	shelf.translate(0, -1, 0)
	shopCore.merge(shelf)

	for (var j = 0; j < shopCore.faces.length; j++) {
		shopCore.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(shopCore))

	// Red
	let books = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	books.translate(3.75, 3.45, 0)
	let book = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book.translate(3.75, 3.45, 1)
	books.merge(book)
	book.translate(0, 1, -1.5)
	books.merge(book)
	book.translate(0, -2, -0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 0, 1)
	books.merge(book)
	book.translate(-7.5, 0, 0)
	books.merge(book)
	book.translate(0, 0, -1.5)
	books.merge(book)
	book.translate(0, 1, 0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 1, 0.25)
	books.merge(book)
	book.translate(0, 0, -0.75)
	books.merge(book)
	book.translate(0, 0, -0.5)
	books.merge(book)

	for (var j = 0; j < books.faces.length; j++) {
		books.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(books))

		// Blue
	books = new THREE.Geometry()
	book = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book.translate(3.75, 3.45, 1.2)
	book.translate(0, 1, -1.5)
	books.merge(book)
	book.translate(0, -2, -0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 0, 1)
	books.merge(book)
	book.translate(-7.5, 0, 0)
	books.merge(book)
	book.translate(0, 0, -1.5)
	books.merge(book)
	book.translate(0, 1, 0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 1, 0.25)
	books.merge(book)
	book.translate(0, 0, -0.75)
	books.merge(book)
	book.translate(0, 0, -0.5)
	books.merge(book)
	const book8 = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book8.translate(-2.5, 1.87, 2.25)
	books.merge(book8)

	for (var j = 0; j < books.faces.length; j++) {
		books.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(books))

		// Purple
	books = new THREE.Geometry()
	book = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book.translate(3.75, 3.45, 1.4)
	books.merge(book)
	book.translate(0, 1, -1.5)
	books.merge(book)
	book.translate(0, -2, -0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 0, 1)
	books.merge(book)
	book.translate(-7.5, 0, 0)
	books.merge(book)
	book.translate(0, 0, -1.5)
	books.merge(book)
	book.translate(0, 1, 0.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(0, 1, 0.25)
	books.merge(book)
	book.translate(0, 0, -0.75)
	books.merge(book)
	book.translate(0, 0, -1.5)
	books.merge(book)
	book.translate(7.5, 0, 2)
	books.merge(book)
	book.translate(0, -1, -1.75)
	books.merge(book)

	for (var j = 0; j < books.faces.length; j++) {
		books.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(books))

		// Orange
	books = new THREE.Geometry()
	book = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book.translate(3.75, 3.45, 0.6)
	books.merge(book)
	book.translate(0, 0, -1)
	books.merge(book)
	book.translate(0, 1, -0.75)
	books.merge(book)
	book.translate(0, 0, 1.5)
	books.merge(book)
	book.translate(0, 0, 0.75)
	books.merge(book)
	book.translate(-7.5, -1, -1.75)
	books.merge(book)
	book.translate(0, -1, -0.5)
	books.merge(book)
	book.translate(0, 0, 1.5)
	books.merge(book)
	const book6 = new THREE.BoxGeometry(0.7, 0.75, 0.2)
	book6.translate(3.5, 1.87, 2.25)
	books.merge(book6)

	for (var j = 0; j < books.faces.length; j++) {
		books.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(books))

// Awning
	// White Stripes
	const awningA = new THREE.Geometry()
	const aA1 = new THREE.BoxGeometry(1.1, 1.25, 2)
	aA1.translate(-4.4, 5.25, 3.5)
	aA1.vertices[0].y -= 0.9
	aA1.vertices[5].y -= 0.9
	awningA.merge(aA1)
	aA1.translate(2.2, 0, 0)
	awningA.merge(aA1)
	aA1.translate(2.2, 0, 0)
	awningA.merge(aA1)
	aA1.translate(2.2, 0, 0)
	awningA.merge(aA1)
	aA1.translate(2.2, 0, 0)
	awningA.merge(aA1)

	for (var j = 0; j < awningA.faces.length; j++) {
		awningA.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(awningA))
	shopShadow.mergeMesh(new THREE.Mesh(awningA))

	// Colored Stripes
	const awningB = new THREE.Geometry()
	const aB1 = new THREE.BoxGeometry(1.1, 1.25, 2)
	aB1.translate(-3.3, 5.25, 3.5)
	aB1.vertices[0].y -= 0.9
	aB1.vertices[5].y -= 0.9
	awningB.merge(aB1)
	aB1.translate(2.2, 0, 0)
	awningB.merge(aB1)
	aB1.translate(2.2, 0, 0)
	awningB.merge(aB1)
	aB1.translate(2.2, 0, 0)
	awningB.merge(aB1)

	for (var j = 0; j < awningB.faces.length; j++) {
		awningB.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(awningB))
	shopShadow.mergeMesh(new THREE.Mesh(awningB))

// Create the combined mesh
meshes = new THREE.BufferGeometry().fromGeometry(meshes)
let combinedMesh = new THREE.Mesh(meshes, materials)
combinedMesh.position.set(8, 1, -8)
combinedMesh.castShadow = true

shopShadow = new THREE.BufferGeometry().fromGeometry(shopShadow)
let combinedShadow = new THREE.Mesh(shopShadow, shadows)
combinedShadow.position.set(8, 1, -8)
combinedShadow.receiveShadow = true

scene.add(combinedMesh)
scene.add(combinedShadow)
}

function initApartment() {
	let meshes = new THREE.Geometry()
	let officeShadows = new THREE.Geometry()
	const materials = [
		foundation,			// 0
		brick,					// 1
		windowColor,		// 2
		couchFabric,		// 3
		blueFabric,			// 4
		purpleFabric,		// 5
		tanFabric,			// 6
		stone,					// 7
		shadows					// 8
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
	officeShadows.mergeMesh(new THREE.Mesh(base))

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

	const mattress = new THREE.BoxGeometry(2.5, 0.45, 1)
	mattress.rotateY(-1.55)
	mattress.translate(-1.02, 3.475, -1.75)
	Tan.merge(mattress)
	mattress.translate(0, 3.5, 3.5)
	Tan.merge(mattress)
	mattress.rotateY(1.55)
	mattress.translate(.25, 0, -3.12)
	Tan.merge(mattress)
	mattress.translate(-.75, -3.5, 3.95)
	Tan.merge(mattress)

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
meshes = new THREE.BufferGeometry().fromGeometry(meshes)
let combinedMesh = new THREE.Mesh(meshes, materials)
combinedMesh.position.set(-11, 0.75, -9)
combinedMesh.castShadow = true

let combinedShadow = new THREE.Mesh(officeShadows, shadows)
combinedShadow.position.set(-11, 0.75, -9)
combinedShadow.receiveShadow = true

scene.add(combinedMesh)
scene.add(combinedShadow)

}

function initBench() {
	let meshes = new THREE.Geometry()
	const materials = [
		orange,			// 0
		gray,				// 1
		skinTone3,	// 2
		jean,				// 3
		red,				// 4
		offwhite,		// 5
		shadows			// 6
	]

	const benchGeometry = new THREE.Geometry()
	const benchSeat = new THREE.BoxGeometry(2, 0.1, 1)
	benchGeometry.merge(benchSeat)
	const benchBack = new THREE.BoxGeometry(2, 0.8, 0.1)
	benchBack.translate(0, 0.8, -0.55)
	benchGeometry.merge(benchBack)
	benchGeometry.scale(0.8, 0.8, 0.8)

	for (var j = 0; j < benchGeometry.faces.length; j++) {
		benchGeometry.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(benchGeometry))
	// Metal
	const benchMetal = new THREE.Geometry()
	let metalSide = new THREE.BoxGeometry(0.1, 1.8, 0.1)
	metalSide.translate(-1.05, 0.4, -0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(0.1, 0.6, 0.1)
	metalSide.translate(-1.05, -0.25, 0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(0.1, 0.1, 1)
	metalSide.translate(-1.05, 0, 0)
	benchMetal.merge(metalSide)
	metalSide.translate(2.1, 0, 0)
	benchMetal.merge(metalSide)
	metalSide = new THREE.BoxGeometry(2, 0.1, 0.1)
	metalSide.translate(0, 0, 0.55)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0, -1.1)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0.35, 0)
	benchMetal.merge(metalSide)
	metalSide.translate(0, 0.9, 0)
	benchMetal.merge(metalSide)
	benchMetal.scale(0.8, 0.8, 0.8)

	for (var j = 0; j < benchMetal.faces.length; j++) {
		benchMetal.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(benchMetal))

	const benchShadow = new THREE.Geometry()
	const coreBenchShadow = benchGeometry.clone()
	benchShadow.merge(coreBenchShadow)
	const metalBenchShadow = benchMetal.clone()
	benchShadow.merge(metalBenchShadow)

	for (var j = 0; j < benchShadow.faces.length; j++) {
		benchShadow.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(benchShadow))

	const body = new THREE.Geometry()
	// Arms
	let rightArm = new THREE.BoxGeometry(0.3, 0.4, 0.5)
	rightArm.translate(0.55, 0.1, 0.5)
	rightArm.vertices[4].x += 0.1
	rightArm.vertices[6].x += 0.1
	rightArm.vertices[0].x -= 0.2
	rightArm.vertices[2].x -= 0.2
	rightArm.vertices[0].y += 0.3
	rightArm.vertices[2].y += 0.4
	rightArm.vertices[4].y += 0.3
	rightArm.vertices[5].y += 0.3
	rightArm.vertices[6].y += 0.3
	rightArm.vertices[7].y += 0.4
	body.merge(rightArm)
	rightArm = new THREE.BoxGeometry(0.3, 0.4, 0.5)
	rightArm.translate(-0.55, 0.1, 0.5)
	rightArm.vertices[1].x -= 0.1
	rightArm.vertices[3].x -= 0.1
	rightArm.vertices[5].x += 0.2
	rightArm.vertices[7].x += 0.2
	rightArm.vertices[5].y += 0.3
	rightArm.vertices[7].y += 0.4
	rightArm.vertices[1].y += 0.3
	rightArm.vertices[0].y += 0.3
	rightArm.vertices[3].y += 0.3
	rightArm.vertices[2].y += 0.4
	body.merge(rightArm)
// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	body.merge(head)
	body.scale(0.5, 0.5, 0.5)
	body.translate(0, 0.56, 0)

	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(body))
// Clothes
// Shirt
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.translate(0, 0.1, 0)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	const leftArm = new THREE.BoxGeometry(0.3, 0.5, 0.5)
	leftArm.translate(0.55, 0.55, 0)
	leftArm.vertices[4].x -= 0.05
	leftArm.vertices[5].x -= 0.05
	leftArm.vertices[0].y -= 0.5
	leftArm.vertices[1].y -= 0.5
	leftArm.vertices[2].y -= 0.4
	leftArm.vertices[3].y -= 0.4
	leftArm.vertices[1].z += 0.1
	leftArm.vertices[3].z += 0.1
	torso.merge(leftArm)
	rightArm = new THREE.BoxGeometry(0.3, 0.5, 0.5)
	rightArm.translate(-0.55, 0.55, 0)
	rightArm.vertices[1].x += 0.05
	rightArm.vertices[0].x += 0.05
	rightArm.vertices[5].y -= 0.5
	rightArm.vertices[4].y -= 0.5
	rightArm.vertices[7].y -= 0.4
	rightArm.vertices[6].y -= 0.4
	rightArm.vertices[4].z += 0.1
	rightArm.vertices[6].z += 0.1
	torso.merge(rightArm)
	torso.scale(0.5, 0.5, 0.5)
	torso.translate(0, 0.56, 0)

	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))
// Pants
	const pant = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	pant.translate(-0.25, -0.8, 0)
	pant.vertices[3].z += 0.2
	pant.vertices[6].z += 0.2
	let leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(-0.25, -0.8, 0.8)
	leg.vertices[0].x -= 0.1
	leg.vertices[2].x -= 0.1
	leg.vertices[5].x += 0.1
	leg.vertices[7].x += 0.1
	leg.vertices[0].y -= 0.2
	leg.vertices[5].y -= 0.2
	pant.merge(leg)
	leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(0.25, -0.8, 0)
	leg.vertices[3].z += 0.2
	leg.vertices[6].z += 0.2
	pant.merge(leg)
	leg = new THREE.BoxGeometry(0.5, 0.5, 0.8)
	leg.translate(0.25, -0.8, 0.8)
	leg.vertices[0].x -= 0.1
	leg.vertices[2].x -= 0.1
	leg.vertices[5].x += 0.1
	leg.vertices[7].x += 0.1
	leg.vertices[0].y -= 0.2
	leg.vertices[5].y -= 0.2
	pant.merge(leg)
	pant.scale(0.5, 0.5, 0.5)
	pant.translate(0, 0.56, 0)

	for (var j = 0; j < pant.faces.length; j++) {
		pant.faces[j].materialIndex = 3;
	}
	meshes.mergeMesh(new THREE.Mesh(pant))
	// Book
	const flap = new THREE.BoxGeometry(0.25, 0.3, 0.02)
	flap.translate(-0.05, 0.75, 0.35)
	flap.rotateY(-0.2)
	const flap2 = new THREE.BoxGeometry(0.25, 0.3, 0.02)
	flap2.translate(0.05, 0.75, 0.35)
	flap2.rotateY(0.2)
	flap.merge(flap2)

	for (var j = 0; j < flap.faces.length; j++) {
		flap.faces[j].materialIndex = 4;
	}
	meshes.mergeMesh(new THREE.Mesh(flap))

	const pages = new THREE.BoxGeometry(0.25, 0.3, 0.05)
	pages.translate(-0.05, 0.75, 0.32)
	pages.rotateY(-0.2)
	const pages2 = new THREE.BoxGeometry(0.25, 0.3, 0.05)
	pages2.translate(0.05, 0.75, 0.32)
	pages2.rotateY(0.2)
	pages.merge(pages2)

	for (var j = 0; j < pages.faces.length; j++) {
		pages.faces[j].materialIndex = 5;
	}
	meshes.mergeMesh(new THREE.Mesh(pages))

	// Shadows
	const pedestrianShadows = new THREE.Geometry()
	const newBody = body.clone(true)
	pedestrianShadows.merge(newBody)
	const newPages = pages.clone(true)
	pedestrianShadows.merge(newPages)
	const newShirt = torso.clone(true)
	newShirt.scale(1.01, 1.01, 1.01)
	pedestrianShadows.merge(newShirt)
	const newPants = pant.clone(true)
	newPants.scale(1.01, 1.01, 1.01)
	pedestrianShadows.merge(newPants)
	const newCover = flap.clone(true)
	pedestrianShadows.merge(newCover)

	for (var j = 0; j < pedestrianShadows.faces.length; j++) {
		pedestrianShadows.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(pedestrianShadows))

	// Add to scene

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.position.set(0, 0.95, -7)
	scene.add(combinedMesh)
}

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
	const shadowCoreGeometry = coreGeometry.clone(true)
	shadowHoe.merge(shadowCoreGeometry)

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
	const shadowCabin = cabinGeometry.clone(true)
	shadowHoe.merge(shadowCabin)

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
	shape.lineTo(1.125, 0.75)
	shape.bezierCurveTo(1.125, 1.25, 0.375, 1.25, 0.375, 0.75)
	shape.bezierCurveTo(0.375, 0.35, 1.125, 0.35, 1.125, 0.75)
	shape.lineTo(1.5, 0.75)
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
	const shadowRubber = truckRubber.clone(true)
	shadowHoe.merge(shadowRubber)

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
	const shadowHub = truckHub.clone(true)
	shadowHoe.merge(shadowHub)

	for (var j = 0; j < truckHub.faces.length; j++) {
		truckHub.faces[j].materialIndex = 2;
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
	combinedMesh.position.set(2.5, 1.4, 2.8)
	scene.add(combinedMesh)
}

function initTruck() {
	const truck = new THREE.Group()
	const shadowCopy = new THREE.Geometry()
	// Base
	const core = new THREE.Geometry()
	const nose = new THREE.BoxGeometry(1, 0.8, 1.3)
	nose.translate(-0.6, 0, 0)
	core.merge(nose)
	const cabin = new THREE.BoxGeometry(0.1, 0.8, 1.3)
	cabin.translate(0.52, 0.25, 0)
	core.merge(cabin)
	const cabinSide = new THREE.BoxGeometry(0.1, 0.7, 0.3)
	cabinSide.translate(0.52, 0.85, 0.5)
	core.merge(cabinSide)
	cabinSide.translate(0, 0, -1)
	core.merge(cabinSide)
	const roof = new THREE.BoxGeometry(0.8, 0.1, 1.3)
	roof.translate(0.17, 1.15, 0)
	roof.vertices[6].x -= 0.05
	roof.vertices[7].x -= 0.05
	core.merge(roof)
	const shieldRight = new THREE.BoxGeometry(0.1, 1, 0.1)
	shieldRight.translate(-0.6, 0.52, -0.6)
	shieldRight.rotateZ(-0.4)
	core.merge(shieldRight)
	shieldRight.translate(0, 0, 1.2)
	core.merge(shieldRight)
	const windshield = new THREE.BoxGeometry(1, 0.8, 1.29)
	// X
	windshield.vertices[4].x += 0.26
	windshield.vertices[5].x += 0.26
	windshield.vertices[6].x -= 0.035
	windshield.vertices[7].x -= 0.035
	// Y
	windshield.vertices[0].y += 2.2
	windshield.vertices[1].y += 2.2
	windshield.vertices[2].y += 2.3
	windshield.vertices[3].y += 2.3
	windshield.vertices[4].y += 2.2
	windshield.vertices[5].y += 2.2
	windshield.vertices[6].y += 2.3
	windshield.vertices[7].y += 2.3
	const shield = new THREE.Mesh(windshield, windowColor)
	truck.add(shield)
	const bed = new THREE.BoxGeometry(3.2, 0.3, 1.3)
	bed.translate(0.9, -0.31, 0)
	core.merge(bed)
	const bedSide = new THREE.BoxGeometry(2.68, 0.6, 0.1)
	bedSide.translate(1.15, 0.1, 0.6)
	core.merge(bedSide)
	bedSide.translate(0, 0, -1.2)
	core.merge(bedSide)
	const bedBack = new THREE.BoxGeometry(0.1, 0.6, 1.3)
	bedBack.translate(2.45, 0.1, 0)
	core.merge(bedBack)
	core.translate(0, 1.5, 0)
	const shadowCore = core.clone(true)
	shadowCopy.merge(shadowCore)
	const base = new THREE.Mesh(core, offwhite)
	base.castShadow = true
	truck.add(base)
	// Inside
	const seat = new THREE.Geometry()
	const seatButt = new THREE.BoxGeometry(0.4, 0.1, 0.4)
	seatButt.translate(0.25, 1.6, 0.3)
	seat.merge(seatButt)
	seatButt.translate(0, 0, -0.6)
	seat.merge(seatButt)
	const seatBack = new THREE.BoxGeometry(0.1, 0.7, 0.4)
	seatBack.translate(0.45, 1.8, 0.3)
	seat.merge(seatBack)
	seatBack.translate(0, 0, -0.6)
	seat.merge(seatBack)
	const steering = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32)
	steering.translate(-1.9, 0.65, 0.3)
	steering.rotateZ(-1.2)
	seat.merge(steering)
	const shadowSeat = seat.clone(true)
	shadowCopy.merge(shadowSeat)
	const seatPiece = new THREE.Mesh(seat, gray)
	truck.add(seatPiece)
	// Bumper

	const bumperGeometry = new THREE.Geometry()
	const frontBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	frontBumper.translate(-0.95, 1.05, 0)
	frontBumper.vertices[2].x += 0.01
	frontBumper.vertices[3].x += 0.01
	bumperGeometry.merge(frontBumper)
	const middleBumper = new THREE.BoxGeometry(1.1, 0.1, 1.4)
	middleBumper.translate(0.7, 1.05, 0)
	middleBumper.vertices[2].x += 0.01
	middleBumper.vertices[3].x += 0.01
	middleBumper.vertices[6].x -= 0.01
	middleBumper.vertices[7].x -= 0.01
	bumperGeometry.merge(middleBumper)
	const backBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	backBumper.translate(2.35, 1.05, 0)
	backBumper.vertices[6].x -= 0.01
	backBumper.vertices[7].x -= 0.01
	bumperGeometry.merge(backBumper)
	const shadowBumper = bumperGeometry.clone(true)
	shadowCopy.merge(shadowBumper)
	const bumper = new THREE.Mesh(bumperGeometry, palegray)
	truck.add(bumper)
	// Wheels
	const wheels = new THREE.Geometry()
	const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32)
	wheelGeometry.translate(-0.3, 0.55, -1.1)
	wheelGeometry.rotateX(1.6)
	wheels.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	wheels.merge(wheelGeometry)
	wheelGeometry.translate(2, 0, 1.2)
	wheels.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	wheels.merge(wheelGeometry)
	const grill = new THREE.BoxGeometry(0.01, 0.7, 1.2)
	grill.translate(-1.1, 1.5, 0)
	wheels.merge(grill)
	const license = new THREE.BoxGeometry(0.05, 0.2, 0.5)
	license.translate(2.5, 1.25, 0)
	wheels.merge(license)
	const shadowWheel = wheels.clone(true)
	shadowCopy.merge(shadowWheel)
	const greys = new THREE.Mesh(wheels, gray)
	greys.castShadow = true
	truck.add(greys)
	// Hubcaps
	const hubs = new THREE.Geometry()
	const hubGeometry = new THREE.TorusGeometry(0.25, 0.1, 3, 199)
	hubGeometry.translate(-0.3, 1.09, 0.63)
	hubs.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	hubs.merge(hubGeometry)
	hubGeometry.translate(2, 0, 1.3)
	hubs.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	hubs.merge(hubGeometry)
	const shadowHubs = hubs.clone(true)
	shadowCopy.merge(shadowHubs)
	const hubcaps = new THREE.Mesh(hubs, offwhite)
	truck.add(hubcaps)
	// Back
	const brakeLights = new THREE.Geometry()
	const leftLight = new THREE.BoxGeometry(0.1, 0.1, 0.1)
	leftLight.translate(2.5, 1.25, 0.45)
	brakeLights.merge(leftLight)
	leftLight.translate(0, 0, -0.9)
	brakeLights.merge(leftLight)
	const shadowlights = brakeLights.clone(true)
	shadowCopy.merge(shadowlights)
	const brakes = new THREE.Mesh(brakeLights, red)
	truck.add(brakes)

	// Lights
	const lightGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.5)
	lightGeometry.translate(0.2, 2.72, 0)
	const shadowlTopLights = lightGeometry.clone(true)
	shadowCopy.merge(shadowlTopLights)
	const light = new THREE.Mesh(lightGeometry, orange)
	light.castShadow = true
	truck.add(light)

	const baseShadow = new THREE.Mesh(shadowCopy, shadows)
	truck.add(baseShadow)

	truck.position.set(0, 0, 7)
	truck.rotation.y += 0.5
	truck.scale.set(0.9, 0.9, 0.9)
	scene.add(truck)
}

function initWorkers()	{
	const worker = new THREE.Group()
	const worker2 = new THREE.Group()
	const worker3 = new THREE.Group()
	const shadowPerson1 = new THREE.Geometry()
	const shadowPerson2 = new THREE.Geometry()
	const shadowPerson3 = new THREE.Geometry()

	// Person 1
	const body = new THREE.Geometry()
	// Arms
	const rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm.translate(0.85, 0.6, 0)
	rightArm.vertices[0].y -= 0.75
	rightArm.vertices[1].y -= 0.75
	rightArm.vertices[2].y -= 0.5
	rightArm.vertices[3].y -= 0.5
	rightArm.vertices[0].x -= 0.5
	rightArm.vertices[1].x -= 0.5
	rightArm.vertices[2].x -= 0.5
	rightArm.vertices[3].x -= 0.5
	rightArm.vertices[0].z -= 0.15
	rightArm.vertices[1].z += 0.15
	rightArm.vertices[2].z -= 0.15
	rightArm.vertices[3].z += 0.15
	body.merge(rightArm)
	const leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[5].y += 0.3
	leftArm.vertices[4].y += 0.3
	leftArm.vertices[7].y += 0.55
	leftArm.vertices[6].y += 0.55
	leftArm.vertices[5].x += 0.8
	leftArm.vertices[4].x += 0.8
	leftArm.vertices[7].x += 0.8
	leftArm.vertices[6].x += 0.8
	leftArm.vertices[5].z += 0.9
	leftArm.vertices[4].z += 1.05
	leftArm.vertices[7].z += 0.9
	leftArm.vertices[6].z += 1.05
	body.merge(leftArm)
	// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	body.merge(head)
	// Mesh
	const person = new THREE.Mesh(body, skinTone2)
	person.castShadow = true
	person.geometry.scale(0.5, 0.5, 0.5)
	const shadowBody = body.clone(true)
	shadowPerson1.merge(shadowBody)
	worker.add(person)
	// Clothes
	// Shirt
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.translate(0, 0.1, 0)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	const shirt1 = new THREE.Mesh(torso, palegray)
	shirt1.castShadow = true
	shirt1.geometry.scale(0.5, 0.5, 0.5)
	const shadowShirt = torso.clone(true)
	shadowPerson1.merge(shadowShirt)
	worker.add(shirt1)
		// Pants
	const leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.translate(-0.25, -1, 0)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.translate(0.25, -1, 0)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	leftLeg.merge(rightLeg)

	const pants1 = new THREE.Mesh(leftLeg, jean)
	pants1.castShadow = true
	pants1.geometry.scale(0.5, 0.5, 0.5)
	const shadowPant = leftLeg.clone(true)
	shadowPerson1.merge(shadowPant)
	worker.add(pants1)

	// Person 2
	const body2 = new THREE.Geometry()
	const rightArm2 = rightArm.clone()
	body2.merge(rightArm2)
	const leftArm2 = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm2.translate(-0.85, 0.6, 0)
	leftArm2.vertices[5].y -= 0.75
	leftArm2.vertices[4].y -= 0.75
	leftArm2.vertices[7].y -= 0.5
	leftArm2.vertices[6].y -= 0.5
	leftArm2.vertices[5].x += 0.5
	leftArm2.vertices[4].x += 0.5
	leftArm2.vertices[7].x += 0.5
	leftArm2.vertices[6].x += 0.5
	leftArm2.vertices[5].z -= 0.15
	leftArm2.vertices[4].z += 0.15
	leftArm2.vertices[7].z -= 0.15
	leftArm2.vertices[6].z += 0.15
	body2.merge(leftArm2)
	// Head
	const head2 = new THREE.SphereGeometry(0.35, 32, 32)
	head2.translate(0, 1.3, 0)
	body2.merge(head2)
	const person2 = new THREE.Mesh(body2, skinTone4)
	person2.castShadow = true
	person2.geometry.scale(0.5, 0.5, 0.5)
	worker2.add(person2)
	// Clothes
	// Shirt
	const shirt2 = new THREE.Mesh(torso, palegray)
	shirt2.castShadow = true
	const shadowShirt2 = torso.clone(true)
	shadowPerson2.merge(shadowShirt2)
	worker2.add(shirt2)
	// Pants
	const pants2 = new THREE.Mesh(leftLeg, jean)
	pants2.castShadow = true
	const shadowPant2 = leftLeg.clone(true)
	shadowPerson2.merge(shadowPant2)
	worker2.add(pants2)

	// Person 3
	const body3 = new THREE.Geometry()
	const rightArm3 = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm3.translate(0.85, 0.6, 0)
	rightArm3.vertices[0].y -= 0.45
	rightArm3.vertices[1].y -= 0.45
	rightArm3.vertices[2].y -= 0.2
	rightArm3.vertices[3].y -= 0.2
	rightArm3.vertices[0].x -= 0.5
	rightArm3.vertices[1].x -= 0.5
	rightArm3.vertices[2].x -= 0.5
	rightArm3.vertices[3].x -= 0.5
	rightArm3.vertices[0].z += 0.45
	rightArm3.vertices[1].z += 0.85
	rightArm3.vertices[2].z += 0.45
	rightArm3.vertices[3].z += 0.85
	body3.merge(rightArm3)
	const leftArm3 = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm3.translate(-0.85, 0.6, 0)
	leftArm3.vertices[5].y -= 0.45
	leftArm3.vertices[4].y -= 0.45
	leftArm3.vertices[7].y -= 0.2
	leftArm3.vertices[6].y -= 0.2
	leftArm3.vertices[5].x += 0.5
	leftArm3.vertices[4].x += 0.5
	leftArm3.vertices[7].x += 0.5
	leftArm3.vertices[6].x += 0.5
	leftArm3.vertices[5].z += 0.45
	leftArm3.vertices[4].z += 0.85
	leftArm3.vertices[7].z += 0.45
	leftArm3.vertices[6].z += 0.85
	body3.merge(leftArm3)
	// Head
	const head3 = new THREE.SphereGeometry(0.35, 32, 32)
	head3.translate(0, 1.3, 0)
	body3.merge(head3)
	const person3 = new THREE.Mesh(body3, skinTone1)
	person3.castShadow = true
	person3.geometry.scale(0.5, 0.5, 0.5)
	worker3.add(person3)
	// Clothes
	// Shirt
	const shirt3 = new THREE.Mesh(torso, palegray)
	shirt3.castShadow = true
	const shadowShirt3 = torso.clone(true)
	shadowPerson3.merge(shadowShirt3)
	worker3.add(shirt3)
	// Pants
	const pants3 = new THREE.Mesh(leftLeg, jean)
	pants3.castShadow = true
	const shadowPant3 = leftLeg.clone(true)
	shadowPerson3.merge(shadowPant3)
	worker3.add(pants3)

// Hat
	const hat = new THREE.Geometry()
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	hat.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	hat.merge(brim)
	const constHat = new THREE.Mesh(hat, truckMaterial)
	constHat.castShadow = true
	const hat2 = constHat.clone()
	const hat3 = constHat.clone()
// Vest
	const vestGeometry = new THREE.Geometry()
	const left = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	left.translate(-0.13, 0.17, 0)
	left.vertices[0].z -= 0.05
	left.vertices[1].z += 0.05
	left.vertices[4].z += 0.05
	left.vertices[4].x += 0.05
	left.vertices[5].z -= 0.05
	left.vertices[5].x += 0.05
	vestGeometry.merge(left)
	const right = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	right.translate(0.13, 0.17, 0)
	right.vertices[5].z -= 0.05
	right.vertices[4].z += 0.05
	right.vertices[1].z += 0.05
	right.vertices[1].x -= 0.05
	right.vertices[0].z -= 0.05
	right.vertices[0].x -= 0.05
	vestGeometry.merge(right)
	const back = new THREE.BoxGeometry(0.2, 0.5, 0.025)
	back.translate(0, 0.17, -0.1875)
	back.vertices[0].z += 0.05
	back.vertices[1].z += 0.05
	back.vertices[4].z += 0.05
	back.vertices[5].z += 0.05
	vestGeometry.merge(back)
	let vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.castShadow = true
	// Stripes
	const vestStripes = new THREE.Geometry()
	const stripeFront = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeFront.translate(-0.11, 0.17, 0.201)
	stripeFront.vertices[0].z -= 0.05
	stripeFront.vertices[1].z -= 0.05
	stripeFront.vertices[4].z -= 0.05
	stripeFront.vertices[5].z -= 0.05
	vestStripes.merge(stripeFront)
	stripeFront.translate(0.22, 0, 0)
	vestStripes.merge(stripeFront)
	const stripeBack = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeBack.translate(-0.11, 0.17, -0.201)
	stripeBack.vertices[0].z += 0.05
	stripeBack.vertices[1].z += 0.05
	stripeBack.vertices[4].z += 0.05
	stripeBack.vertices[5].z += 0.05
	vestStripes.merge(stripeBack)
	stripeBack.translate(0.22, 0, 0)
	vestStripes.merge(stripeBack)
	const stripeTop = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripeTop.translate(-0.11, 0.42, 0)
	vestStripes.merge(stripeTop)
	stripeTop.translate(0.22, 0, 0)
	vestStripes.merge(stripeTop)
	const stripeBottom1 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom1.translate(-0.13, 0.02, 0.201)
	stripeBottom1.vertices[4].x += 0.02
	stripeBottom1.vertices[5].x += 0.02
	stripeBottom1.vertices[0].z -= 0.02
	stripeBottom1.vertices[1].z -= 0.02
	stripeBottom1.vertices[4].z -= 0.02
	stripeBottom1.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom1)
	const stripeBottom2 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom2.translate(0.13, 0.02, 0.201)
	stripeBottom2.vertices[0].x -= 0.02
	stripeBottom2.vertices[1].x -= 0.02
	stripeBottom2.vertices[0].z -= 0.02
	stripeBottom2.vertices[1].z -= 0.02
	stripeBottom2.vertices[4].z -= 0.02
	stripeBottom2.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom2)
	const stripeBottom3 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom3.translate(-0.23, 0.02, 0)
	stripeBottom3.vertices[0].x += 0.02
	stripeBottom3.vertices[1].x += 0.02
	stripeBottom3.vertices[4].x += 0.02
	stripeBottom3.vertices[5].x += 0.02
	stripeBottom3.vertices[0].z -= 0.02
	stripeBottom3.vertices[1].z += 0.02
	stripeBottom3.vertices[4].z += 0.02
	stripeBottom3.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom3)
	const stripeBottom4 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom4.translate(0.23, 0.02, 0)
	stripeBottom4.vertices[0].x -= 0.02
	stripeBottom4.vertices[1].x -= 0.02
	stripeBottom4.vertices[4].x -= 0.02
	stripeBottom4.vertices[5].x -= 0.02
	stripeBottom4.vertices[0].z -= 0.02
	stripeBottom4.vertices[1].z += 0.02
	stripeBottom4.vertices[4].z += 0.02
	stripeBottom4.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom4)
	const stripeBottom5 = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripeBottom5.translate(0, 0.02, -0.201)
	stripeBottom5.vertices[0].x -= 0.02
	stripeBottom5.vertices[1].x -= 0.02
	stripeBottom5.vertices[4].x += 0.02
	stripeBottom5.vertices[5].x += 0.02
	stripeBottom5.vertices[0].z += 0.02
	stripeBottom5.vertices[1].z += 0.02
	stripeBottom5.vertices[4].z += 0.02
	stripeBottom5.vertices[5].z += 0.02
	vestStripes.merge(stripeBottom5)
	const stripes = new THREE.Mesh(vestStripes, yellow)
	vest = new THREE.Mesh(vestGeometry, truckMaterial)
	vest.add(stripes)
	const vest2 = vest.clone()
	const vest3 = vest.clone()

	// Paper
	const paper = new THREE.BoxGeometry(0.8, 0.6, 0.025)
	paper.translate(0, 0.3, 0.25)
	paper.rotateX(0.4)
	const sheet = new THREE.Mesh(paper, white)
	sheet.castShadow = true

	worker.add(constHat)
	worker.add(vest)
	const shadow1 = new THREE.Mesh(shadowPerson1, shadows)
	worker.add(shadow1)

	worker.position.set(2.7, 1.2, 6.5)
	worker.rotation.y -= 1
	scene.add(worker)

	worker2.add(hat2)
	worker2.add(vest2)
	const shadow2 = new THREE.Mesh(shadowPerson2, shadows)
	worker2.add(shadow2)
	worker2.position.set(5.6, 1.2, 6.3)
	worker2.rotation.y += 0.8
	scene.add(worker2)

	worker3.add(hat3)
	worker3.add(vest3)
	worker3.add(sheet)
	const shadow3 = new THREE.Mesh(shadowPerson3, shadows)
	worker3.add(shadow3)
	worker3.position.set(7, 1.2, 6.4)
	worker3.rotation.y -= 0.6
	scene.add(worker3)
}


function render() {
	scene.position.set(0, 0, 3)
	renderer.render(scene, camera)
}

function animate() {
	//requestAnimationFrame(animate)
	render()
	controls.update()
}

init()
animate()

let showing = 'none'

function slide(id) {
	document.getElementById(showing.removeAttribute('style')

	if (showing === id) {
		showing = 'none'
	} else {
		document.getElementById(id).style.width = '300px'
		showing = id
	}
}

function onDocumentMouseMove(event) {
	event.preventDefault()
	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)
	if (selected) {
		if (raycaster.intersectObjects(objects)) {
			selected.position.set(0, 1, 0)
			selected.position.set(raycaster.intersectObjects(objects)[0].point.x, selected.position.y, raycaster.intersectObjects(objects)[0].point.z-3)
		}
	}
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		const object = intersects[0].object
		if (hovered !== object) {
			renderer.domElement.style.cursor = 'pointer'
			hovered = object
		}
	} else if (hovered !== null) {
		renderer.domElement.style.cursor = 'auto'
		hovered = null
	}
}

function onDocumentTouchMove(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)
	if (selected) {
		if (raycaster.intersectObjects(objects)) {
			selected.position.set(0, 1, 0)
			selected.position.set(raycaster.intersectObjects(objects)[0].point.x, selected.position.y, raycaster.intersectObjects(objects)[0].point.z)
		}
	}
}

function onDocumentMouseDown(event) {
	controls.enabled = false
	event.preventDefault()
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		selected = intersects[0].object
		if (raycaster.intersectObjects(objects)) {
			offset.copy(intersection).sub(selected.position)
		}
		renderer.domElement.style.cursor = 'move'
	}
}

function onDocumentTouchStart(event) {
	controls.enabled = false
	event.preventDefault()
	event = event.changedTouches[0]
	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(flaggers)
	if (intersects.length > 0) {
		selected = intersects[0].object
		if (raycaster.intersectObjects(objects)) {
			offset.copy(intersection).sub(selected.position)
		}
		renderer.domElement.style.cursor = 'move'
	}
}

function onDocumentMouseCancel(event) {
	controls.enabled = true
	event.preventDefault()
	if (selected) {
		selected = null
	}
	renderer.domElement.style.cursor = 'auto'
}

function onDocumentTouchEnd(event) {
	controls.enabled = true
	event.preventDefault()
	if (selected) {
		selected = null
	}
	renderer.domElement.style.cursor = 'auto'
}

function flagger(color) {
	let meshes = new THREE.Geometry()
	const materials = [
		color,					// 0
		gray,						// 1
		jean,						// 2
		skinTone1,			// 3
		skinTone2,			// 4
		skinTone3,			// 5
		yellow,					// 6
		truckMaterial,	// 7
		shadows					// 8
	]

	// Torso
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.translate(0, 0.1, 0)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	torso.rotateY(-.5)
	torso.translate(.45, 0, .7)
	torso.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))

	for (var j = 0; j < torso.faces.length; j++) {
		torso.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(torso))


// Hat
	const hat = new THREE.Geometry()
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	hat.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	hat.merge(brim)
	hat.rotateY(-.5)
	hat.translate(.225, 0, .345)

	for (var j = 0; j < hat.faces.length; j++) {
		hat.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(hat))

	for (var j = 0; j < hat.faces.length; j++) {
		hat.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(hat))
// Vest
	const vestGeometry = new THREE.Geometry()
	const left = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	left.translate(-0.13, 0.17, 0)
	left.vertices[0].z -= 0.05
	left.vertices[1].z += 0.05
	left.vertices[4].z += 0.05
	left.vertices[4].x += 0.05
	left.vertices[5].z -= 0.05
	left.vertices[5].x += 0.05
	vestGeometry.merge(left)
	const right = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	right.translate(0.13, 0.17, 0)
	right.vertices[5].z -= 0.05
	right.vertices[4].z += 0.05
	right.vertices[1].z += 0.05
	right.vertices[1].x -= 0.05
	right.vertices[0].z -= 0.05
	right.vertices[0].x -= 0.05
	vestGeometry.merge(right)
	const back = new THREE.BoxGeometry(0.2, 0.5, 0.025)
	back.translate(0, 0.17, -0.1875)
	back.vertices[0].z += 0.05
	back.vertices[1].z += 0.05
	back.vertices[4].z += 0.05
	back.vertices[5].z += 0.05
	vestGeometry.merge(back)
	vestGeometry.rotateY(-.5)
	vestGeometry.translate(.225, 0, .345)

	for (var j = 0; j < vestGeometry.faces.length; j++) {
		vestGeometry.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(vestGeometry))

	for (var j = 0; j < vestGeometry.faces.length; j++) {
		vestGeometry.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(vestGeometry))
	// Stripes
	const vestStripes = new THREE.Geometry()
	let stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, 0.201)
	stripe.vertices[0].z -= 0.05
	stripe.vertices[1].z -= 0.05
	stripe.vertices[4].z -= 0.05
	stripe.vertices[5].z -= 0.05
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, -0.201)
	stripe.vertices[0].z += 0.05
	stripe.vertices[1].z += 0.05
	stripe.vertices[4].z += 0.05
	stripe.vertices[5].z += 0.05
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripe.translate(-0.11, 0.42, 0)
	vestStripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(-0.13, 0.02, 0.201)
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(0.13, 0.02, 0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(-0.23, 0.02, 0)
	stripe.vertices[0].x += 0.02
	stripe.vertices[1].x += 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(0.23, 0.02, 0)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x -= 0.02
	stripe.vertices[5].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	vestStripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripe.translate(0, 0.02, -0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z += 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z += 0.02
	vestStripes.merge(stripe)
	vestStripes.rotateY(-.5)
	vestStripes.translate(.225, 0, .345)

	for (var j = 0; j < vestStripes.faces.length; j++) {
		vestStripes.faces[j].materialIndex = 6;
	}
	meshes.mergeMesh(new THREE.Mesh(vestStripes))

	for (var j = 0; j < vestStripes.faces.length; j++) {
		vestStripes.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(vestStripes))


	const pants = new THREE.Geometry()
	// Legs
	let leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.translate(-0.25, -1, 0)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	pants.merge(leftLeg)
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.translate(0.25, -1, 0)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	pants.merge(rightLeg)
	pants.rotateY(-.5)
	pants.translate(.45, 0, .7)
	pants.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < pants.faces.length; j++) {
		pants.faces[j].materialIndex = 2;
	}
	meshes.mergeMesh(new THREE.Mesh(pants))

	for (var j = 0; j < pants.faces.length; j++) {
		pants.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(pants))

	const body = new THREE.Geometry()
	// Arms
	const rightArm1 = new THREE.BoxGeometry(0.5, 0.4, 0.5)
	rightArm1.translate(0.64, 0.6, 0)
	rightArm1.vertices[0].y -= 0.1
	rightArm1.vertices[0].z += 0.1
	rightArm1.vertices[0].x -= 0.2
	rightArm1.vertices[1].y -= 0.08
	rightArm1.vertices[1].z += 0.3
	rightArm1.vertices[1].x -= 0.1
	rightArm1.vertices[2].z += 0.1
	rightArm1.vertices[2].x -= 0.05
	rightArm1.vertices[2].y += 0.1
	rightArm1.vertices[3].y += 0.2
	rightArm1.vertices[3].z += 0.4
	rightArm1.vertices[3].x += 0.2
	rightArm1.vertices[4].x -= 0.04
	rightArm1.vertices[5].x -= 0.04
	body.merge(rightArm1)
	const rightArm2 = new THREE.BoxGeometry(0.5, 0.3, 0.3)
	rightArm2.translate(1.14, 0.6, 0.3)
	rightArm2.vertices[0].y += 0.25
	rightArm2.vertices[0].z -= 0.1
	rightArm2.vertices[0].x -= 0.65
	rightArm2.vertices[1].y += 0.25
	rightArm2.vertices[1].z += 0.05
	rightArm2.vertices[1].x -= 0.5
	rightArm2.vertices[2].y += 0.55
	rightArm2.vertices[2].z -= 0.05
	rightArm2.vertices[2].x -= 0.55
	rightArm2.vertices[3].y += 0.55
	rightArm2.vertices[3].z += 0.1
	rightArm2.vertices[3].x -= 0.4
	rightArm2.vertices[4].x -= 0.1
	rightArm2.vertices[4].z -= 0.1
	rightArm2.vertices[4].y -= 0.03
	rightArm2.vertices[5].y -= 0.05
	rightArm2.vertices[5].z -= 0.1
	rightArm2.vertices[5].x -= 0.2
	rightArm2.vertices[6].x += 0.2
	rightArm2.vertices[6].y += 0.15
	rightArm2.vertices[6].z += 0.0
	rightArm2.vertices[7].x -= 0.05
	rightArm2.vertices[7].z -= 0.1
	rightArm2.vertices[7].y += 0.05
	body.merge(rightArm2)
	const leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[5].y -= 0.8
	leftArm.vertices[5].z -= 0.1
	leftArm.vertices[4].y -= 0.8
	leftArm.vertices[4].z += 0.1
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[7].z -= 0.1
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[6].z += 0.1
	leftArm.vertices[3].x -= 0.04
	leftArm.vertices[2].x -= 0.04
	body.merge(leftArm)

	// Head
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	body.merge(head)
	body.rotateY(-.5)
	body.translate(.45, 0, .7)
	body.scale(0.5, 0.5, 0.5)
		let min = 3
  	let max = 5
		let skinTone = ~~(Math.random() * (max - min)) + min

	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = skinTone
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	for (var j = 0; j < body.faces.length; j++) {
		body.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(body))

	// Flag
	const object = new THREE.CylinderGeometry(.4, .4, .1, 8)
	object.translate(.75, .25, -.55)
	object.rotateZ(1.25)
	object.rotateY(.75)
	object.rotateX(.5)

	for (var j = 0; j < object.faces.length; j++) {
		object.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(object))

	for (var j = 0; j < object.faces.length; j++) {
		object.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(object))

	const stick = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 32)
	stick.translate(-0.7, 0.05, 0.02)
	stick.scale(0.5, 0.5, 0.5)

	for (var j = 0; j < stick.faces.length; j++) {
		stick.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(stick))

	for (var j = 0; j < stick.faces.length; j++) {
		stick.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(stick))



	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.position.set(-1, 1.2, -1)
	scene.add(combinedMesh)
	flaggers.push(combinedMesh)

	const person2 = combinedMesh.clone(true)
	person2.position.set(1, 1.2, -1)
	scene.add(person2)
	flaggers.push(person2)

	// Hammer.js
/*
	var movable = new Hammer(person2)
	movable.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
	movable.on("pan", handleDrag)
	var lastPosX = 0
	var lastPosY = 0
	var isDragging = false

	const rect = renderer.domElement.getBoundingClientRect()
	mouse.x = (((event.clientX - rect.left) / rect.width) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / rect.height) * 2) + 1
	raycaster.setFromCamera(mouse, camera)

	function handleDrag(event) {
		controls.enabled = false
		console.log('dragging')
		var elem = event.target
		if ( ! isDragging ) {
	    isDragging = true
	    lastPosX = elem.offsetLeft
	    lastPosY = elem.offsetTop
	  }
		/*
		var posX = ev.deltaX + lastPosX
	  var posY = ev.deltaY + lastPosY

	  elem.style.left = posX + "px"
	  elem.style.top = posY + "px"


		if (selected) {
			if (raycaster.intersectObjects(objects)) {
				selected.position.set(0, 1, 0)
				selected.position.set(raycaster.intersectObjects(objects)[0].point.x, selected.position.y, raycaster.intersectObjects(objects)[0].point.z)
			}
		}
	  if (event.isFinal) {
	    isDragging = false
	  }

	} */
}

const signs = [[], [], [], [], [], [], []]

function signArray(group, checkbox) {
	const idx = signs[group].indexOf(checkbox.value)

	if (idx !== -1) {				 								// If already in array
		signs[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		signs[group].unshift(checkbox.value)	// Add to end of array
	}
}

function signSpace(color, group, start) {
	let meshes = new THREE.Geometry()
	const materials = [
		color,										// 0
		workerSignMaterial,				// 1
		flaggerSignMaterial,			// 2
		flagAheadSignMaterial,		// 3
		menWorkSignMaterial,			// 4
		prepareStopSignMaterial,	// 5
		oneLaneSignMaterial,			// 6
		workAheadSignMaterial,		// 7
		shadows										// 8
	]
	const signImages = signs[group]
	const spacing = Number(document.getElementById('sign-' + group).value) / 200
	let x = 0
	let pos = start - spacing
	const signBase = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 4)
	signBase.rotateX(1.5)
	signBase.rotateZ(1.6)
	signBase.translate(pos, 3, (4 + (group * 0.5)))
	const signColor = new THREE.CylinderGeometry(1, 1, 0.1, 4)
	signColor.rotateX(1.5)
	signColor.rotateZ(1.6)
	signColor.translate((pos + 0.01), 3, (4 + (group * 0.5)))
	const stick = new THREE.CylinderGeometry(0.05, 0.05, 2, 32)
	stick.translate((pos + 0.01), 1.2, (4 + (group * 0.5)))

	for (let i = 0; i < signImages.length && pos >= -22; i++) {
		switch (signImages[i]) {
			case 'worker':
				x = 1
				break
			case 'flagger':
				x = 2
				break
			case 'fAhead':
				x = 3
				break
			case 'men':
				x = 4
				break
			case 'stop':
				x = 5
				break
			case 'lane':
				x = 6
				break
			default:
				x = 7
				break
		}

		for (var j = 0; j < signBase.faces.length; j++) {
			signBase.faces[j].materialIndex = x;
		}
		meshes.mergeMesh(new THREE.Mesh(signBase))

		for (var j = 0; j < signColor.faces.length; j++) {
			signColor.faces[j].materialIndex = 0;
		}
		meshes.mergeMesh(new THREE.Mesh(signColor))

		for (var j = 0; j < stick.faces.length; j++) {
			stick.faces[j].materialIndex = 0;
		}
		meshes.mergeMesh(new THREE.Mesh(stick))

		// Position
		pos -= 2
		signBase.translate(-2, 0, 0)
		signColor.translate(-2, 0, 0)
		stick.translate(-2, 0, 0)
	}

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = 'signGroup-' + group
	scene.add(combinedMesh)
}

function test(group, color) {
	let meshes = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		color,		// 0
		white,		// 1
		shadows		// 2
	]
	const cone = coneGeometry.clone(true)
	const stripe = stripeGeometry.clone(true)
	const coneGroup = new THREE.Geometry()
	const stripeGroup = new THREE.Geometry()
	let initialX

	// Remove old render if it exists
	if (scene.getObjectByName(group+'-cones')) {
		scene.remove(scene.getObjectByName(group+'-cones'))
		//scene.getObjectByName(group+'-cones').geometry.dispose()
	}
	if (scene.getObjectByName(group+'-shadows')) {
		scene.remove(scene.getObjectByName(group+'-shadows'))
		//scene.getObjectByName(group+'-shadows').geometry.dispose()
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}

/* Buffer */

	switch (group) {
		case 1:
			initialX = 0
			break
		case 2:
			initialX = -0.5
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
	const buffer = Number(document.getElementById('buffer-' + group).value)
	cone.translate(initialX, 0.75, 0.5)
	coneGroup.merge(cone)
	stripe.translate(initialX, 0.75, 0.5)
	stripeGroup.merge(stripe)

	let x = initialX
	let cones = 1 + (buffer / 100)
	let spacing = (buffer / 50) / cones

	while (Math.abs(x - spacing) <= (Math.abs((buffer / 50)) - initialX) && Math.abs(x) <= 23) {
		cone.translate(-spacing, 0, 0)
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, 0)
		stripeGroup.merge(stripe)
		x -= spacing
	}

/* Transition Taper */

	const upstream = Number(document.getElementById('upstream-' + group).value)
	cones = 2 + (upstream / 100)
	spacing = (upstream / 50) / cones
	let y = (3 / cones) + 0.5
	for (let i = 1; i <= cones; i++) {
		cone.translate(-spacing, 0, (3 / cones))
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, (3 / cones))
		stripeGroup.merge(stripe)
		x -= spacing
		y += 3 / cones
	}

/* Sign Spacing */
	signSpace(color, group, x)

/* Downstream Taper */

	switch (group) {
		case 1:
			initialX = 9
			break
		case 2:
			initialX = 9.5
			break
		case 3:
			initialX = 10
			break
		case 4:
			initialX = 10.5
			break
		case 5:
			initialX = 11
			break
		case 6:
			initialX = 11.5
			break
		default:
			break
	}
	const downstream = Number(document.getElementById('downstream-' + group).value)
	cone.translate(Math.abs(x)+initialX, 0, -Math.abs(y)+.5)
	stripe.translate(Math.abs(x)+initialX, 0, -Math.abs(y)+.5)
	x = initialX
	cones = 2 + (downstream / 100)
	spacing = (downstream / 50) / cones
	y = 0.5
	while (Math.abs(x) <= ((downstream / 50) + initialX) && Math.abs(x) <= 21.5) {
		cone.translate(spacing, 0, (3 / cones))
		coneGroup.merge(cone)
		stripe.translate(spacing, 0, (3 / cones))
		stripeGroup.merge(stripe)
		y += 3 / cones
		x += spacing
	}

/* Give Group A Name and Add To Scene */

	for (var j = 0; j < coneGroup.faces.length; j++) {
		coneGroup.faces[j].materialIndex = 0;
	}
	meshes.mergeMesh(new THREE.Mesh(coneGroup))

	for (var j = 0; j < stripeGroup.faces.length; j++) {
		stripeGroup.faces[j].materialIndex = 1;
	}
	meshes.mergeMesh(new THREE.Mesh(stripeGroup))

	shadow.merge(coneGroup)

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = (group+'-cones')
	scene.add(combinedMesh)

	shadow = new THREE.BufferGeometry().fromGeometry(shadow)
	let combinedShadows = new THREE.Mesh(shadow, shadows)
	combinedShadows.receiveShadow = true
	combinedShadows.name = (group+'-shadows')
	scene.add(combinedShadows)

/* Close Sidebar */
	slide('group-' + group)
	flagger(color)
	animate()
}
