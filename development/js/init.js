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
