var showing = 'none'

function slide(id) {
  switch(showing) {
    case id:
      document.getElementById(id).removeAttribute("style")
      document.getElementsByClassName(id)[0].removeAttribute("style")
      break
    case 'group-1':
      document.getElementById('group-1').removeAttribute("style")
      document.getElementsByClassName('group-1')[0].removeAttribute("style")
      break
    case 'group-2':
      document.getElementById('group-2').removeAttribute("style")
      document.getElementsByClassName('group-2')[0].removeAttribute("style")
      break
    case 'group-3':
      document.getElementById('group-3').removeAttribute("style")
      document.getElementsByClassName('group-3')[0].removeAttribute("style")
      break
    case 'group-4':
      document.getElementById('group-4').removeAttribute("style")
      document.getElementsByClassName('group-4')[0].removeAttribute("style")
      break
    case 'group-5':
      document.getElementById('group-5').removeAttribute("style")
      document.getElementsByClassName('group-5')[0].removeAttribute("style")
      break
    case 'group-6':
      document.getElementById('group-6').removeAttribute("style")
      document.getElementsByClassName('group-6')[0].removeAttribute("style")
      break
    default:
      break
  }
  if (showing !== id) {
    document.getElementsByClassName(id)[0].style.backgroundColor = "#666"
    document.getElementById(id).style.width = "300px"
    showing = id
  } else {
    showing = 'none'
  }
}
