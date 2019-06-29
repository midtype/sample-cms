import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body {
  margin: 0;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body * {
  box-sizing: border-box;
}

p, input, textarea {
  font-size: 1.2rem;
  line-height: 1.7rem;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  color: rgba(0,0,0,.7);
}

h1,h2,h3,h4,h5 {
  margin: 0;
  padding: 0;
  font-weight: 500;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a, button {
  text-decoration: none;
  cursor: pointer;
  border: 0;
  outline: none;
  padding: 0;
  font-size: inherit;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
}

`;
