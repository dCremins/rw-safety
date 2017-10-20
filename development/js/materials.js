const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')

OrbitControls(THREE)

/* Variables */
let scene
let camera
let controls
let renderer
let ambient
let sun
const objects = []
const flaggers = []

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const offset = new THREE.Vector3()
const intersection = new THREE.Vector3()
let selected = null
let hovered = null
// Scenery
const road = new THREE.MeshLambertMaterial({color: 0x87836E})
const lines = new THREE.LineBasicMaterial({color: 0xFFFFFF})
const divider = new THREE.MeshLambertMaterial({color: 0xFFFF86})
const grass = new THREE.MeshLambertMaterial({color: 0x77C997})
const treeTall = new THREE.MeshLambertMaterial({color: 0x62C192})
const shadows = new THREE.ShadowMaterial({opacity: 0.3})
const windowColor = new THREE.MeshLambertMaterial({color: 0xD0DDE3, transparent: true, opacity: 0.5})
const brick = new THREE.MeshLambertMaterial({color: 0xAA5050})
const stone = new THREE.MeshLambertMaterial({color: 0xE5D2A9})
const truckMaterial = new THREE.MeshLambertMaterial({color: 0xEF8547})
const foundation = new THREE.MeshLambertMaterial({color: 0xF4EEEF})
const couchFabric = new THREE.MeshLambertMaterial({color: 0x638464})
const blueFabric = new THREE.MeshLambertMaterial({color: 0x5E7E9B})
const purpleFabric = new THREE.MeshLambertMaterial({color: 0x805C8E})
const tanFabric = new THREE.MeshLambertMaterial({color: 0xE8C1A0})
// Skin
const skinTone1 = new THREE.MeshLambertMaterial({color: 0x8D5524}) // Brown
const skinTone2 = new THREE.MeshLambertMaterial({color: 0xC68642}) // Light Brown
const skinTone3 = new THREE.MeshLambertMaterial({color: 0xF1C27D}) // Tan
const skinTone4 = new THREE.MeshLambertMaterial({color: 0xFFDBAC}) // Pale

// Colors
const red = new THREE.MeshLambertMaterial({color: 0xF87676})
const green = new THREE.MeshLambertMaterial({color: 0x78C789})
const blue = new THREE.MeshLambertMaterial({color: 0x22B8E2})
const orange = new THREE.MeshLambertMaterial({color: 0xF6B331})
const safetyOrange = new THREE.MeshLambertMaterial({color: 0xFF7900})
const yellow = new THREE.MeshLambertMaterial({color: 0xFDDB4C})
const purple = new THREE.MeshLambertMaterial({color: 0xB78DD1})
const white = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
const offwhite = new THREE.MeshLambertMaterial({color: 0xF2F2F2})
const gray = new THREE.MeshLambertMaterial({color: 0x555555})
const palegray = new THREE.MeshLambertMaterial({color: 0xA5A5A5})
const jean = new THREE.MeshLambertMaterial({color: 0x416BAD})
// Signs
const workerSign = new THREE.TextureLoader().load('includes/images/sign-01.png')
const workerSignMaterial = new THREE.MeshBasicMaterial({map: workerSign})
const flaggerSign = new THREE.TextureLoader().load('includes/images/sign-02.png')
const flaggerSignMaterial = new THREE.MeshBasicMaterial({map: flaggerSign})
const flagAheadSign = new THREE.TextureLoader().load('includes/images/sign-03.png')
const flagAheadSignMaterial = new THREE.MeshBasicMaterial({map: flagAheadSign})
const menWorkSign = new THREE.TextureLoader().load('includes/images/sign-04.png')
const menWorkSignMaterial = new THREE.MeshBasicMaterial({map: menWorkSign})
const prepareStopSign = new THREE.TextureLoader().load('includes/images/sign-05.png')
const prepareStopSignMaterial = new THREE.MeshBasicMaterial({map: prepareStopSign})
const oneLaneSign = new THREE.TextureLoader().load('includes/images/sign-06.png')
const oneLaneSignMaterial = new THREE.MeshBasicMaterial({map: oneLaneSign})
const workAheadSign = new THREE.TextureLoader().load('includes/images/sign-07.png')
const workAheadSignMaterial = new THREE.MeshBasicMaterial({map: workAheadSign})
// Geometry
const tallTree = new THREE.Geometry()
const tallCone = new THREE.ConeGeometry(1.68, 4, 32)
tallCone.translate(0, 1.35, 0)
tallTree.merge(tallCone)
const tallSphere = new THREE.SphereGeometry(1.8, 60, 60)
tallSphere.translate(0, -1.3, 0)
tallTree.merge(tallSphere)
const shortTree = tallTree.clone()
shortTree.scale(0.5, 0.5, 0.5)
/* Cone */
const coreGeometry = new THREE.CylinderGeometry(0.07, 0.2, 0.5, 32, 0.8, false, 0.8)
const coneBottomG = new THREE.BoxGeometry(0.5, 0.06, 0.5)
coneBottomG.translate(0, -0.23, 0)
const coneGeometry = new THREE.Geometry()
coneGeometry.merge(coreGeometry)
coneGeometry.merge(coneBottomG)
const stripeGeometry = new THREE.CylinderGeometry(0.116, 0.155, 0.15, 32, 1, false, 0.8)
const stripe = new THREE.Mesh(stripeGeometry, white)
