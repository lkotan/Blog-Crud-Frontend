export default {
  addEntities(state, entities) {
    state.entities = entities;
  },
  addSelectList(state, entities) {
    entities.unshift({ id: -1, description: "Hepsi" });
     state.selectList = entities
   },
  addEntity(state, entity) {
    state.entities.unshift(entity);
  },
  updateEntity(state, params) {
    let index = state.entities.findIndex(x => x.id == params.oldEntity.id);
    state.entities.splice(index, 1, params.entity);
  },
  delete(state, id) {
    let models = state.entities;
    state.entities = models.filter(x => x.id != id);
  },
  deleteRange(state, list) {
    let models = state.entities;
    for (let i = 0; i < list.length; i++) {
      models = models.filter(x => x.id != list[i]);
    }
    state.entities = models;
  },
}
