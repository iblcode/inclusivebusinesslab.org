export function mount(ctx, props, el) {
  var request = new XMLHttpRequest()
  request.open("GET", `https://penguin.inclusivebusinesslab.org${props.query}`)

  var data = {}

  request.onload = function() {
    data = JSON.parse(request.responseText).content
  }
  request.onerror = function() {
    document.getElementById("action").innerHTML = "Error! Contact us."
    console.warn(request.statusText, request.responseText)
  }
  request.send()

  var trigger = document.getElementById(props.filter)
  trigger.addEventListener('change', function (e) {
    renderList(data)
  })

  function renderList(content) {
    var list = ''

    for( var i=0; i<content.length; i++ ) {
      if (props.filter != null &&  props.filter != '') {
        if (content[i].city != trigger.value) continue;
      }
      list = list.concat(`<option value="${content[i].id}"> ${content[i].name} </option>`)
    }
    el.innerHTML= list

  }
}

export function render(ctx, props) { return { attrs: {}} }
