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
