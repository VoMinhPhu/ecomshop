//Comment
export type Reply = {
  id: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  role: 'admin' | 'user';
  comment: string;
  createdAt: string;
};

export type Review = {
  id: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  rating?: number;
  comment: string;
  createdAt: string;
  updatedAt?: string | null;
  role: 'user' | 'admin';
  replies: Reply[];
};

export type ReplyCommentResponse = {
  productId: string;
  id: string;
  reviewId: string;
};

//Rating
type RatingItem = {
  star: number;
  count: number;
  percent: number;
};

export type RatingSummary = {
  total: number;
  average: number;
  ratings: RatingItem[];
};
