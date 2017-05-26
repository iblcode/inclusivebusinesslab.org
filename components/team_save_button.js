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

  const teamMembers = fields.teamMembers || []

  const image = fields.image
  const name = fields.name
  const content = fields.content
  const url = fields.url
  const type = fields.type

  const teamMember = find({ id }, teamMembers)
  const newTeamMembers = (
    teamMember == null
      ? [...teamMembers, { id, image, name, content, url, type }]
      : (
        teamMembers.map(
          m => (
            m.id === id
              ? { id, image, name, content, url, type }
              : m
          )
        )
      )
  )

  store.dispatch(update({ teamMembers: newTeamMembers }))
}

export function render (ctx, props) {
  return { replace: '' }
}
