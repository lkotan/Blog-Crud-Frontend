export default {
  async getAll(state) {
    const res = await this.$AuthorService.GetAll() ?? [];
    state.commit("addEntities", res);
    return res;
  },
  async getSelectList(state) {
    const res = await this.$AuthorService.SelectList() ?? [];
    state.commit("addSelectList", res);
    return res;
  },
  async insert(state,entity) {
    const res = await this.$AuthorService.Insert(entity);
    if (res.success) {
      entity.id = res.data;
      state.commit("addEntity",entity);
    }
    return res;
  },
  async update(state, params) {
    const res = await this.$AuthorService.Update(params.entity);
    if (res.success) state.commit("updateEntity", params)
    return res;
  },
  async delete(state,id) {
    const res = await this.$AuthorService.Delete(id);
    if (res.success) state.commit('delete', id);
    return res;
  },
   async deleteRange(state, list) {
     let res = await this.$AuthorService.DeleteRange(list);
     state.commit('deleteRange', res.filter(x => x.success).select("data"));
     return res;
   },
}