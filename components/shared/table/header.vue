<template>
  <div class="card-header d-flex justify-content-between">
    <h4 class="d-flex align-items-center m-0">{{ header }}</h4>
    <v-col class="ml-auto py-0 search" cols="12" md="3">
      <v-text-field
        class="p-0 m-0"
        v-model="key"
        append-icon="mdi-magnify"
        label="Ara:"
        hide-details
        @input="$emit('search', key)"
      ></v-text-field>
    </v-col>
    <Action
      :visibleDeleteButton="visibleDeleteButton"
      :visibleNewButton="visibleNewButton"
    />
  </div>
</template>

<script>
import Action from "@/components/shared/table/action"
export default {
  components:{
    Action
  },
  props:{
     header: {
      type: String,
      required: false,
    },
    visibleDeleteButton: {
      type: Boolean,
      default: true,
    },
    visibleNewButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      key: "",
    };
  },
}
</script>

<style>

</style>