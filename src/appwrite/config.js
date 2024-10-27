import { Client, Databases, Storage, ID, Query } from "appwrite";
import { conf } from "../conf/conf";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_PROJECT_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ slug, title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Error :: createPost :: Service", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        { title, content, status, featuredImage }
      );
    } catch (error) {
      console.log("Appwrite Error :: updatePost :: Service", error);
    }
  }

  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Error :: deletePost :: Service", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error :: getPost :: Service", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Appwrite Error :: getPost :: Service", error);
      return false;
    }
  }

  // file uploads service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Error :: uploadFile :: Service", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error :: uploadFile :: Service", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.log("Appwrite Error :: uploadFile :: Service", error);
    }
  }
}

const service = new Service();
export default service;
