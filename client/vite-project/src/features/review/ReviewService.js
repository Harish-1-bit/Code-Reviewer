import axios from "axios"

export const ReviewText =async(codeSnippet)=>{
    console.log(codeSnippet)
    const response = await axios.post('/api/response',{codeSnippet})
    return response.data
}

