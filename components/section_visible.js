export function mount(ctx, props, el) {}

export function render(ctx, props) {
  const { store } = ctx;

  const value = store.getState().fields[props.section];

  if (value == true) {
    return { attrs: {} };
  } else return { replace: "" };
}
