export interface FeedBack {
  id: 1;
  city: string;
  month: string;
  year: string;
  text: string;
  name: string;
}

export interface FeedBackResponseDTO {
  data: FeedBack[];
}
