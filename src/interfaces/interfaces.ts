export interface IOpeningWebhook {
  email: string;
  postId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmChannel?: string;
  userId?: number;
};

interface IUpdateUser {
  streak: number;
  lastOpenedAt: Date;
}

export interface IResponseOpennewsletter {
  message: string
  user: IUpdateUser
}

export interface IUserData {
  id: string;
  date: string; 
  postId: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmChannel?: string | null;
}

export interface IUser {
  id: number;
  email: string;
  streak: number;
  lastOpenedAt: Date | null;
};

export interface IUserLogin {
  email: string;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  dateEarned: string;
}

interface Opening {
  id: string;
  date: Date;
  postId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmChannel?: string;
}
export interface UserResponse {
  user: {
    id: number;
    email: string;
    streak: number;
    lastOpenedAt: string;
    openings: Opening[];
    badges: Badge[];
  };
}

export interface IGetInfoAdmin {
    startDate?: string;
    endDate?: string;
    streakStatus?: string;
    postId?: string;
}