import { uuid } from "uuidv4"; 

export const addComment = (data) => {
   return {
        type:"ADD_COMMENT",payload:{comment:data,id:uuid()}
    }
}

export const replyComment = (data,id) => {
    return {
         type:"REPLY_COMMENT",payload:{data,id}
     }
 }
export const deleteReplyComment = (id) => {
    console.log(id)
    return {
         type:"DELETE_REPLY_COMMENT",payload:id
     }
 }

export const  deleteComment =(id) =>{
    return{
        type:"DELETE_COMMENT",payload:id
    }
}