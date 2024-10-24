export interface userInfoProps {
  userId: string;
  email: string;
  iat: number;
  exp: number;
  role: string[];
}
export interface userProps {
  email: string;
  password: string;
}
export interface UploadVideoProps {
  title: string;
  year: string;
  file: File;
}
