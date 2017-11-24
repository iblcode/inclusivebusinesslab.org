import { mount as mountInplace, render as renderInplace } from 'penguin-inplace'

import URI from 'urijs'
// const URI = require('urijs')

export function mount(ctx, props, el) {
  const form = document.getElementById('signup')
  function sendData() {
    let XHR = new XMLHttpRequest()
    let FD = new FormData(form)

    XHR.addEventListener('load', function(event) {
      let msg = JSON.parse(event.target.responseText)
      if (XHR.status != 201) {
        console.log(XHR.status)
        alert(msg.status)
      } else {
        document.getElementById('userid').innerHTML = msg.user_id
        document.getElementById('useremail').innerHTML = msg.email

        document.getElementById('signup').style.display = 'none'
        document.getElementById('success').style.display = 'block'

        document.getElementById('proceed').addEventListener('click', e => {
          let formid = URI(window.location.href).search(true).form
          if (formid != null && formid != '') {
            document.body.innerHTML = typeformhtml(formid, msg.user_id)
          } else {
            alert('Link not valid. Please contact the support.')
          }
        })
      }
    })
    XHR.addEventListener('error', function(event) {
      document.getElementById('action').innerHTML =
        'Error! Contact us or try again.'
      console.warn(request.statusText, request.responseText)
      alert('Oups! Something goes wrong.')
    })

    XHR.open('POST', 'https://ibl-api.herokuapp.com/api/v1/user')
    XHR.send(FD)
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    sendData()
  })

  // mountInplace(ctx, props, el)
}

// export function mount(ctx, props, el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//
//     var city = document.getElementById('city').value
//     var school = document.getElementById('school').value
//
//     if (city != '' && school != '') {
//       el.disabled = true
//       el.style.display = 'none'
//       document.getElementById('spinner').style.display = 'block'
//
//       var request = new XMLHttpRequest()
//       request.timeout = 20000
//       request.open('GET', 'https://penguin.inclusivebusinesslab.org/form')
//
//       request.onload = function() {
//         // success(request.responseText, city, school)
//         let id = `${city + school + JSON.parse(request.responseText).id}`
//         document.getElementById('action').innerHTML = `Your ID is: ${id}`
//       }
//
//       request.onerror = function() {
//         document.getElementById('action').innerHTML = 'Error! Contact us.'
//         console.warn(request.statusText, request.responseText)
//       }
//       request.ontimeout = function(e) {
//         document.getElementById('action').innerHTML =
//           'Error! Contact us or try again!'
//       }
//
//       request.send()
//     } else {
//       var elem = document.getElementById('action')
//       var p = document.createElement('p')
//       p.innerHTML = 'Error! Select city and school.'
//       elem.insertBefore(p, elem.childNodes[0])
//     }
//   })
//   mountInplace(ctx, props, el)
// }

export function render(ctx, props) {
  return { attrs: {} }
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

function typeformhtml(formid, userid) {
  return `
<iframe id="typeform-full" width="100%" height="100%" frameborder="0"
src="https://iblfeedback.typeform.com/to/${formid}?id=${userid}"></iframe>
<script type="text/javascript" src="https://embed.typeform.com/embed.js"></script>
`
}
