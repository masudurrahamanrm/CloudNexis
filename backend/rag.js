/** 
implementation plan 
Step 1:indexing
1.load the document-pdf,text
2.chunk the document
3.generate vector embeddings
4.store the vector embeddings - vector database

Step 2:using the chatbot
1.setuo LLM
2.Add retrieval step
3.pass input + relevant information to LLM
4.done

*/

// import { indexTheDocument } from "../company_chatbot/prepare.js";

// const filePath='./cloudnexis.pdf'

// indexTheDocument(filePath)

import { indexTheDocument } from "./prepare.js";

const filePath = "./cloudnexis.pdf";

await indexTheDocument(filePath);
