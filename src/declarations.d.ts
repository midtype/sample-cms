declare module '*.png';
declare module 'is-touch-device';
declare module 'graphiql';
declare module '@loadable/component';

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
