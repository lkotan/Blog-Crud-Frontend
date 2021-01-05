export default {
  async getAll(state) {
    const res = await this.$BlogService.GetAll(state.getters.getAuthorId,state.getters.getCategoryId,state.getters.getKeyword) ?? [];
    state.commit("addEntities", res);
    return res;
  },
  async getSelectList(state) {
    const res = await this.$BlogService.SelectList() ?? [];
    state.commit("addSelectList", res);
    return res;
  },
  async insert(state,entity) {
    const res = await this.$BlogService.Insert(entity);
    if (res.success) {
      entity.id = res.data;
      state.commit("addEntity",entity);
    }
    return res;
  },
  async update(state, params) {
    const res = await this.$BlogService.Update(params.entity);
    if (res.success) state.commit("updateEntity", params)
    return res;
  },
  async delete(state,id) {
    const res = await this.$BlogService.Delete(id);
    if (res.success) state.commit('delete', id);
    return res;
  },
   async deleteRange(state, list) {
     let res = await this.$BlogService.DeleteRange(list);
     state.commit('deleteRange', res.filter(x => x.success).select("data"));
     return res;
   },
}