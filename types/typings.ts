export type UserDetails = {
  fname: string;
  lname: string;
  email: string;
  image: string;
  profession: string;
  bio: string;
  username: string;
  website: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export type ModalContent = {
  title: string;
  confirmTitle: string;
  action: any;
  description: string;
  possitive?: boolean;
};
