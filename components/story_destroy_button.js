import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  el.addEventListener("click", e => {
    e.preventDefault()

    const id = window.location.pathname.split('/')[3]

    const { store } = ctx
    const { fields } = store.getState()

    const newElements = (
      fields.stories.filter( m => m.id !== id )
    )

    store.dispatch(update({ stories: newElements }))

    ctx.save( () => {
      ctx.destroy( () => {

        window.location.href = `/${ctx.language}/stories`
      })
    })
  })
}

export function render(ctx, props) {
  return {replace: ''}
}
