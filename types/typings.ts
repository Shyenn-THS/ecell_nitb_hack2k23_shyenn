export type UserDetails = {
  fname: string;
  lname: string;
  email: string;
  image: string;
  profession: string;
  bio: string;
  age: string;
  username: string;
  gender: string;
};

export type ModalContent = {
  title: string;
  confirmTitle: string;
  action: any;
  description: string;
  possitive?: boolean;
};
