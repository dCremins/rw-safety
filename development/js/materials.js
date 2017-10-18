/* Variables */
var scene, camera, controls, renderer, ambient, sun, raycaster
var objects = []
var flaggers = []

raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var offset = new THREE.Vector3()
var intersection = new THREE.Vector3()
var selected = null, hovered = null
// Scenery
var road = new THREE.MeshLambertMaterial({ color: 0x87836E })
var lines = new THREE.LineBasicMaterial({ color: 0xFFFFFF })
var divider = new THREE.MeshLambertMaterial({ color: 0xFFFF86 })
var grass = new THREE.MeshLambertMaterial({ color: 0x77c997 })
var treeTall = new THREE.MeshLambertMaterial({ color: 0x62c192})
var treeShort = new THREE.MeshLambertMaterial({ color: 0x78c9a1 })
var shadows = new THREE.ShadowMaterial({ opacity: .3  })
var windowColor = new THREE.MeshLambertMaterial({ color: 0xD0DDE3, transparent: true, opacity: .5 })
var indoorColor = new THREE.MeshBasicMaterial({ color: 0xD0DDE3})
var brick = new THREE.MeshLambertMaterial({ color: 0xaa5050 })
var stone = new THREE.MeshLambertMaterial({ color: 0xe5d2a9 })
var truckMaterial = new THREE.MeshLambertMaterial({ color: 0xef8547 })
var foundation = new THREE.MeshLambertMaterial({ color: 0xF4EEEF })
var awningRed = new THREE.MeshLambertMaterial({ color: 0xbad3d8 })
var molding = new THREE.MeshLambertMaterial({ color: 0xbad3d8 })
var couchFabric = new THREE.MeshLambertMaterial({ color: 0x638464 })
var blueFabric = new THREE.MeshLambertMaterial({ color: 0x5e7e9b })
var purpleFabric = new THREE.MeshLambertMaterial({ color: 0x805c8e})
var tanFabric = new THREE.MeshLambertMaterial({ color: 0xe8c1a0 })
// Skin
var skinTone1 = new THREE.MeshLambertMaterial({ color: 0x8d5524 }) // Brown
var skinTone2 = new THREE.MeshLambertMaterial({ color: 0xc68642 }) // Light Brown
var skinTone3 = new THREE.MeshLambertMaterial({ color: 0xf1c27d }) // Tan
var skinTone4 = new THREE.MeshLambertMaterial({ color: 0xffdbac }) // Pale

// Colors
var red = new THREE.MeshLambertMaterial({ color: 0xF87676})
var green = new THREE.MeshLambertMaterial({ color: 0x78C789 })
var blue = new THREE.MeshLambertMaterial({ color: 0x22B8E2 })
var orange = new THREE.MeshLambertMaterial({ color: 0xF6B331 })
var safetyOrange = new THREE.MeshLambertMaterial({ color: 0xFF7900})
var yellow = new THREE.MeshLambertMaterial({ color: 0xFDDB4C })
var purple = new THREE.MeshLambertMaterial({ color: 0xB78DD1 })
var white = new THREE.MeshLambertMaterial({ color: 0xffffff })
var offwhite = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 })
var gray = new THREE.MeshLambertMaterial({ color: 0x555555 })
var palegray = new THREE.MeshLambertMaterial({ color: 0xa5a5a5 })
var jean = new THREE.MeshLambertMaterial({ color: 0x416bad })
// Signs
var workerSign = new THREE.TextureLoader().load( "includes/images/sign-01.png" )
var workerSignMaterial = new THREE.MeshBasicMaterial( { map: workerSign } )
var flaggerSign = new THREE.TextureLoader().load( "includes/images/sign-02.png" )
var flaggerSignMaterial = new THREE.MeshBasicMaterial( { map: flaggerSign } )
var flagAheadSign = new THREE.TextureLoader().load( "includes/images/sign-03.png" )
var flagAheadSignMaterial = new THREE.MeshBasicMaterial( { map: flagAheadSign } )
var menWorkSign = new THREE.TextureLoader().load( "includes/images/sign-04.png" )
var menWorkSignMaterial = new THREE.MeshBasicMaterial( { map: menWorkSign } )
var prepareStopSign = new THREE.TextureLoader().load( "includes/images/sign-05.png" )
var prepareStopSignMaterial = new THREE.MeshBasicMaterial( { map: prepareStopSign } )
var oneLaneSign = new THREE.TextureLoader().load( "includes/images/sign-06.png" )
var oneLaneSignMaterial = new THREE.MeshBasicMaterial( { map: oneLaneSign } )
var workAheadSign = new THREE.TextureLoader().load( "includes/images/sign-07.png" )
var workAheadSignMaterial = new THREE.MeshBasicMaterial( { map: workAheadSign } )
// Geometry
var tallTree = new THREE.Geometry()
var tallCone = new THREE.ConeGeometry( 1.68, 4, 32 )
tallCone.translate(0, 1.35, 0)
tallTree.merge(tallCone)
var tallSphere = new THREE.SphereGeometry( 1.8, 60, 60)
tallSphere.translate(0, -1.3, 0)
tallTree.merge(tallSphere)
var shortTree = tallTree.clone()
shortTree.scale(.5, .5, .5)
/* Cone */
var coreGeometry = new THREE.CylinderGeometry(.07, .2, .5, 32, .8, false, .8)
var coneBottomG = new THREE.BoxGeometry( .5, .06, .5 )
coneBottomG.translate(0, -.23, 0)
var coneGeometry = new THREE.Geometry()
coneGeometry.merge(coreGeometry)
coneGeometry.merge(coneBottomG)
var stripeGeometry = new THREE.CylinderGeometry(.116, .155, .15, 32, 1, false, .8)
var stripe = new THREE.Mesh( stripeGeometry, white )
