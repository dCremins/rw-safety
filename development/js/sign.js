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

		shadow.mergeMesh(signBase)
		for (var j = 0; j < signBase.faces.length; j++) {
			signBase.faces[j].materialIndex = x;
		}
		meshes.mergeMesh(new THREE.Mesh(signBase))

		shadow.mergeMesh(signColor)
		for (var j = 0; j < signColor.faces.length; j++) {
			signColor.faces[j].materialIndex = 0;
		}
		meshes.mergeMesh(new THREE.Mesh(signColor))

		shadow.mergeMesh(stick)
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
	for (var j = 0; j < shadow.faces.length; j++) {
		shadow.faces[j].materialIndex = 8;
	}
	meshes.mergeMesh(new THREE.Mesh(shadow))

	meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	let combinedMesh = new THREE.Mesh(meshes, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = 'signGroup-' + group
	scene.add(combinedMesh)
}
