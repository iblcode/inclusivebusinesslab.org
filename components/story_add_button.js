import slugify from 'slugify'

const template = `
<div id="modal-story-add-button" class="overlay">
  <a class="cancel" href="#"></a>
  <div class="modal">
    <h2>Add another story</h2>
    <div class="content">
    <p>Give a unique name to this story or click outside the modal to close.</p>
    <input id="input-story-add-button" style="width: 100%;">
    <a class="penguin-btn" href="javascript:;" id="button-story-add-button"> Submit</a>
    </div>
  </div>
</div>
`

const style = `
.modal .penguin-btn {
  padding: 10px 15px;
  margin: 20px 5px;
  display: inline-block;
  border: 1px solid black;
}
.modal .penguin-btn:hover {
  box-shadow: 0 0 10px 0px #888
}
.modal {
  z-index: 9999;
  margin: 100px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #666;
  width: 400px;
  border-radius: 6px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  position: relative;
}

.modal h2 { margin-top: 0; }

.modal .close {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 20px;
  opacity: 0.8;
  transition: all 200ms;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #777;
}

.modal .close:hover { opacity: 1; }

.modal .content {
  max-height: 400px;
  overflow: auto;
}

.modal p {
  margin: 0 0 1em;
  text-align: left;
}

.modal p:last-child { margin: 0; }

.overlay {
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms;
  visibility: hidden;
  opacity: 0;
}

.overlay .cancel {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}
`

export function mount (ctx, props, el) {

  var css = document.createElement("style")
  css.type = "text/css"
  css.innerHTML = style
  document.head.appendChild(css)

  document.body.insertAdjacentHTML('beforeend', template)

  function relocate (slug) {
    window.location.href = `/en/stories/${slug}?new=true`
  }

  el.addEventListener('click', () => {
    window.location.hash= "modal-story-add-button"
  })
  document.getElementById('button-story-add-button').addEventListener('click', () => {
    const id = document.getElementById('input-story-add-button').value
    relocate(slugify(id))
  })
}

export function render () { return { replace: '' } }
