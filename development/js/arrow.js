const arrows = [[], [], [], [], [], [], []]

function arrowArray(group, checkbox) {
	const idx = arrows[group].indexOf(checkbox.value)

	if (idx !== -1) {				 								// If already in array
		arrows[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		arrows[group].unshift(checkbox.value)	// Add to end of array
	}
}

function arrowSign(color, group) {
	let meshes = new THREE.Geometry()
	let newMesh = new THREE.Geometry()
	let shadow = new THREE.Geometry()
	const materials = [
		color,					// 0
		gray,						// 1
		truckMaterial		// 2
	]

	const sign = new THREE.Geometry()
	const lights = new THREE.Geometry()
	const sign2 = new THREE.Geometry()
	const lights2 = new THREE.Geometry()

	const board = new THREE.BoxGeometry(3, 2.2, 0.2)
	//board.rotateY(.25)
	//board.rotateY(1.55)
	board.translate(0, 3, -16)
	sign.merge(board)
	sign2.merge(board)

	const deadLight = new THREE.CylinderGeometry(.1, .1, .1, 32)
	deadLight.rotateX(1.55)
	// Row One -->
	deadLight.translate(-1.1, 3.7, -15.9)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	// Row Two <--
	deadLight.translate(0, -.35, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	lights.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	// Row Three -->
	deadLight.translate(0, -.35, 0)
	lights.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	lights2.merge(deadLight)
	// Row Four <--
	deadLight.translate(0, -.35, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	lights.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(-.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	// Row Five -->
	deadLight.translate(0, -.35, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	lights.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	lights2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)
	deadLight.translate(.35, 0, 0)
	sign.merge(deadLight)
	sign2.merge(deadLight)

const wheel = new THREE.CylinderGeometry(0.26, 0.26, 0.26, 32)
wheel.rotateZ(1.58)
wheel.translate(1.4, 0.745, -16.1)
sign.merge(wheel)
sign2.merge(wheel)
wheel.translate(-2.9, 0, 0)
sign.merge(wheel)
sign2.merge(wheel)

for (var j = 0; j < sign.faces.length; j++) {
	sign.faces[j].materialIndex = 1;
}
meshes.mergeMesh(new THREE.Mesh(sign))

for (var j = 0; j < sign2.faces.length; j++) {
	sign2.faces[j].materialIndex = 1;
}
newMesh.mergeMesh(new THREE.Mesh(sign2))

//// lights ////
for (var j = 0; j < lights.faces.length; j++) {
	lights.faces[j].materialIndex = 2;
}
meshes.mergeMesh(new THREE.Mesh(lights))
for (var j = 0; j < lights2.faces.length; j++) {
	lights2.faces[j].materialIndex = 2;
}
newMesh.mergeMesh(new THREE.Mesh(lights2))

// Stand

const stand = new THREE.Geometry()
const vertical = new THREE.CylinderGeometry(.05, .05, .5, 32)
vertical.translate(-1.1, 2.95, -16.1)
stand.merge(vertical)
vertical.translate(0, -0.5, 0)
stand.merge(vertical)
vertical.translate(0, -0.5, 0)
stand.merge(vertical)
vertical.translate(0, -0.47, 0)
stand.merge(vertical)
vertical.translate(-0.2, 0, 0)
stand.merge(vertical)
vertical.translate(0, -0.5, 0)
stand.merge(vertical)

vertical.translate(2.501, 0, 0)
stand.merge(vertical)
vertical.translate(0, 0.5, 0)
stand.merge(vertical)
vertical.translate(-0.2, 0, 0)
stand.merge(vertical)
vertical.translate(0, .47, 0)
stand.merge(vertical)
vertical.translate(0, 0.5, 0)
stand.merge(vertical)
vertical.translate(0, 0.5, 0)
stand.merge(vertical)

const horizontal = new THREE.CylinderGeometry(.05, .05, 2.601, 32)
horizontal.rotateZ(1.58)
horizontal.translate(-0.05, 1.75, -16.1)
stand.merge(horizontal)
horizontal.translate(0, -0.5, 0)
stand.merge(horizontal)
horizontal.translate(0, -0.5, 0)
stand.merge(horizontal)

const hub = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32, 1, false, 0, 3.1)
hub.rotateZ(1.58)
hub.translate(1.4, 0.75, -16.1)
stand.merge(hub)
hub.translate(-2.9, 0, 0)
stand.merge(hub)

for (var j = 0; j < stand.faces.length; j++) {
stand.faces[j].materialIndex = 0;
}
meshes.mergeMesh(new THREE.Mesh(stand))
newMesh.mergeMesh(new THREE.Mesh(stand))

// Mesh
//meshes.rotateY(-1.2)
meshes.translate(-1.8, 0, 15.5)
meshes = new THREE.BufferGeometry().fromGeometry(meshes)
const combinedMesh = new THREE.Mesh(meshes, materials)
combinedMesh.castShadow = true
combinedMesh.rotation.set(0, -1.2, 0)
combinedMesh.position.set(-1, 0, -14)
scene.add(combinedMesh)
flaggers.push(combinedMesh)


//const newMesh = meshes.clone(true)
newMesh.translate(-.2, 0, 14)
const newCombinedMesh = new THREE.Mesh(newMesh, materials)
newCombinedMesh.rotation.set(0, 1.2, 0)
newCombinedMesh.position.set(12, 0, -15.5)
newCombinedMesh.castShadow = true
scene.add(newCombinedMesh)
flaggers.push(newCombinedMesh)

let box = new THREE.BoxGeometry(1, 3, 1)
let center = new THREE.Mesh(box, white)
scene.add(center)

}
