import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    siteLink,
    rank,
    ratings,
    userId,
    category,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          siteLink,
          rank,
          ratings,
          userId,
          category,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(
    slug,
    {
      title,
      content,
      featuredImage,
      status,
      siteLink,
      rank,
      ratings,
      category,
    },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          siteLink,
          rank,
          ratings,
          category,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite :: service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite :: service :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (err) {
      console.log("Appwrite :: service :: uploadFile :: error", err);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async checkAddAccess(userId) {
    const permissionCheckArray = [
      `write("user:${userId}")`,
      `delete("user:${userId}")`,
      `update("user:${userId}")`,
    ];
    try {
      const permissions = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
      );
      const permissionResultDocuments = await permissions.documents;
      for (let i = 0; i < permissionResultDocuments.length; i++) {
        const permissionResult = permissionResultDocuments[i].$permissions;
        for (let i = 0; i < permissionResult.length; i++) {
          if (permissionResult.includes(permissionCheckArray[i])) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    try {
      const document = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        conf.appwriteCategoryDocumentId,
      );
      return document.cardCategory;
    } catch (error) {
      console.log("Appwrite :: service :: getCategories :: error", error);
      return false;
    }
  }

  async addCategory(newCategory) {
    try {
      if (newCategory.length === 0) {
        return "Please enter a category name";
      }
      const document = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        conf.appwriteCategoryDocumentId,
      );

      const updatedCardCategory = [...document.cardCategory, newCategory];

      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        conf.appwriteCategoryDocumentId,
        {
          cardCategory: updatedCardCategory,
        },
      );
      return "Category Added!";
    } catch (error) {
      console.log("Appwrite :: service :: getCategories :: error", error);
      return false;
    }
  }

  async deleteCategory(selectedCategory) {
    try {
      if (selectedCategory.length === 0) {
        return "Please select category";
      }
      const document = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        conf.appwriteCategoryDocumentId,
      );

      if (!document.cardCategory.includes(selectedCategory)) {
        return "Didn't found Entered Category!";
      }

      const updatedCardCategory = document.cardCategory.filter((category) => {
        return category !== selectedCategory;
      });

      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        conf.appwriteCategoryDocumentId,
        {
          cardCategory: updatedCardCategory,
        },
      );
      return "Category deleted successfully!";
    } catch (error) {
      console.log("Appwrite :: service :: getCategories :: error", error);
      return false;
    }
  }

  async getFAQs() {
    try {
      const document = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFaqsCollectionId,
      );
      return document.documents;
    } catch (error) {
      console.log("Appwrite :: service :: getFAQs :: error", error);
    }
  }

  async addFAQ(id, { title, description }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqsCollectionId,
        id,
        {
          title,
          description,
        },
      );
      return "FAQ Added Successfully";
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async deleteFAQ(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqsCollectionId,
        id,
      );
      return "Deleted Successfully!";
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
      return false;
    }
  }

  async updateFAQ(id, { title, description }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqsCollectionId,
        id,
        {
          title,
          description,
        },
      );
      return "Updated Successfully!";
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  async addQuery(id, { name, email, message }, mailToLink) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQueryCollectionId,
        id,
        {
          name: name,
          email: email,
          message: message,
          mailToLink: mailToLink,
        },
      );
      return `Query Received! ${name} we'll contact you soon!`;
    } catch (error) {
      console.log("Appwrite :: service :: getCategories :: error", error);
      return "Some Unknown Error Occured!";
    }
  }

  async getQueries() {
    try {
      const document = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteQueryCollectionId,
      );
      return document.documents;
    } catch (error) {
      console.log("Appwrite :: service :: getFAQs :: error", error);
    }
  }

  async updateQueryStatus(id, status) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQueryCollectionId,
        id,
        {
          resolved: status,
        },
      );
      return "Query Updated!";
    } catch (error) {
      console.log("Appwrite :: service :: getFAQs :: error", error);
    }
  }

  async deleteQuery(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQueryCollectionId,
        id,
      );
      return "Query Deleted!";
    } catch (error) {
      console.log("Appwrite :: service :: getFAQs :: error", error);
    }
  }

  async checkPathAccess(path) {
    const findAccess = (ans) => {
      for (let i = 0; i < ans.length; i++) {
        console.log(ans[i].$id);
        if (ans[i].path === path) {
          return ans[i].access;
        }
      }
      return false;
    };
    try {
      const ans = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAccessibilityCollectionId,
      );
      const result = await findAccess(ans.documents);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePathAccess(path) {
    const findId = (ans) => {
      for (let i = 0; i < ans.length; i++) {
        console.log(ans[i].$id);
        if (ans[i].path === path) {
          return ans[i];
        }
      }
      return false;
    };
    try {
      const ans = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAccessibilityCollectionId,
      );
      const accessObj = await findId(ans.documents);
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAccessibilityCollectionId,
        accessObj.$id,
        {
          access: !accessObj.access,
        },
      );
      return "Access Updated!";
    } catch (error) {
      console.log("Appwrite :: service :: getFAQs :: error", error);
    }
  }
}

const service = new Service();
export default service;
