import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  el.addEventListener("click", e => {
    e.preventDefault()

    const id = window.location.pathname.split('/')[3]

    const { store } = ctx
    const { fields } = store.getState()

    const newTeamMembers = (
      fields.teamMembers.filter( m => m.id !== id )
    )
    
    store.dispatch(update({ teamMembers: newTeamMembers }))

    ctx.save( () => {
      ctx.destroy( () => {

        window.location.href = `/${ctx.language}/team`
      })
    })
  })
}

export function render(ctx, props) {
  return {replace: ''}
}
