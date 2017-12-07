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

function signSpace(color, group) {
	let meshes = new THREE.Geometry()
	const shadow = new THREE.Geometry()
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
	const signBase = new THREE.CylinderGeometry(2.8, 2.8, 0.1, 4)
	const signColor = new THREE.CylinderGeometry(3.2, 3.2, 0.1, 4)
	let xPos = 12.5

	if (Math.abs(group % 2) !== 0) {
		xPos -= 3
	}

	signBase.rotateY(1.6)
	signBase.translate(xPos, 0.5, (-10 + (group * 4)))
	signColor.rotateY(1.6)
	signColor.translate(xPos, 0.48, (-10 + (group * 4)))

	if (signImages.length > 0) {
		var signSpacing = document.getElementById('sign-' + group).value
		var loader = new THREE.FontLoader();

		loader.load( 'includes/helvetiker_regular.typeface.json', function ( font ) {
			var geometry = new THREE.TextGeometry( signSpacing, {
				font: font,
				size: 2,
				height: .2,
				curveSegments: 12,
				bevelEnabled: false
			} )
				geometry.rotateX(-1.6)
				let textMesh = new THREE.Mesh(geometry, white)
				textMesh.position.set((xPos + 4), .5, (-9 + (group * 4)))
				scene.add(textMesh)
				render()
		} )
	}

	let x

	for (let i = 0; i < signImages.length; i++) {
		switch (signImages[i]) {
			case 'worker':
				x = 1
				break
			case 'flagger':
				x = 2
				break
			case 'transition':
				x = 6
				break
			case 'machinery':
				x = 6
				break
			case 'utility':
				x = 6
				break
			case 'flagmen':
				x = 6
				break
			case 'const':
				x = 6
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

		signBase.translate(-6.5, 0, 0)
		signColor.translate(-6.5, 0, 0)
	} // End For

	for (var j = 0; j < shadow.faces.length; j++) {
		shadow.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(shadow))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = 'signGroup-' + group
	scene.add(combinedMesh)

	if (arrows[group].length > 0) {
		arrowSign(color, group)
	}

}
