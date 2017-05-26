import { update } from 'penguin.js'

export function mount ( ctx, props, el ) {
  if (process.env.PENGUIN_ENV === 'production') return
  const {store} = ctx

  var value = store.getState().fields[props.field]
  if ( value != null && value != '' ) { el.value = value }

  el.addEventListener('change', () => {
    store.dispatch(update({[props.field] : el.value}))
  })

}


export function render ( ctx, props ) { return { replace: '' } }
