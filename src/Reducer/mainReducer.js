import { logRoles } from "@testing-library/dom";

export default function mainReducer(state = [], action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return [
        ...state,
        {
          comment: action.payload.comment,
          id: action.payload.id,
          replyComment: "",
          likes: "10",
        },
      ];

    case "REPLY_COMMENT":
      const data = state.find((state) => state.id === action.payload.id);
      const newData = { ...data, replyComment: action.payload.data };
      const index = state.findIndex((state) => state.id === action.payload.id);
      state.splice(index, 1, newData);

    case "DELETE_COMMENT":
      return state.filter((state) => state.id !== action.payload);

    default:
      return state;
  }
}
