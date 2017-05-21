import {
  mount as mountInplace,
  render as renderInplace
} from 'penguin-inplace'

export function mount(ctx, props, el) {
  el.addEventListener('click', function (e) {
    e.preventDefault()

    var city = document.getElementById('city').value
    var school = document.getElementById('school').value

    if (city != '' && school != '' ) {
      el.disabled = true
      el.style.display = 'none'
      document.getElementById('spinner').style.display = 'block'

      var request = new XMLHttpRequest()
      request.open("GET", "https://penguin.inclusivebusinesslab.org/form")

      request.onload = function() {
        success(request.responseText, city, school)
      }
      
      request.onerror = function() {
        document.getElementById("action").innerHTML = "Error! Contact us."
        console.warn(request.statusText, request.responseText)
      }

      request.send()
    }
    else {
      var elem = document.getElementById("action")
      var p = document.createElement('p')
      p.innerHTML = "Error! Select city and school."
      elem.insertBefore(p, elem.childNodes[0])
    }



  })
  mountInplace(ctx, props, el)

}

export function render(ctx, props) {

  return renderInplace(ctx, props)

}

function success (answer, city, school) {
  var id = JSON.parse(answer).id
  window.location.href = `https://iblfeedback.typeform.com/to/gVJAzd?id=${city+school+id}`
}
