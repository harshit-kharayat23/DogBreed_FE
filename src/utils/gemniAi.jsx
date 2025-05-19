import { GoogleGenerativeAI } from "@google/generative-ai";


const gemni_Ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMNI_API);

export default gemni_Ai;
