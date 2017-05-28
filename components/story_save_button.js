import find from 'lodash/fp/find'
import includes from 'lodash/fp/includes'
import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  const { store } = ctx

  if (
    window.location.href.indexOf('new=true') !== -1 &&
    includes(store.getState().fields.exists, ctx.language)
  ) {
    document.head.insertAdjacentHTML('beforeend', style)
    document.body.insertAdjacentHTML('beforeend', template)
    window.location.hash = 'modal-story-save-button-warning'
    document
      .getElementById('modal-story-save-button-warning-a')
      .addEventListener('click', () => {
        window.location.href = location.href.split(/\?|#/)[0]
      })
    document
      .getElementById('modal-story-save-button-warning-a-goback')
      .addEventListener('click', () => {
        window.location.href = `/en/stories`
      })
  }

  el.addEventListener('click', e => {
    e.preventDefault()

    const { store } = ctx

    if (!includes(store.getState().fields.exists, ctx.language)) {
      if (store.getState().fields.exists == null) {
        store.dispatch(update({ exists: [ctx.language] }))
      } else {
        const ex = store.getState().fields.exists
        ex.push(ctx.language)
        store.dispatch(update({ exists: ex }))
      }
    }

    saveGloabl(ctx, props, el)
    ctx.save()
  })
}

function saveGloabl(ctx, props, el) {
  const id = window.location.pathname.split('/')[3]
  const { store } = ctx
  const { fields } = store.getState()

  // set the global element
  const globalElements = fields.stories || []
  // set the global variables here.

  // const current = {title, date, tags, teaser, content1, img1, img2, img3, content2} = fields

  const title = fields.title
  const date = fields.date
  const tags = fields.tags
  const teaser = fields.teaser
  const content1 = fields.content1
  const img1 = fields['image-0']
  const img2 = fields['image-1']
  const img3 = fields['image-2']
  const content2 = fields.content2
  const current = {
    id,
    title,
    date,
    tags,
    teaser,
    content1,
    img1,
    img2,
    img3,
    content2
  }

  const element = find({ id }, globalElements)
  const newElements = element == null
    ? [...globalElements, current]
    : globalElements.map(m => (m.id === id ? current : m))

  // set the new global element
  store.dispatch(update({ stories: newElements }))
}

export function render(ctx, props) {
  return { replace: '' }
}

const template = `
<div id="modal-story-save-button-warning" class="overlay">
  <div class="modal warning">
    <h2>Heads up!</h2>
    <div class="content">
    <p>You are trying to add a new story. But this story already exists. What do you want to do?</p>
    <a class="penguin-btn" href="#" id="modal-story-save-button-warning-a">Edit existing story</a>
    <a class="penguin-btn" href="#" id="modal-story-save-button-warning-a-goback">Go back and add another story</a>
    </div>
  </div>
</div>
`

const style = `
<style type="text/css">
.modal .penguin-btn {
  padding: 10px 15px;
  margin: 20px 5px;
  display: inline-block;
  border: 1px solid black;
}
.modal.warning .penguin-btn {
  border: 1px solid white;
  color: white;
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

.modal.warning {
  color: white;
  background: #F44336;
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
</style>
`
