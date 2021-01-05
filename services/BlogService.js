import RepositoryService from "../Repositories/RepositoryService";
export default class CategoryService extends RepositoryService {
  constructor(context) {
    super("Blogs");
    this.context = context
  }
  async Get(id) {
    return await super.Get(id);
  }
  async Insert(model) {
    return await super.Insert(model);
  }
  async Update(model) {
    return await super.Update(model);
  }
  async Delete(id) {
    return await super.Delete(id);
  }
  async DeleteRange(list) {
    return await super.DeleteRange(list);
  }
  async GetAll(authorId, categoryId, keyword) {
    let query = "";
    let search = `&keyword=${keyword}`;
    if (keyword != "") {
      if (categoryId != -1) {
        if (authorId != -1) query = `?categoryId=${categoryId}&authorId=${authorId}${search}`
        else query = `?categoryId=${categoryId}${search}`;
      }
      else query = `?keyword=${keyword}`
    } else {
      if (categoryId != -1) {
        if (authorId != -1) query = `?categoryId=${categoryId}&authorId=${authorId}`
        else query = `?categoryId=${categoryId}`;
      }
      else {
         if (authorId != -1) query = `?authorId=${authorId}`
      }
    }
    return (await this.context.$axios.get(`/Blogs${query}`)).data;
  }
  async SelectList() {
    return (await this.context.$axios.get(`/Blogs/SelectList`)).data;
  }
}
