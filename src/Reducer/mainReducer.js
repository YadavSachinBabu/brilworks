export default function mainReducer(state = [], action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];

    case "REPLY_COMMENT":
      const data = state.find((state) => state.id === action.payload.id);
      const index = state.findIndex((state) => state.id === action.payload.id);
      const copy = [...state];
      if (data) {
        copy[index] = {
          ...data,
          replyComments: [
            ...data.replyComments,
            {
              reply: action.payload.reply,
              replyId: action.payload.replyId,
              likes: 0,
            },
          ],
        };
        return copy;
      }
      return copy;

    case "LIKE_REPLY":
      const likeCount = 0;
      const likeableData = state.find(
        (state) => state.id === action.payload.commentId
      );
      const likeableIndex = state.findIndex(
        (state) => state.id === action.payload.commentId
      );
      const repLikes = likeableData.replyComments.map((item) => {
        if (item.replyId === action.payload.replyId) {
            return { ...item, likes: item.likes + 1 };
        } else {
          return item;
        }
      });
      const copyState = [...state];
      copyState[likeableIndex] = { ...likeableData, replyComments: repLikes };
      return copyState;

    case "DELETE_REPLY_COMMENT":
      const deletableData = state.find(
        (state) => state.id === action.payload.commentId
      );
      const deletableIndex = state.findIndex(
        (state) => state.id === action.payload.commentId
      );
      const updatedReplyComments = deletableData.replyComments.filter(
        (reply) => reply.replyId !== action.payload.replyId
      );
      const stateCopy = [...state];
      stateCopy[deletableIndex] = {
        ...deletableData,
        replyComments: updatedReplyComments,
      };
      return stateCopy;

    case "DELETE_COMMENT":
      return state.filter((state) => state.id !== action.payload);

    default:
      return state;
  }
}
