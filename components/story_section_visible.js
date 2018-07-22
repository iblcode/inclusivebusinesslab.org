export function mount(ctx, props, el) {}

export function render(ctx, props) {
  const { store } = ctx

  const stories = store.getState().fields.stories

  const value = findValid(stories, props)

  // If value true: show section.
  if (value === true) {
    return { attrs: {} }
  } else return { replace: '' }
}

function findValid(stories, props) {
  if (stories == null) return false

  if (props.filter != null && props.filter != '') {
    stories = stories.filter(
      s =>
        s.tags != null &&
        Array.isArray(s.tags) &&
        s.tags.length != 0 &&
        s.tags.indexOf(props.filter.toLowerCase()) > -1
    )
  }

  if (stories.length > 0) {
    return true
  } else {
    return false
  }
}
