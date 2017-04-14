import {
  mount as mountInplace,
  render as renderInplace
} from 'penguin-inplace'
import { update } from 'penguin.js'

export function mount (ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  loadStyle()

  el.addEventListener('click', function (e) {
    createTip.call(el, e, ctx, props)
  })

  const update = () => {
    el.href = ctx.store.getState().fields[`${props.field}-link-editor-url`]
  }

  update()
  ctx.store.subscribe( update )
  mountInplace(ctx, props, el)
}

export function render (ctx, props) {
  const {store} = ctx
  const value = ctx.store.getState().fields[props.field]
  return{ replace: `
    <a
      href="${store.getState().fields[`${props.field}-link-editor-url`]}
      class="${props.className}" id="${props.id}">
    ${value == null ? props.innerHTML : value }
    </a>
  `}

}

function createTip (e, ctx, props) {
  e.preventDefault()

  var tooltipWrap = document.createElement("div")
  tooltipWrap.className = 'tooltip'
  tooltipWrap.insertAdjacentHTML('beforeend', template)
  var firstChild = document.body.firstChild
  firstChild.parentNode.insertBefore(tooltipWrap, firstChild)

  var input = tooltipWrap.querySelector('.link-editor-toolbar-input')
  var save = tooltipWrap.querySelector('.link-editor-toolbar-save')
  var close = tooltipWrap.querySelector('.link-editor-toolbar-close')
  var link = tooltipWrap.querySelector('.link-editor-toolbar-link')
  const {store} = ctx
  input.value = this.href
  save.addEventListener('click', (e) => {
    e.preventDefault()
    // this.href = input.value
    store.dispatch(update({[`${props.field}-link-editor-url`] : input.value}))

    cancelTip(e)
  })
  close.addEventListener('click', cancelTip)
  link.href = this.href

  const padding = 5
  var linkProps = this.getBoundingClientRect()
  var tooltipProps = tooltipWrap.getBoundingClientRect()
  var topPos = linkProps.top + window.scrollY - (tooltipProps.height + padding)

  tooltipWrap.setAttribute('style','top:'+topPos+'px;'+'left:'+(linkProps.left + window.scrollX)+'px;')
}

function cancelTip (e){
  e.preventDefault()
  document.querySelector('.tooltip').remove()
}

function loadStyle () {
  var css = document.createElement("style")
  css.type = "text/css"
  css.innerHTML = style
  document.head.appendChild(css)
}

const style = `
.tooltip {
  position: absolute;
  // background: #646464;
  // border-radius:4px;
  // padding: 6px 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  text-shadow: 0px 1px 1px #000;
  color: #ffc64a;

  background-color: #242424;
  background: -webkit-linear-gradient(top,#242424,rgba(36,36,36,.75));
  background: linear-gradient(to bottom,#242424,rgba(36,36,36,.75));
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 3px #000;

}
.tooltip:after {
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
.tooltip .link-editor-toolbar-form {
  background: #242424;
  border-radius: 5px;
  color: #999;
}
.tooltip .link-editor-toolbar-form .link-editor-toolbar-input {
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
.tooltip .link-editor-toolbar-form .link-editor-toolbar-input:focus {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  box-shadow: none;
  outline: 0;
}
.tooltip .link-editor-toolbar-form .link-editor-toolbar-save, .tooltip .link-editor-toolbar-form .link-editor-toolbar-close, .tooltip .link-editor-toolbar-form .link-editor-toolbar-link {
  display: inline-block;
  font-size: 24px;
  font-weight: bolder;
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

.tooltip .link-editor-toolbar-form .link-editor-toolbar-link {
  font-size: 20px;
}
`

const template = `
<div class="link-editor-toolbar-form">
  <input type="text" class="link-editor-toolbar-input" placeholder="Paste or type a link">
  <a href="#" class="link-editor-toolbar-save">✓</a>
  <a href="#" class="link-editor-toolbar-close">✗</a>
  <a href="#" class="link-editor-toolbar-link">🔗</a>
</div>
`
