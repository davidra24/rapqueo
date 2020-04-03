import Vue from 'vue';

export const errorMsg = (title, text) => {
  Vue.swal({
    title,
    text,
    icon: 'error',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
};
export const successMsg = (title, text) => {
  Vue.swal({
    title,
    text,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
};
export const warningMsg = (title, text) => {
  Vue.swal({
    title,
    text,
    icon: 'warning',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
};
