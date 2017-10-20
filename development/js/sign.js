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
	const signGrouped = new THREE.Group()
	const spacing = Number(document.getElementById('sign-' + group).value) / 200

	// Get Signs

	const signImages = signs[group]
	let sign1
	let pos = start - spacing
	for (let i = 0; i < signImages.length && pos >= -22; i++) {
		// Image

		const signBase = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 4)
		signBase.rotateX(1.5)
		signBase.rotateZ(1.6)

		switch (signImages[i]) {
			case 'worker':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, workerSignMaterial, safetyOrange])
				break
			case 'flagger':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, flaggerSignMaterial, safetyOrange])
				break
			case 'fAhead':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, flagAheadSignMaterial, safetyOrange])
				break
			case 'men':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, menWorkSignMaterial, safetyOrange])
				break
			case 'stop':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, prepareStopSignMaterial, safetyOrange])
				break
			case 'lane':
				sign1 = new THREE.Mesh(signBase, [safetyOrange, oneLaneSignMaterial, safetyOrange])
				break
			default:
				sign1 = new THREE.Mesh(signBase, [safetyOrange, workAheadSignMaterial, safetyOrange])
				break
		}

		sign1.position.set(pos, 3, (4 + (group * 0.5)))
		signGrouped.add(sign1)

		// Group Color Backing

		const signColor = new THREE.CylinderGeometry(1, 1, 0.1, 4)
		signColor.rotateX(1.5)
		signColor.rotateZ(1.6)
		const signColorBack = new THREE.Mesh(signColor, color)
		signColorBack.position.set((pos + 0.01), 3, (4 + (group * 0.5)))
		signGrouped.add(signColorBack)

		// Stick

		const stick = new THREE.CylinderGeometry(0.05, 0.05, 2, 32)
		const signStick = new THREE.Mesh(stick, color)
		signStick.position.set((pos + 0.01), 1.2, (4 + (group * 0.5)))
		signGrouped.add(signStick)
		console.log((4 + (group / 0.5)))
		// Position and Add to Scene
		pos -= 2
	}

	signGrouped.name = 'signGroup-' + group
	scene.add(signGrouped)
}
