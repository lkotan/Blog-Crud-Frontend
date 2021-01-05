import RepositoryService from "../Repositories/RepositoryService";

import CategoryService from "../services/CategoryService";
import AuthorService from "../services/AuthorService";
import BlogService from "../services/BlogService";
import DashService from "../services/DashService";

export default (context, inject) => {
   inject('RepositoryService', new RepositoryService(context))

   inject('CategoryService', new CategoryService(context))
   inject('AuthorService', new AuthorService(context))
   inject('BlogService', new BlogService(context))
   inject('DashService', new DashService(context))
}