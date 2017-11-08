function initShop()	{
	let meshes = new THREE.Geometry()
	let shopShadow = new THREE.Geometry()
	const materials = [
		offwhite,				// 0
		windowColor,		// 1
		stone,					// 2
		red,						// 3
		blue,						// 4
		purple,					// 5
		orange,					// 6
		shadows					// 7
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
		awningA.faces[j].materialIndex = 0;
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

	for (var j = 0; j < shopShadow.faces.length; j++) {
		shopShadow.faces[j].materialIndex = 7;
	}
	meshes.mergeMesh(new THREE.Mesh(shopShadow))

// Create the combined mesh
meshes = new THREE.BufferGeometry().fromGeometry(meshes)
let combinedMesh = new THREE.Mesh(meshes, materials)
combinedMesh.position.set(8, 1, -8)
combinedMesh.castShadow = true

scene.add(combinedMesh)
}
