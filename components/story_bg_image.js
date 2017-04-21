import { update } from 'penguin.js'
import {
  mount as mountFilepicker,
  render as renderFilepicker
} from './bg_image'

export function mount ( ctx, props, el ) {
  if ( process.env.PENGUIN_ENV === 'production' ) return
  const {store} = ctx

  el.insertAdjacentHTML( 'afterbegin', template )

  var options = document.getElementById( 'story-bg-image-select' ).querySelectorAll( 'option' )
  var selected = ( store.getState().fields[props.field] || 3 )
  options.forEach( ( e ) => { if ( e.value == selected ) { e.selected = true } })
  el.classList.add( classFromNumber(selected) )



  document.getElementById( 'story-bg-image-select' ).addEventListener( 'change', (e) => {
    store.dispatch( update( { [ props.field ] : e.target.value } ) )
    el.classList.remove( 'one', 'two', 'three')
    el.classList.add(classFromNumber( e.target.value ))
  })

  var images = el.querySelectorAll( '.story-image' )
  window.images = images
  for ( var i = 0; i < images.length; ++i ) {
    let sib = images[i]
    var sibprops = Object.assign({}, props)

    sibprops.field = `${ props.field }-${ i }`
    sibprops.defaultURL = sib.getAttribute( 'data-defaulturl' )
    mountFilepicker( ctx, sibprops, sib )
  }

  function updateValue () {

    var render = ( store.getState().fields[props.field] || 3 )

    for ( var i = 0; i < images.length; ++i ) {
      let sib = images[i]
      var ci = el.querySelectorAll( '.story-image' ).length

      if ( ( i+1 ) > render && ci > render ) {
        el.removeChild( sib )
        continue
      }

      if ( ( i+1 ) > ci && render > ci ) {
        el.appendChild( sib )
        continue
      }

    }
  }

  updateValue()
  store.subscribe( updateValue )

}

//
export function render ( ctx, props ) {
  const { store } = ctx
  const render = ( store.getState().fields[props.field] || 3 )



  var images = []
  for ( var i = 0; i < render; ++i ) {
    const imgUrl = store.getState().fields[`${props.field}-${ i }`]

    if ( imgUrl == null || imgUrl == '' ) { continue }
    const img = `<div class="story-image" style="background-image: url('${imgUrl}')"></div>`
    images.push(img)
  }
  // return "hallo welt"
  if ( images.length !== 0 ) {
    var html = `
      <div class="square-images ${ classFromNumber(images.length) }">
        ${ images.join( '' ) }
      </div>`
    return html
  }
  else { return { replace: '' } }

}


function classFromNumber (n) {
  const text = ['one', 'two', 'three']
  return text[parseInt(n)-1]
}

const template = `
<span style="position: absolute; background-color: rgba(0, 0, 0, 0.65); border-radius: 0px 0px 10px 10px; left: 50%; margin-right: -50%; transform: translate(-50%, 0);">
  <p style="padding: 15px; color: white;">How many images shall be shown?
    <select id="story-bg-image-select">
      <option value="1">one</option>
      <option value="2">two</option>
      <option value="3">three</option>
    </select>
  </p>
</span>
`
