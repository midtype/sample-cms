declare module '*.png';
declare module 'medium-draft';
declare module 'markdown-draft-js';
declare module 'draft-js';

// GraphQL API Types
interface ISiteMetadata {
  title: string;
  author: string;
  description: string;
}

interface ISection {
  title: string;
  id: string;
}

interface IPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  template?: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface IPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  section: ISection;
  author: IUser;
  createdAt: string;
}

interface IAsset {
  id: string;
  location: string;
}

interface IPhoto {
  id: string;
  imageId: string;
  image: IAsset;
  owner: IUser;
}
