export default {
  getAll(state) {
    return state.entities;
  },
  getSelectList(state) {
    return state.selectList;
  },
  getKeyword(state) {
    return state.keyword;
  },
  getCategoryId(state) {
    return state.categoryId;
  },
  getAuthorId(state) {
    return state.authorId;
  }
}