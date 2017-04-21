import find from 'lodash/fp/find'
import { update } from 'penguin.js'

export function mount (ctx, props, el) {
  el.addEventListener("click", e => {
    e.preventDefault()
    saveGloabl(ctx, props, el)
    ctx.save()
  })
}

function saveGloabl (ctx, props, el) {
  const id = window.location.pathname.split('/')[3]
  const { store } = ctx
  const { fields } = store.getState()
  console.log(fields)

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
  const current = {id: id, title: title, date: date, tags: tags, teaser: teaser, content1: content1, img1: img1, img2: img2, img3: img3, content2: content2}

  const element = find({ id }, globalElements)
  const newElements = (
    element == null
      ? [...globalElements, current]
      : (
        globalElements.map(
          m => (
            m.id === id
              ? current
              : m
          )
        )
      )
  )

  // set the new global element
  store.dispatch(update({ stories: newElements }))
}

export function render (ctx, props) {
  return { replace: '' }
}
