
function render() {
	scene.position.set(0, 0, 3)
	renderer.render(scene, camera)
}

function animate() {
	requestAnimationFrame(animate)
	render()
	controls.update()
}

init()
animate()
new AlloyTouch({
  touch: '#container',    // Touch the whole document
  factor: 3,       		// Friction coefficient
  moveFactor: 0.01,     		// Touch move friction coefficient
	touchStart : onDocumentTouchStart,
  touchMove : onDocumentTouchMove,
  touchEnd : onDocumentTouchEnd,
  pressMove : onDocumentTouchMove
})
