import { nanoid } from "nanoid";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import commentService from "../services/commentService";
import { useAuth } from "./useAuth";

export type IComment = {
  content: string;
  _id: string;
  userId: string;
  pageId: string;
  created_at: string;
};

type ICommentContext = {
  comments: IComment[];
  createComment: (data: any) => void;
  deleteComment: (data: any) => void;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

type Param = {
  userId: string;
};

const CommentContext = createContext<ICommentContext>({
  comments: [],
  createComment: () => "void",
  deleteComment: () => "void",
});

export const useComment = () => useContext(CommentContext);

export const CommentProvider: React.FC<Provider> = ({ children }) => {
  const { userId } = useParams<Param>();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  async function createComment(data: any) {
    if (currentUser)
      try {
        const { content } = await commentService.create({
          ...data,
          _id: nanoid(),
          userId: currentUser._id,
          pageId: userId,
          created_at: Date.now(),
        });
        setComments((prevState) => [...prevState, content]);
      } catch (error) {
        errorCatcher(error);
      }
  }

  async function getComments() {
    try {
      const { content } = await commentService.fetchAll(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(true);
    }
  }

  async function deleteComment(id: string) {
    try {
      const { content } = await commentService.remove(id);
      if (content === null)
        setComments((prevState) => prevState.filter((com) => com._id !== id));
    } catch (error) {
      errorCatcher(error);
    }
  }

  const CommentProviderValue = useMemo(
    () => ({ comments, createComment, loading, deleteComment }),
    [comments, createComment, loading, deleteComment]
  );

  return (
    <CommentContext.Provider value={CommentProviderValue}>
      {children}
    </CommentContext.Provider>
  );
};
