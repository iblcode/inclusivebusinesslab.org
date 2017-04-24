export function mount (ctx, props, el) {
  document.head.insertAdjacentHTML('beforeend', style)
  document.body.insertAdjacentHTML('beforeend', template)

  let state = {}

  ctx.store.subscribe( () => {
    const newState = ctx.store.getState()
    if (newState.isPublishing !== state.isPublishing) {
      if (newState.isPublishing) {
        window.location.hash= "modal-publishing-indicator"
      } else {
        window.location.hash= ""
      }
    }
    state = newState
  })
}

export function render () { return { replace: '' } }


const template = `
<div id="modal-publishing-indicator" class="overlay">
  <div class="penguin-modal" style='text-align: center;'>
    <h2>Publishing website ...</h2>
    <div class="content" style='padding-right: 25px; padding-left: 25px;'>
    <p>
      In this moment countless Penguins are working hard to create your website and send it to our Content-Delivery-Network.
      It can take a few minutes till the content is available live.</p>
    <div class="spinner" style='margin: 20px auto;'>
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    </div>
  </div>
</div>
`

const style = `
<style type="text/css">
  .penguin-modal .penguin-btn {
    padding: 10px 15px;
    margin: 20px 5px;
    display: inline-block;
    border: 1px solid black;
  }
  .penguin-modal .penguin-btn:hover {
    box-shadow: 0 0 10px 0px #888
  }
  .penguin-modal {
    z-index: 9999;
    margin: 100px auto;
    padding: 20px;
    background: #fff;
    border: 1px solid #666;
    width: 80%;
    min-width: 300px;
    max-width: 600px;
    border-radius: 6px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .penguin-modal h2 { margin-top: 0; }

  .penguin-modal .close {
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

  .penguin-modal .close:hover { opacity: 1; }

  .penguin-modal .content {
    max-height: 400px;
    overflow: auto;
  }

  .penguin-modal p {
    margin: 0 0 1em;
    text-align: left;
  }

  .penguin-modal p:last-child { margin: 0; }

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
  .spinner {
    width: 40px;
    height: 40px;

    position: relative;
    margin: 100px auto;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
<style>
`
