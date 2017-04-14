import Taggle from 'taggle'

export function mount (ctx, props, el) {


  var css = document.createElement("style")
  css.type = "text/css"
  css.innerHTML = style
  document.head.appendChild(css)

  document.body.insertAdjacentHTML('beforeend', template)

  el.addEventListener('click', () => {
    window.location.hash= modalId
  })



  var taggle = new Taggle(inputId, {duplicateTagClass: 'bounce', preserveCase: false})

  document.getElementById(submitButtonId).addEventListener('click', () => {
    const input = taggle.getTags()

    el.innerText = input.values.join(', ')
    window.location.hash= ''
  })
}

export function render (ctx, props) {
  return {replace: ''}
}


const localId = "tagmodal"
const modalId = `modal-${localId}`
const inputId = `input-${localId}`
const submitButtonId = `submit-${localId}`

const template = `
<div id="${modalId}" class="overlay">
  <a class="cancel" href="#"></a>
  <div class="modal">
    <a class="m-close" href="#">x</a>
    <h2>Add Tags</h2>
    <div class="content">
      <p>Add and remove tags or click outside the modal to close.</p>
      <div id="${inputId}" style="width: 100%; position: relative;"></div>
    </div>
    <div class="content">
      <a class="penguin-btn" href="javascript:;" id="${submitButtonId}"> Submit</a>
    </div>
  </div>
</div>
`

