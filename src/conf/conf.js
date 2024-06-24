const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteCategoryCollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID),
  appwriteCategoryDocumentId: String(import.meta.env.VITE_APPWRITE_CATEGORY_DOCUMENT_ID),
  appwriteFaqsCollectionId: String(import.meta.env.VITE_APPWRITE_FAQS_COLLECTION_ID),
  appwriteFaqsDocumentId: String(import.meta.env.VITE_APPWRITE_FAQS_DOCUMENT_ID),
  web3FormAccessAPIKey: String(import.meta.env.VITE_WEB3_FORM_ACCESS_API_KEY),
  appwriteQueryCollectionId: String(import.meta.env.VITE_QUERY_COLLECTION_ID),
  appwriteQueryDocumentId: String(import.meta.env.VITE_QUERY_DOCUMENT_ID),
  tinyMceApiKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
  appwriteAccessibilityCollectionId: String(import.meta.env.VITE_ACCESSIBILITY_COLLECTION_ID),
};

export default conf;
