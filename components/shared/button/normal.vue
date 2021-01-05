<template>
  <button
    class="btn font-weight-medium position-relative"
    :class="exClass"
    type="button"
    @click="eventClick()"
  >
    <i :class="icon" v-if="icon != ''"></i>
    <p class="mb-0">{{ text }}</p>
  </button>
</template>

<script>
import { BootstrapVueIcons } from "bootstrap-vue";
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: "BUTTON"
    },
    exClass: {
      type: String,
      required: false,
      default: ""
    },
    icon: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    eventClick() {
      this.$emit("eventClick");
    }
  }
};
</script>

<style></style>
