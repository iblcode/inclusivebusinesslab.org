import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  const { store } = ctx

  var value = store.getState().fields[props.field]

  // when the page is loading, we want to set the checkbox to the same state as the store is
  if (value != null && value != '') {
    el.checked = value
  } else {
    el.checked = false
  }

  el.addEventListener('change', () => {
    store.dispatch(update({ [props.field]: el.checked }))
  })
}

export function render(ctx, props) {
  return { replace: '' }
}
