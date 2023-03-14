const { BlobServiceClient } = require("@azure/storage-blob");
// const config = require("../config/env");

class BlobCarController {
  constructor() {
    const AZURE_STORAGE_CONNECTION_STRING =
      "DefaultEndpointsProtocol=https;AccountName=carleasing;AccountKey=EqpKjvElpsTWcu5F/W6GB8o4JR3Nxd0anXJf1UuCTA3m8hfA9S3E5DJEmHDMIm5Po4+xz0YkAAEl+AStdPhsOg==;EndpointSuffix=core.windows.net";
    //   config.AZURE_STORAGE_CONNECTION_STRING;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error("Azure Storage Connection string not found");
    }

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    this.containerName = "carimg";

    this.containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );

    this.uploadBlob = this.uploadBlob.bind(this);
  }

  async uploadBlob(simpleFile) {
    const blobName = await simpleFile.filename;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    console.log(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );
    await blockBlobClient.uploadFile(simpleFile.path, simpleFile.filename);
    console.log(`Blob was uploaded successfully`);
    return blockBlobClient.url;
  }
}

module.exports = BlobCarController;
