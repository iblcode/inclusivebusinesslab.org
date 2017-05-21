export function mount(ctx, props, el) {
  var request = new XMLHttpRequest()
  request.open("GET", `https://penguin.inclusivebusinesslab.org${props.query}`)

  request.onload = function() {
    renderList(JSON.parse(request.responseText).content)
  }
  request.onerror = function() {
    document.getElementById("action").innerHTML = "Error! Contact us."
    console.warn(request.statusText, request.responseText)
  }

  request.send()

  function renderList(content) {
    var list = '<option value="">  </option>'

    for( var i=0; i<content.length; i++ ) {
      list = list.concat(`<option value="${content[i].id}"> ${content[i].name} </option>`)
    }
    el.innerHTML= list

  }
}

export function render(ctx, props) { return { attrs: {}} }
