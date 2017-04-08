import slugify from 'slugify'

// const template = `
// <div class="modal penguin-add-team fade" tabindex="-1" role="dialog">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h4 class="modal-title">Add Next-Gen Leader</h4>
//       </div>
//       <div class="modal-body">
//         <p>
//           What is his name?
//           <input id="modal_name">
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// `

export function mount (ctx, props, el) {
  // const $ = window.jQuery
  // document.body.innerHTML = document.body.innerHTML + template
  function relocate (slug) {
    window.location.href = `/${ctx.language}/team/${slug}`
  }

  el.addEventListener('click', () => {
    const id = prompt("Next-Gen Leader's Name?")
    relocate(slugify(id))
  })

}

export function render () { return { replace: '' } }
