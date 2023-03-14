const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require("dotenv");
dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Azure Storage Connection string not found");
}
//console.log(AZURE_STORAGE_CONNECTION_STRING)

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

const containerName = "carimg";

// console.log("\nconnecting container...");
// console.log("\t", containerName);

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);

//console.log(`Container was created successfully.\n\tURL: ${containerClient.url}`);

async function blob_upload(simpleFile) {
  const blobName = await simpleFile.filename;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  );
  await blockBlobClient.uploadFile(simpleFile.path, simpleFile.filename);
  console.log(`Blob was uploaded successfully`);
  return blockBlobClient.url;
}

module.exports = {
  blobServiceClient,
  containerClient,
  blob_upload,
};
// module.exports = blobServiceClient;
// module.otherMethod  = containerClient;
