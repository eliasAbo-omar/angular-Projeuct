export interface User {
  uid: string;
  id: string;
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: 'male' | 'female';
  img?: string;
  settings?: {
    notifications?: boolean;
    theme?: 'dark' | 'light';
  };
}

export interface PathLink {
  name: string;
  path?: string;
}
