'use strict'

const { relative } = require('path')
const minimatch = require('minimatch')
const pug = require('pug')

module.exports = () => ({
  transform(source, id) {
    const p = relative(process.cwd(), id)
    if (!minimatch(p, 'components/*.live.pug')) return
    const pugFn = pug.compileClient(source)
    const code = `${pugFn}
export function mount (ctx, props, el) {
  const update = () => {
    const html = render(ctx, props)
    if (html !== el.innerHTML) el.innerHTML = html
  }
  if (process.env.PENGUIN_ENV === 'development') ctx.store.subscribe(update)
  update()
}
export function render ({ store, language }, props) {
  const locals = {}
  const state = store.getState()
  locals.props = props
  locals.fields = state.fields
  locals.languages = state.languages
  locals.language = language
  return template(locals)
}`
    return { code, map: { mappings: '' } }
  }
})
