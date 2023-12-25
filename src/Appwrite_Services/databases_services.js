import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

export class DatabasesService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, imageId, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appweriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: cratePost :: error", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, imageId, status, userId }) {
    try {
      return await this.databases.updateDocument(
        config.appwritDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwritDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(
        config.appweriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwritDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
}
const databasesService = new DatabasesService();
export default databasesService;
