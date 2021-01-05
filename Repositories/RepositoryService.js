export default class RepositoryService {
  constructor(base) {
    this.base = base;
  }
  async Get(id) {
    return (await this.context.$axios.get(`/${this.base}/${id}`)).data;
  }
  async Update(model) {
    return (await this.context.$axios.put(`/${this.base}`, model)).data;
  }
  async Insert(model) {
    return (await this.context.$axios.post(`/${this.base}`, model)).data;
  }
  async Delete(id) {
    return (await this.context.$axios.delete(`/${this.base}/${id}`)).data;
  }
  async DeleteRange(list) {
    return (await this.context.$axios.post(`/${this.base}/DeleteRange`, list)).data;
  }
}
