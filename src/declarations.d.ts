declare module '*.png';
declare module 'is-touch-device';
declare module 'graphiql';
declare module '@loadable/component';

declare module '@editorjs/image';
declare module '@editorjs/code';
declare module '@editorjs/embed';
declare module '@editorjs/header';
declare module '@editorjs/link';
declare module '@editorjs/list';
declare module '@editorjs/paragraph';
declare module '@editorjs/quote';
declare module '@editorjs/table';

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
}
