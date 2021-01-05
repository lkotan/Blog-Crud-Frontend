<template>
  <section class="w-100">
    <div class="card">
      <TableHeader
        header="Yazarlar"
        @create="create"
        @deleteRange="deleteRange"
        @search="key => (search = key)"
      />
      <div class="card-body p-0">
        <v-data-table
          :no-results-text="noResultText(search)"
          :search="search"
          v-model="selected"
          :headers="headers"
          :items="entities"
          item-key="id"
          show-select
          :footer-props="{ 'items-per-page-text': 'Listelenecek :' }"
        >
          <template v-slot:item.actions="{ item }">
            <ModalBtnDropdown :id="item.id" @edit="edit(item.id)" />
          </template>
        </v-data-table>
      </div>
    </div>

    <!--INSERT MODAL-->
    <v-dialog v-model="dialog" persistent max-width="760px">
      <v-card>
        <ModalDetailHeader header="Yeni Yazar" />
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="entity.firstName"
                  :rules="validation.required"
                  label="Adı"
                  placeholder="Adı"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="row-modal">
                <v-text-field
                  v-model="entity.lastName"
                  :rules="validation.required"
                  label="Soyadı"
                  placeholder="Soyadı"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="entity.email"
                  :rules="validation.email"
                  label="Email"
                  placeholder="Email"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="row-modal">
                <v-text-field
                  v-model="entity.gsm"
                  :rules="validation.phone"
                  label="Gsm"
                  placeholder="Gsm"
                  dense
                  outlined
                  v-mask="'(###)-###-####'"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <ModalDetailFooter @insert="Insert" @cancel="dialog = false" />
      </v-card>
    </v-dialog>

      <!--UPDATE MODAL-->
    <v-dialog
      v-model="dialogUpdate"
      persistent
      :max-width="customModalMaxWidth(loading, false, 760)"
    >
     <Loading v-if="loading"/>
      <v-card v-else>
        <ModalDetailHeader header="Yazar Düzenle" />
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="updateEntity.firstName"
                  :rules="validation.required"
                  label="Adı"
                  placeholder="Adı"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="row-modal">
                <v-text-field
                  v-model="updateEntity.lastName"
                  :rules="validation.required"
                  label="Soyadı"
                  placeholder="Soyadı"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="updateEntity.email"
                  :rules="validation.email"
                  label="Email"
                  placeholder="Email"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="row-modal">
                <v-text-field
                  v-model="updateEntity.gsm"
                  :rules="validation.phone"
                  label="Gsm"
                  placeholder="Gsm"
                  dense
                  outlined
                  v-mask="'(###)-###-####'"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <ModalDetailFooter
          :isUpdate="true"
          @update="Update"
          @cancel="dialogUpdate = false"
        />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOptions, confirmOption } from "@/helpers/plugin-options";
import { inputValidation } from "../../helpers/vuetify";
import TableHeader from "@/components/shared/table/header";
import ModalBtnDropdown from "@/components/shared/modal-dropdown/btn-dropdown";
import ModalDetailHeader from "@/components/shared/modal-detail/header";
import ModalDetailFooter from "@/components/shared/modal-detail/footer";
import Loading from "@/components/shared/modal-loading";

export default {
  components: {
    TableHeader,
    ModalBtnDropdown,
    ModalDetailHeader,
    ModalDetailFooter,
    Loading
  },
  data() {
    return {
      ...tableOptions.defaultData,
      headers: [
        { text: "Adı", value: "firstName" },
        { text: "Soyadı", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Gsm", value: "gsm" },
        tableOptions.actionColumn
      ],
      valid: true,
      loading: false,
      validation: inputValidation,
      dialog: false,
      dialogUpdate: false,
      entity: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        gsm: "",
      },
      updateEntity: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        gsm: "",
      },
    };
  },
  async asyncData(state) {
    await state.store.dispatch("authors/getAll");
  },
  computed: {
    ...mapGetters({
      entities: "authors/getAll"
    })
  },
  methods: {
    clearInput() {
      this.entity = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        gsm: "",
      };
    },
    create() {
      this.clearInput();
      this.dialog = true;
    },
    async Insert(){
      if (!this.$refs.form.validate()) return;
      this.entity.gsm=this.entity.gsm.clearPhone();
      await this.insertAction("authors", this.entity);
      this.dialog = false;
    },
    async edit(id) {
      this.loading = true;
      this.dialogUpdate = true;
      this.updateEntity=await this.$AuthorService.Get(id);
      this.loading=false;
    },
    async Update() {
      if (!this.$refs.form.validate()) return;
      let oldEntity=JSON.parse(JSON.stringify(this.entities.filter(x=>x.id==this.updateEntity.id)));
      this.updateEntity.gsm=this.updateEntity.gsm.clearPhone();
      await this.updateAction("authors", {oldEntity:oldEntity[0],entity:this.updateEntity});
      this.dialogUpdate = false;
    },
    async deleteRange() {
      await this.deleteRangeAction("authors", this.selected.select("id"));
    }
  }
};
</script>

<style></style>
