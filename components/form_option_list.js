export function mount(ctx, props, el) {
  var request = new XMLHttpRequest()

  request.open('GET', `https://ibl-api.herokuapp.com/api/v1${props.query}`)
  request.onload = function() {
    renderList(JSON.parse(request.responseText))
  }
  request.onerror = function() {
    document.getElementById('action').innerHTML = 'Error! Contact us.'
    console.warn(request.statusText, request.responseText)
  }
  request.send()

  function renderList(content) {
    el.innerHTML = content.map(c => {
      return `<option value="${c.id}"> ${c.name} </option>`
    })
  }
}

export function render(ctx, props) {
  return { attrs: {} }
}