const style = `
.modal .penguin-btn {
  padding: 10px 15px;
  margin: 20px 5px;
  display: inline-block;
  border: 1px solid black;
}
.modal .penguin-btn:hover {
  box-shadow: 0 0 10px 0px #888
}
.modal {
  z-index: 9999;
  margin: 100px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #666;
  width: 400px;
  border-radius: 6px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  position: relative;
}

.modal h2 { margin-top: 0; }

.modal .m-close {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 20px;
  opacity: 0.8;
  transition: all 200ms;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #777;
}

.modal .m-close:hover { opacity: 1; }

.modal .content {
  max-height: 400px;
  overflow: auto;
}

.modal p {
  margin: 0 0 1em;
  text-align: left;
}

.modal p:last-child { margin: 0; }

.overlay {
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms;
  visibility: hidden;
  opacity: 0;
}

.overlay .cancel {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}

// TAGGLE
@-webkit-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0); }
  40% {
    -webkit-transform: translateY(-16px); }
  60% {
    -webkit-transform: translateY(-7px); } }

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0);
            transform: translateY(0); }
  40% {
    -webkit-transform: translateY(-16px);
            transform: translateY(-16px); }
  60% {
    -webkit-transform: translateY(-7px);
            transform: translateY(-7px); } }

.bounce {
  -webkit-animation-name: bounce;
          animation-name: bounce; }
.taggle_list {
  float: left;
  width: 100%; }

.taggle_input {
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 300; }

.taggle_list li {
  float: left;
  display: inline-block;
  white-space: nowrap;
  font-weight: 500;
  margin-bottom: 5px; }

.taggle_list .taggle {
  margin-right: 8px;
  background: #E2E1DF;
  padding: 5px 10px;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  transition: all .3s;
  -webkit-animation-duration: 1s;
          animation-duration: 1s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both; }

.taggle_list .taggle_hot {
  background: #cac8c4; }

.taggle_list .taggle .close {
  font-size: 1.1rem;
  position: absolute;
  top: 0.55rem;;
  right: 3px;
  text-decoration: none;
  padding-left: 2px;
  padding-top: 3px;
  line-height: 0.5;
  color: #ccc;
  color: rgba(0, 0, 0, 0.2);
  padding-bottom: 4px;
  display: none;
  border: 0;
  background: none;
  cursor: pointer; }

.taggle_list .taggle:hover {
  padding: 5px;
  padding-right: 15px;
  background: #ccc;
  transition: all .3s; }

.taggle_list .taggle:hover > .close {
  display: block; }

.taggle_list .taggle .close:hover {
  color: #990033; }

.taggle_placeholder {
  position: absolute;
  color: #CCC;
  top: 12px;
  left: 8px;
  transition: opacity, .25s;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }

.taggle_input {
  padding: 8px;
  padding-left: 0;
  float: left;
  margin-top: -5px;
  background: none;
  width: 100%;
  max-width: 100%; }

.taggle_sizer {
  padding: 0;
  margin: 0;
  position: absolute;
  top: -500px;
  z-index: -1;
  visibility: hidden; }

/*container styles*/
textarea.input,
.textarea.input {
  border: 0;
  background: #FDFDFD;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(255, 255, 255, 0.7);
  min-height: 60px;
  padding: 8px;
  border-radius: 3px;
  color: #555;
  transition: all .25s;
  cursor: text;
  margin-bottom: 10px;
  position: relative; }

.textarea.input:focus,
.textarea.input.active,
textarea.input:focus,
textarea.input.active {
  background: #fff;
  transition: all .25s; }

.textarea.input,
textarea.input {
  height: auto; }

.textarea.tags {
  position: relative; }

.textarea.tags * {
  box-sizing: content-box; }

.placeholder_input {
  position: relative; }

.placeholder_input span {
  position: absolute;
  color: #AAA;
  top: 50%;
  margin-top: -11px;
  left: 10px; }

.placeholder_input input {
  width: 120px; }

.ui-autocomplete {
  position: absolute;
  top: 0;
  left: 0; }

.ui-menu {
  list-style: none;
  padding: 2px;
  margin: 0;
  display: block;
  outline: none; }

.ui-widget-content {
  background: #fff;
  color: #990033; }

.ui-menu .ui-menu-item {
  margin: 0;
  padding: 0;
  width: 100%; }

.ui-menu .ui-menu-item a {
  text-decoration: none;
  display: block;
  padding: 2px .4em;
  line-height: 1.5;
  min-height: 0;
  font-weight: normal;
  color: #8a8a8a;
  cursor: pointer; }
  .ui-menu .ui-menu-item a:hover {
    color: #fff;
    background: #990033; }

.ui-state-hover,
.ui-widget-content .ui-state-hover,
.ui-widget-header .ui-state-hover,
.ui-state-focus,
.ui-widget-content .ui-state-focus,
.ui-widget-header .ui-state-focus {
  background: #990033;
  color: #fff !important; }

.ui-state-hover a,
.ui-state-hover a:hover,
.ui-state-hover a:link,
.ui-state-hover a:visited {
  color: #fff; }

.ui-state-active,
.ui-widget-content .ui-state-active,
.ui-widget-header .ui-state-active {
  border: 1px solid #aaaaaa;
  background: #ffffff;
  font-weight: normal;
  color: #212121; }

.ui-helper-hidden {
  display: none; }

.ui-helper-hidden-accessible {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px; }

.autocomplete {
  max-height: 200px;
  overflow: scroll;
  position: absolute;
  top: 66px;
  background: white;
  width: 99.5%;
  left: 0.25%;
  z-index: 2; }

.autocomplete ul li {
  display: block;
  padding: 6px 8px; }

.autocomplete ul li.selected, .autocomplete ul li:hover {
  background: #ff6633;
  color: #fff;
  cursor: pointer; }

.ui-autocomplete {
  max-height: 200px;
  overflow: scroll;
  width: 99% !important; }

.custom.textarea {
  border-radius: 0;
  box-shadow: none; }
  .custom.textarea .taggle {
    border-radius: 0;
    padding: 5px;
    padding-right: 20px; }
    .custom.textarea .taggle .close {
      display: inline-block;
      right: 3px; }

.custom.delicious {
  background-image: linear-gradient(to bottom, #eee 1%, #fff 15%);
  border: 1px solid #AAA;
  min-height: 50px; }
  .custom.delicious.active {
    border-color: #3274D1;
    background-image: linear-gradient(to bottom, #eee 1%, #fff 15%); }
  .custom.delicious .taggle {
    color: #444;
    border-radius: 0;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    background-color: #ddd;
    font-family: sans-serif;
    font-size: 0.8rem;
    padding: 5px;
    padding-left: 20px; }
    .custom.delicious .taggle .close {
      color: #aaa;
      font-size: 0.9rem;
      height: 0.7rem;
      width: 0.7rem;
      line-height: .1rem;
      margin-top: 3px;
      right: auto;
      left: 5px; }
      .custom.delicious .taggle .close:hover {
        color: #888; }

.custom.stackoverflow {
  border: 1px solid #ccc;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
  .custom.stackoverflow .taggle {
    color: #3E6D8E;
    border-radius: 0;
    background-color: #E0EAF1;
    font-weight: 200; }
    .custom.stackoverflow .taggle.taggle_hot {
      background: #BDD0DD; }
    .custom.stackoverflow .taggle .close {
      color: #aaa;
      border-radius: 0.7rem;
      font-size: 0.9rem;
      height: 0.7rem;
      width: 0.7rem;
      line-height: .1rem;
      margin-top: 3px; }
      .custom.stackoverflow .taggle .close:hover {
        background: #C03434;
        color: #fff; }

`
