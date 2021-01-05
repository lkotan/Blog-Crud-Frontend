<template>
  <v-menu
    v-model="value"
    :absolute="false"
    :open-on-hover="false"
    :close-on-click="true"
    :close-on-content-click="true"
    :offset-x="false"
    :offset-y="true"
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on" color="primary">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list class="btn-dropdown-list">
      <v-list-item @click="$emit('edit')">
        <v-list-item-title>
          <v-icon class="mr-2">ti-pencil-alt</v-icon>Düzenle
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="run('remove')">
        <v-list-item-title>
          <v-icon class="mr-2">ti-trash</v-icon>Sil
        </v-list-item-title>
      </v-list-item>

      <v-divider v-if="items != undefined && items.length > 0"></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="$emit(item.emit)"
      >
        <v-list-item-title>
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: false
    }
  },
  data: () => ({
    value: false
  }),
  methods: {
    async run(emit) {
      if (emit == "remove") await this.deleteAction(this.$route.name, this.id);
    }
  }
};
</script>

<style>
.v-list.btn-dropdown-list.v-sheet > div {
  padding: 0.25rem 0.5rem;
  min-height: initial;
}

.v-list.btn-dropdown-list.v-sheet > div > div {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  line-height: initial;
}
.editModal {
  font-size: 0.9rem;
}
.v-list.btn-dropdown-list.v-sheet > div > div > i {
  font-size: 1rem;
}
.v-list.btn-dropdown-list.v-sheet hr {
  margin: 0.25rem;
}
</style>
