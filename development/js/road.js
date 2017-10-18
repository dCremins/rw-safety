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
