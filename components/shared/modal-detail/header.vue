<template>
  <v-toolbar flat color="white pb-0 pt-1">
    <span style="font-size:18px !important;" class="headline mb-2" :class="mlAuto ? '' : 'ml-3'">{{ header }}</span>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    header: {
      required: true
    },
    mlAuto: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
<style></style>
