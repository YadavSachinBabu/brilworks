import { uuid } from "uuidv4"; 

export const addComment = (data) => {
   return {
        type:"ADD_COMMENT",payload:{comment:data,id:uuid(),replyComments:[]}
    }
}

export const replyComment = (data,id) => {
    return {
         type:"REPLY_COMMENT",payload:{reply:data,replyId:uuid(),id}
     }
 }

export const replyLike = (commentId,replyId) =>{
    console.log({commentId,replyId})
    return{
        type:"LIKE_REPLY",payload:{commentId,replyId}
    }
}
export const deleteReplyComment = (commentId,replyId) => {
    return {
         type:"DELETE_REPLY_COMMENT",payload:{commentId,replyId}
     }
 }

export const  deleteComment =(id) =>{
    return{
        type:"DELETE_COMMENT",payload:id
    }
}