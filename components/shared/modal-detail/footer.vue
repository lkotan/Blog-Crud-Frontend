<template>
  <v-card-actions class="pt-0">
    <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('cancel')">
        Vazgeç
      </v-btn>
      <v-btn
        v-if="!isUpdate"
        color="blue darken-1"
        text
        @click="$emit('insert')"
      >
        Kaydet 
      </v-btn>
      <v-btn  v-else color="blue darken-1" text @click="$emit('update')">
        Kaydet 
      </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  props: {
    isUpdate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style>
</style>
