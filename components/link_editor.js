import {
  mount as mountInplace,
  render as renderInplace
} from 'penguin-inplace'
import { update } from 'penguin.js'

export function mount (ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return

  loadStyle()

  var url
  const update = () => {
    var value = ctx.store.getState().fields[`${props.field}-link-editor-url`]
    if (value != null) {
      // exists in store
      el.href = renderUrl(ctx, value)
      url = value
    }
    else {
      // new
      el.href = renderUrl(ctx, props.defaultURL)
      url = props.defaultURL
    }
  }

  update()
  ctx.store.subscribe( update )

  el.addEventListener('click', function (e) {
    if (e.altKey) { window.location.href = this.href }
    else { createTip.call(el, e, ctx, props, url) }
  })

  mountInplace(ctx, props, el)
}

export function render (ctx, props) {
  const {store} = ctx
  const value = ctx.store.getState().fields[props.field]
  const url = store.getState().fields[`${props.field}-link-editor-url`]

  return{ replace: `
    <a
      href="${url == null ? renderUrl(ctx, props.defaultURL) : renderUrl(ctx, url)}"
      class="${ props.className == null ? '' : props.className }"
      id="${ props.id == null ? '' : props.id }">
    ${value == null ? props.innerHTML : value }
    </a>
  `}
}

function renderUrl( { language }, url ) {
  const pat = /({{\s?lang\s?}})/

  return url.replace(pat, language)
}

function createTip (e, ctx, props, url) {

  e.preventDefault()

  var tooltipWrap = document.createElement("div")
  tooltipWrap.className = 'penguin-tooltip'
  tooltipWrap.insertAdjacentHTML('beforeend', template)
  var firstChild = document.body.firstChild
  firstChild.parentNode.insertBefore(tooltipWrap, firstChild)

  var input = tooltipWrap.querySelector('.link-editor-toolbar-input')
  var save = tooltipWrap.querySelector('.link-editor-toolbar-save')

  var close = tooltipWrap.querySelector('.link-editor-toolbar-close')
  var link = tooltipWrap.querySelector('.link-editor-toolbar-link')
  const {store} = ctx
  input.value = url
  save.addEventListener('click', (e) => {
    e.preventDefault()
    // this.href = input.value
    renderUrl(ctx, input.value)
    store.dispatch(update({[`${props.field}-link-editor-url`] : input.value}))

    cancelTip(e)
  })
  close.addEventListener('click', cancelTip)
  link.href = renderUrl(ctx, url)

  const padding = 5
  var linkProps = this.getBoundingClientRect()
  var tooltipProps = tooltipWrap.getBoundingClientRect()
  var topPos = linkProps.top + window.scrollY - (tooltipProps.height + padding)

  tooltipWrap.setAttribute('style','top:'+topPos+'px;'+'left:'+(linkProps.left + window.scrollX)+'px;')

  function cancelTip (e){
    e.preventDefault()
    tooltipWrap.remove()
  }
}



function loadStyle () {
  var css = document.createElement("style")
  css.type = "text/css"
  css.innerHTML = style
  document.head.appendChild(css)
}

const style = `
.penguin-tooltip {
  position: absolute;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  text-shadow: 0px 1px 1px #000;
  color: #ffc64a;
  z-index: 9999;
  background-color: #242424;
  background: -webkit-linear-gradient(top,#242424,rgba(36,36,36,.75));
  background: linear-gradient(to bottom,#242424,rgba(36,36,36,.75));
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 3px #000;

}
.penguin-tooltip:after {
  border-style: solid;
  content: '';
  display: block;
  height: 0;
  left: 10%;
  margin-left: -8px;
  position: absolute;
  width: 0;
  border-width: 8px 8px 0;
  border-color: #242424 transparent transparent;
  top: 50px;
}
.penguin-tooltip .link-editor-toolbar-form {
  background: #242424;
  border-radius: 5px;
  color: #999;
}
.penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-input {
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  margin: 0;
  padding: 6px;
  width: 316px;
  display: inline-block;
  background: #242424;
  color: #ccc;
  height: 50px;
}
.penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-input:focus {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  box-shadow: none;
  outline: 0;
}
.penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-save, .penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-close, .penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-link {
  display: inline-block;
  font-size: 24px;
  font-weight: bolder;
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

.penguin-tooltip .link-editor-toolbar-form .link-editor-toolbar-link {
  font-size: 20px;
}
`

const template = `
<div class="link-editor-toolbar-form">
  <input type="text" class="link-editor-toolbar-input" placeholder="External links start with http://">
  <a href="#" class="link-editor-toolbar-save">✓</a>
  <a href="#" class="link-editor-toolbar-close">✗</a>
  <a href="#" class="link-editor-toolbar-link">🔗</a>
</div>
`
