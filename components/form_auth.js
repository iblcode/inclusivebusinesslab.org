import URI from 'urijs'

export function mount(ctx, props, el) {
  el.addEventListener('click', e => {
    let input = document.getElementById('authenticate_input').value
    console.log(input)
    if (input.includes('@')) {
      authEmail(input)
    } else {
      authID(input)
    }
  })

  let formid = URI(window.location.href).search(true).form
  if (formid == null || formid == '') {
    alert('Link not valid. Please contact the support.')
  }
}

export function render(ctx, props) {
  return { attrs: {} }
}

function authEmail(input) {
  let XHR = new XMLHttpRequest()

  XHR.addEventListener('load', function(event) {
    let msg = JSON.parse(event.target.responseText)
    if (XHR.status != 200) {
      console.log(XHR.status)
      alert(msg.status)
    } else {
      if (msg.user_id != null && msg.user_id != '') {
        let formid = URI(window.location.href).search(true).form
        if (formid != null && formid != '') {
          document.body.innerHTML = typeformhtml(formid, msg.user_id)
        } else {
          alert('Link not valid. Please contact the support.')
        }
      } else {
        alert('Something went wrong with your email. Try it again.')
      }
    }
  })
  XHR.addEventListener('error', function(event) {
    // document.getElementById('action').innerHTML =
    //   'Error! Contact us or try again.'
    console.warn(request.statusText, request.responseText)
    alert('Oups! Something goes wrong.')
  })

  XHR.open('POST', 'https://ibl-api.herokuapp.com/api/v1/find_user_id')
  XHR.setRequestHeader('Content-Type', 'application/json')
  XHR.send(JSON.stringify({ email: input }))
}

// UNhk10008
function authID(input) {
  let XHR = new XMLHttpRequest()

  XHR.addEventListener('load', function(event) {
    let msg = JSON.parse(event.target.responseText)
    if (XHR.status != 200) {
      console.log(XHR.status)
      alert(msg.status)
    } else {
      if (msg.user_id != null && msg.user_id != '') {
        let formid = URI(window.location.href).search(true).form
        if (formid != null && formid != '') {
          document.body.innerHTML = typeformhtml(formid, msg.user_id)
        } else {
          alert('Link not valid. Please contact the support.')
        }
      } else {
        alert('Something went wrong with your email. Try it again.')
      }
    }
  })
  XHR.addEventListener('error', function(event) {
    // document.getElementById('action').innerHTML =
    //   'Error! Contact us or try again.'
    console.warn(request.statusText, request.responseText)
    alert('Oups! Something goes wrong.')
  })

  XHR.open('POST', 'https://ibl-api.herokuapp.com/api/v1/login')
  XHR.setRequestHeader('Content-Type', 'application/json')
  XHR.send(JSON.stringify({ user_id: input }))
}

function typeformhtml(formid, userid) {
  return `
<iframe id="typeform-full" width="100%" height="100%" frameborder="0"
src="https://iblfeedback.typeform.com/to/${formid}?id=${userid}"></iframe>
<script type="text/javascript" src="https://embed.typeform.com/embed.js"></script>
`
}
