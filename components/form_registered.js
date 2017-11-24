export function mount(ctx, props, el) {
  el.addEventListener('click', e => {
    document.getElementById('authenticate').style.display = 'none'
    document.getElementById('signup').style.display = 'block'
  })
}

export function render(ctx, props) {
  return { attrs: {} }
}
