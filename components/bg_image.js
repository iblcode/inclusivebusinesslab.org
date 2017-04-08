import {
  mount as mountFilepicker,
  render as renderFilepicker
} from 'penguin-filestack'

export function mount (ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  props.register = fn => {
    el.addEventListener('click', () => fn())

    const sibling = el.parentNode.getElementsByClassName('penguin-bg-image-sibling')[0]
    if (sibling != null) {
      sibling.addEventListener('click', () => fn())
    }
  }
  props.callback = function callback (url) {
    el.style.backgroundImage = `url(${url})`
  }
  mountFilepicker(ctx, props, el)
}

export function render (ctx, props) {
  props.callback = url => (
    { attrs: { style: `background-image: url(${url})` } }
  )
  return renderFilepicker(ctx, props)
}
