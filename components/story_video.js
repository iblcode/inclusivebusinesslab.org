import { update } from 'penguin.js'

export function mount(ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  document.head.insertAdjacentHTML('beforeend', style)
  el.insertAdjacentHTML('afterbegin', template)
  var input = document.getElementById('story-video-select')
  const { store } = ctx

  const updateValue = () => {
    var value = store.getState().fields[props.field]
    if (value != null) {
      while (el.lastChild.id !== 'story-video-select-span') {
        el.removeChild(el.lastChild)
      }
      el.insertAdjacentHTML('beforeend', value)
      input.value = value
    }

    if (value == null || value == '') {
      el.classList.add('empty-video')
    } else {
      if (value.indexOf('placehold.it') !== -1) {
        el.classList.add('empty-video')
      } else {
        el.classList.remove('empty-video')
      }
    }
  }

  input.addEventListener('input', function(e) {
    var cleaned = clean(this.value)
    store.dispatch(update({ [props.field]: cleaned.iframe }))
    store.dispatch(update({ [`${props.field}-sproutid`]: cleaned.sproutid }))
  })

  updateValue()
  store.subscribe(updateValue)
}

const template = `
<span id="story-video-select-span" style="z-index: 999; position: absolute; background-color: rgba(0, 0, 0, 0.65); border-radius: 0px 0px 10px 10px; left: 50%; top: 0; margin-right: -50%; transform: translate(-50%, 0);">
  <p style="padding: 15px; color: white;">Paste IFRAME:
    <input placeholder="Paste proper embed code!" style="color: black; margin-left: 10px; font-size: 10pt; min-width:300px;" id="story-video-select">
  </p>
</span>
`

const style = `
<style type="text/css">
.empty-video {
  height: 150px !important;
}
</style>
`

function clean(string) {
  let container = document.createElement('div')
  container.innerHTML = string

  let target = container.querySelector('iframe')
  if (target == null || target == '') {
    return { url: '', iframe: '' }
  }

  let id = target.src.split('videos.sproutvideo.com/embed/')[1]
  if (id != null && id != '') {
    return {
      sproutid: id,
      iframe: target.outerHTML
    }
  } else {
    return {
      sproutid: '',
      iframe: target.outerHTML
    }
  }

  return {
    thumb: src,
    iframe: target.outerHTML
  }
}

export function render(ctx, props) {
  const { store } = ctx
  var value = store.getState().fields[props.field]

  if (value != null && value != '') {
    return value
  } else {
    return { replace: '' }
  }
}
