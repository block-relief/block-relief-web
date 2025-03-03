export type LocalUser = {
  id: string;
  username: string;
  photoUrl: string | null;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  photo_url: string;
  role: string;
};
