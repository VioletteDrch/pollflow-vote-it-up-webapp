
export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type PollAnswer = {
  id: string;
  text: string;
  userId?: string;
  createdAt: Date;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  answers: PollAnswer[];
  isTextBased: boolean;
  createdAt: Date;
};
