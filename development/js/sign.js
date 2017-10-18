var signs = [[], [], [], [], [], [], []]

function signArray(group, checkbox) {
  var idx = signs[group].indexOf(checkbox.value);

    if (idx !== -1) {         // if already in array
    	signs[group].splice(idx, 1); // make sure we remove it
    }

    if (checkbox.checked) {    // if checked
    	signs[group].unshift(checkbox.value);  // add to end of array
    }
}

function signSpace(color, group, start) {
    var signGrouped = new THREE.Group()
    var spacing = Number(document.getElementById('sign-'+group).value)/200

    // Get Signs

    var signImages = signs[group]
    var pos = start-spacing
    for (var i = 0; i < signImages.length && pos >= -22; i++) {
      // Image

    	var signBase = new THREE.CylinderGeometry(.8, .8, .1, 4)
    	signBase.rotateX(1.5)
    	signBase.rotateZ(1.6)

      switch (signImages[i]) {
        case 'worker':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, workerSignMaterial, safetyOrange])
          break
        case 'flagger':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, flaggerSignMaterial, safetyOrange])
          break
        case 'fAhead':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, flagAheadSignMaterial, safetyOrange])
          break
        case 'men':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, menWorkSignMaterial, safetyOrange])
          break
        case 'stop':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, prepareStopSignMaterial, safetyOrange])
          break
        case 'lane':
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, oneLaneSignMaterial, safetyOrange])
          break
        default:
          var sign1 = new THREE.Mesh(signBase, [safetyOrange, workAheadSignMaterial, safetyOrange])
          break
      }

    	sign1.position.set(pos, 3, (4+(group*.5)))
    	signGrouped.add(sign1)

      // Group Color Backing

    	var signColor = new THREE.CylinderGeometry(1, 1, .1, 4)
    	signColor.rotateX(1.5)
    	signColor.rotateZ(1.6)
    	var signColorBack = new THREE.Mesh(signColor, color)
    	signColorBack.position.set((pos+.01), 3, (4+(group*.5)))
    	signGrouped.add(signColorBack)

      // Stick

      var stick = new THREE.CylinderGeometry(.05, .05, 2, 32)
    	var signStick = new THREE.Mesh(stick, color)
    	signStick.position.set((pos+.01), 1.2, (4+(group*.5)))
    	signGrouped.add(signStick)
console.log((4+(group/.5)))
      // Position and Add to Scene
      pos -= 2
    }

    signGrouped.name = 'signGroup-'+group
    scene.add(signGrouped)
}
