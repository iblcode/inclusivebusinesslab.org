
export function mount (ctx, props, el) {

  var a = el.querySelectorAll('[data-selector]')
  for ( var i = 0; i < a.length; ++i ) {

    const path = window.location.pathname.match(/\/(.+?)\/(.*)/)

    if (a[i].dataset.selector === path[1] ) {
      el.querySelector('[data-show]').innerHTML = a[i].innerHTML
    }

    a[i].href = `${a[i].href}/${path[2]}`
  }
}

export function render (ctx, props) {
  return props.innerHTML
}
