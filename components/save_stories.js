export function render () {
  return { replace: '' }
}

export function mount (ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  const update = () => {
    const { isSaving } = ctx.store.getState()
    if (isSaving !== el.disabled) el.disabled = isSaving
  }
  el.onclick = e => {
    e.preventDefault()
    ctx.save((element) =>{
      console.log('jez')
      console.log(element)
    })
  }
  ctx.store.subscribe(update)
  update()
}
