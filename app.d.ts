declare module '*.svg' {
  const content: React.FunctionComponent<SVGAttributes<SVGAElement>>;
  export default content;
}

declare module 'classnames'