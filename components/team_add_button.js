import slugify from 'slugify'


export function mount (ctx, props, el) {
  function relocate (slug) {
    window.location.href = `/${ctx.language}/team/${slug}`
  }

  el.addEventListener('click', () => {
    const id = prompt("Next-Gen Leader's Name?")
    relocate(slugify(id))
  })

}

export function render () { return { replace: '' } }
