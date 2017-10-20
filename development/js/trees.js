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
