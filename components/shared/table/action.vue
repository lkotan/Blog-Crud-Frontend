<template>
  <div
    class="d-flex flex-row flex-wrap justify-content-center justify-content-sm-end table-action-buttons"
  >
    <NormalButton
      v-if="visibleNewButton"
      text="Yeni"
      icon="ti-plus"
      exClass="btn btn-inverse-success ml-2 d-flex"
      @eventClick="$parent.$emit('create')"
    />

    <NormalButton
      v-if="visibleDeleteButton"
      text="Sil"
      icon="ti-trash mr-2"
      exClass="btn btn-inverse-danger ml-2 d-flex"
      @eventClick="$parent.$emit('deleteRange')"
    />
  </div>
</template>

<script>
import NormalButton from "@/components/shared/button/normal";
export default {
  components: {
    NormalButton
  },
  props: {
    visibleDeleteButton: {
      type: Boolean,
      default: true
    },
    visibleNewButton: {
      type: Boolean,
      default: true
    },
  }
};
</script>

<style scoped>
.table-action-buttons > button:first-child {
  margin-left: 0 !important;
}
</style>
