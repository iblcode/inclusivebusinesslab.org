import { mount as mountInplace, render as renderInplace } from 'penguin-inplace'

import URI from 'urijs'
// const URI = require('urijs')

export function mount(ctx, props, el) {
  el.addEventListener('click', function(e) {
    e.preventDefault()

    var city = document.getElementById('city').value
    var school = document.getElementById('school').value

    if (city != '' && school != '') {
      el.disabled = true
      el.style.display = 'none'
      document.getElementById('spinner').style.display = 'block'

      var request = new XMLHttpRequest()
      request.timeout = 20000
      request.open('GET', 'https://penguin.inclusivebusinesslab.org/form')

      request.onload = function() {
        // success(request.responseText, city, school)
        let id = `${city + school + JSON.parse(request.responseText).id}`
        document.getElementById('action').innerHTML = `Your ID is: ${id}`
      }

      request.onerror = function() {
        document.getElementById('action').innerHTML = 'Error! Contact us.'
        console.warn(request.statusText, request.responseText)
      }
      request.ontimeout = function(e) {
        document.getElementById('action').innerHTML =
          'Error! Contact us or try again!'
      }

      request.send()
    } else {
      var elem = document.getElementById('action')
      var p = document.createElement('p')
      p.innerHTML = 'Error! Select city and school.'
      elem.insertBefore(p, elem.childNodes[0])
    }
  })
  mountInplace(ctx, props, el)
}

export function render(ctx, props) {
  return renderInplace(ctx, props)
}

function success(answer, city, school) {
  let id = JSON.parse(answer).id

  let url = URI(window.location.href)
  let form = URI(
    url.search(true).form || 'https://iblfeedback.typeform.com/to/gVJAzd'
  )
  form.protocol('https')
  form.search({ id: `${city + school + id}` })

  window.location.href = form.toString()
}
