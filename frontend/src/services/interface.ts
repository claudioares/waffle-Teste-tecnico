type Opening = {
  id: string;
  date: string;
  postId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmChannel: string | null;
};

export interface IUserResponse  {
  user: {
    id: number;
    email: string;
    streak: number;
    lastOpenedAt: string;
    openings: Opening[];
    badges: any[]; 
  };
};

export interface IUTMData {
  date: string;
  id: string;
  postId: string;
  utmCampaign: string | null;
  utmChannel: string | null;
  utmMedium: string | null;
  utmSource: string;
}