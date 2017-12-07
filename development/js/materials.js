/* Variables */
let scene
let camera
let controls
let renderer
let ambient
let sun
let objectPlane
const flaggers = []

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const plane = new THREE.Plane()
const offset = new THREE.Vector3()
const intersection = new THREE.Vector3()
let selected = null
let dragged = null
let hovered = null
// Colors
const red = new THREE.MeshLambertMaterial({color: 0xd16262})
const green = new THREE.MeshLambertMaterial({color: 0x5ca87a})
const blue = new THREE.MeshLambertMaterial({color: 0x199dc1})
const orange = new THREE.MeshLambertMaterial({color: 0xe09d18})
const yellow = new THREE.MeshLambertMaterial({color: 0xd3ba00})
const purple = new THREE.MeshLambertMaterial({color: 0xB78DD1})
const white = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
const offwhite = new THREE.MeshLambertMaterial({color: 0xF4EEEF})
const gray = new THREE.MeshLambertMaterial({color: 0x555555})
const palegray = new THREE.MeshLambertMaterial({color: 0x87836E})
const jean = new THREE.MeshLambertMaterial({color: 0x416BAD})
// Scenery
const shadows = new THREE.ShadowMaterial({opacity: 0.3})
const windowColor = new THREE.MeshLambertMaterial({color: 0xD0DDE3, transparent: true, opacity: 0.5})
const brick = new THREE.MeshLambertMaterial({color: 0xAA5050})
const stone = new THREE.MeshLambertMaterial({color: 0xE5D2A9})
const truckMaterial = new THREE.MeshLambertMaterial({color: 0xEF8547})
// Skin
const skinTone1 = new THREE.MeshLambertMaterial({color: 0x8D5524}) // Brown
const skinTone2 = new THREE.MeshLambertMaterial({color: 0xC68642}) // Light Brown
const skinTone3 = new THREE.MeshLambertMaterial({color: 0xF1C27D}) // Tan
const skinTone4 = new THREE.MeshLambertMaterial({color: 0xFFDBAC}) // Pale
// Signs
const workerSign = new THREE.TextureLoader().load('images/sign-01.png')
const workerSignMaterial = new THREE.MeshBasicMaterial({map: workerSign})
const flaggerSign = new THREE.TextureLoader().load('images/sign-02.png')
const flaggerSignMaterial = new THREE.MeshBasicMaterial({map: flaggerSign})
const flagAheadSign = new THREE.TextureLoader().load('images/sign-03.png')
const flagAheadSignMaterial = new THREE.MeshBasicMaterial({map: flagAheadSign})
const menWorkSign = new THREE.TextureLoader().load('images/sign-04.png')
const menWorkSignMaterial = new THREE.MeshBasicMaterial({map: menWorkSign})
const prepareStopSign = new THREE.TextureLoader().load('images/sign-05.png')
const prepareStopSignMaterial = new THREE.MeshBasicMaterial({map: prepareStopSign})
const oneLaneSign = new THREE.TextureLoader().load('images/sign-06.png')
const oneLaneSignMaterial = new THREE.MeshBasicMaterial({map: oneLaneSign})
const workAheadSign = new THREE.TextureLoader().load('images/sign-07.png')
const workAheadSignMaterial = new THREE.MeshBasicMaterial({map: workAheadSign})
// Geometry
const coneGeometry = new THREE.CylinderGeometry(0.07, 0.2, 0.5, 32, 0.8, false, 0.8)
const coneBottomG = new THREE.BoxGeometry(0.5, 0.06, 0.5)
coneBottomG.translate(0, -0.23, 0)
coneGeometry.merge(coneBottomG)
coneGeometry.scale(1.5, 1.5, 1.5)
coneGeometry.translate(0, .125, 0)
const stripeGeometry = new THREE.CylinderGeometry(0.116, 0.155, 0.15, 32, 1, false, 0.8)
stripeGeometry.scale(1.5, 1.5, 1.5)
stripeGeometry.translate(0, .125, 0)
