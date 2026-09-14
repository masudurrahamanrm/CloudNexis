
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";


// const embeddings = new OpenAIEmbeddings({
//   model: "gemini-embedding-001"

// });

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GEMINI_API_KEY,
});

const pinecone = new PineconeClient();
const pineconeIndex=pinecone.index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(
  embeddings,
  {
    pineconeIndex,  // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    maxConcurrency: 5, // You can pass a namespace here too // namespace: "foo",  
  }
);

export async function indexTheDocument(filePath){
    const loader=new PDFLoader(filePath,{splitPages:false});
    const doc= await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 500, 
        chunkOverlap: 50 
    })
    const texts = await textSplitter.splitText(doc[0].pageContent)

   const documents= texts.map((chunk) =>{
        return{
         pageContent:chunk,
         metadata:doc[0].metadata
        };     
    });

  //  console.log("chunks :",documents.length)
    await vectorStore.addDocuments(documents);
    // console.log(documents)
 
    
}