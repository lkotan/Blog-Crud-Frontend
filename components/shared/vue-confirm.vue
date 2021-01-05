<template>
  <client-only>
    <vue-confirm-dialog></vue-confirm-dialog>
  </client-only>
</template>
<script>
import Vue from "vue";
import VueConfirmDialog from "vue-confirm-dialog";
Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);
export default {};
</script>