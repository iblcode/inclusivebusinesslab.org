import find from 'lodash/fp/find'
import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  el.addEventListener('click', e => {
    e.preventDefault()
    saveGlobal(ctx, props, el)
    ctx.save()
  })
}

function saveGlobal(ctx, props, el) {
  const { keys, field } = props
  const { store } = ctx
  const { fields } = store.getState()
  const id = window.location.pathname.split('/')[3]
  const current = keys.reduce(
    (current, key) =>
      Object.assign({}, current, {
        [key]: fields[key]
      }),
    { id }
  )
  const globalElements = fields[field] || []
  const element = find({ id }, globalElements)
  store.dispatch(
    update({
      [field]: element == null
        ? [...globalElements, current]
        : globalElements.map(m => (m.id === id ? current : m))
    })
  )
}

export function render(ctx, props) {
  return { replace: '' }
}
