export function mount(ctx, props, el) {
  el.addEventListener("click", e => {
    e.preventDefault()
    ctx.publish()
  })
}

export function render(ctx, props) { return {replace: ''} }
