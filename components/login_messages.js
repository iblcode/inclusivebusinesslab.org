export function mount ( ctx, props, el ) {
  if ( process.env.PENGUIN_ENV === 'production' ) return

  if ( !window.location.search.slice( 1 ).match( /success=1/ ) ) return

  el.querySelector( '.success' ).classList.remove( 'hidden' )
  el.querySelector( '.login' ).classList.add( 'hidden' )

}

export function render () { return { replace: '' } }
