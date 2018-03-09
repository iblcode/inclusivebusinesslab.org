import { update } from 'penguin.js'
import xtend from 'xtend'

const defaultRenderCallback = ({ url, dname, checkbox }) => {
  if (checkbox && url != null && url != '') {
    return {
      replace: `<a href='${url}'>${dname}</a>`
    }
  } else {
    return {
      replace: ''
    }
  }
}

const defaultMountCallback = (url, el) => {
  el.setAttribute('href', url)
}

const defaultRegister = (fn, el) => {
  el.addEventListener('click', e => {
    e.preventDefault()
    fn(e)
  })
}

const mountConfigurationScript = fn => {
  const script = document.createElement('script')
  script.setAttribute('id', 'filestack-script-config')
  script.type = 'text/javascript'
  script.async = true
  script.onload = fn
  script.src = '/filestack/script.js'
  document.getElementsByTagName('head')[0].appendChild(script)
}

const mountScript = fn => {
  const el = document.querySelector('script#filestack-script')
  if (el) return fn()
  const script = document.createElement('script')
  script.setAttribute('id', 'filestack-script')
  script.type = 'text/javascript'
  script.async = true
  script.onload = () => mountConfigurationScript(fn)
  script.src = 'https://api.filestackapi.com/filestack.js'
  document.getElementsByTagName('head')[0].appendChild(script)
}

export function render(
  { store },
  { field, defaultURL, callback = defaultRenderCallback }
) {
  const { fields } = store.getState()
  const obj = {}
  obj.url = fields[field]
  obj.dname = fields[`${field}-dname`]
  obj.checkbox = fields[`${field}-checkbox`]
  return callback(obj)
}

export function mount(ctx, props, el) {
  if (process.env.PENGUIN_ENV === 'production') return
  const { store, save } = ctx
  const {
    field,
    defaultURL,
    callback = defaultMountCallback,
    register = defaultRegister
  } = props
  const render = url => callback(url || defaultURL || '', el)
  const nonOpts = ['defaultURL', 'callback']
  const opts = Object.keys(props)
    .filter(k => nonOpts.indexOf(k) === -1)
    .reduce((opts, k) => xtend({}, opts, { [k]: props[k] }), {})
  let { fields: { [field]: previousURL } } = store.getState()
  render(previousURL)
  store.subscribe(() => {
    const { fields: { [field]: url } } = store.getState()
    if (url !== previousURL && previousURL && previousURL.match(/filestack/)) {
      const xhr = new window.XMLHttpRequest()
      xhr.open('DELETE', `/filestack?url=${previousURL}`, true)
      xhr.send()
    }
    const oldURL = previousURL
    previousURL = url
    if (url !== oldURL) {
      render(url)
      // updateInput(url)
    }
  })
  mountScript(() => {
    register(e => {
      window.filepicker.pick(opts, ({ url }) => {
        store.dispatch(update({ [field]: url }))
        save()
      })
    }, el)
  })

  // Add HTML
  el.insertAdjacentHTML('afterend', editHtml)

  // Edit input
  el.parentNode
    .querySelector('.pngn-edit-span')
    .addEventListener('click', () => {
      let name = prompt('Add label')
      store.dispatch(update({ [`${field}-dname`]: name }))
    })
  const updateName = () => {
    var value = ctx.store.getState().fields[`${field}-dname`]
    if (value != null && value != '') {
      el.innerHTML = value
    } else {
      el.innerHTML = 'Add file'
    }
  }
  updateName()
  ctx.store.subscribe(updateName)

  // Checkbox
  var checkbox = el.parentNode.querySelector('.pngn-edit-checkbox')
  checkbox.addEventListener('click', e => {
    store.dispatch(update({ [`${field}-checkbox`]: checkbox.checked }))
  })
  const updateCheckbox = () => {
    var value = store.getState().fields[`${field}-checkbox`]

    if (value != null) {
      checkbox.checked = value
    } else {
      checkbox.checked = false
    }
  }
  updateCheckbox()
  store.subscribe(updateCheckbox)

  // input
  const updateInput = () => {
    var value = store.getState().fields[field]
    if (value != null) {
      el.parentNode.querySelector('.pngn-edit-input').value = value
    } else {
      el.parentNode.querySelector('.pngn-edit-input').value = ''
    }
  }
  updateInput()
  store.subscribe(updateInput)
}

// const editHtml = `
// <input placeholder='Name bearbeiten' style='border: none; display: inline; font-family: inherit; font-size: inherit; padding: none; width: auto;'>
// `

const editHtml = `
<br> <p style="margin-top:15px;">
  <span class='pngn-edit-span' style='cursor: pointer;'>&#9998; Edit label</span>
<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
  <label><input class='pngn-edit-checkbox' type="checkbox"/>   Show?</label>
<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
<label>Link to file: <input class='pngn-edit-input' onClick='this.select();' readonly/>   </label></p>
`
