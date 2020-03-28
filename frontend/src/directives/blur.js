const blur = {};

function setBlur(el, binding) {
  el.style.cursor = !binding.value ? "not-allowed" : "inherit";
}

blur.install = function(Vue) {
  Vue.directive("blur", {
    bind(el, binding) {
      setBlur(el, binding);
    }
  });
};
export default blur;
