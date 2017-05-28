import {
  mount as mountMediumEditor,
  render as renderMediumEditor
} from 'penguin-medium-editor'

export function mount(ctx, props, el) {
  mountMediumEditor(ctx, props, el)
}

export function render(ctx, props) {
  var value = ctx.store.getState().fields[props.field]
  var innerHTML = props.innerHTML

  return value == null ? '' : value
}
