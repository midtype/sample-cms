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

input, textarea {
  padding: 1rem;
  outline: none;
  border: 1px solid rgba(0,0,0,.2);
}

h1,h2,h3,h4,h5 {
  margin: 0;
  padding: 0;
  font-weight: 500;
  line-height: initial !important;
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

button, .button {
  padding: 0.5rem 1rem;
  border: 1px solid black;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 0.6rem;
  background: black;
  color: white;
  cursor: pointer;
}

button.secondary {
  background: white;
  color: black;
}

button.error {
  background: red;
  border-color: red;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
}

h3 {
  font-size: 1.75rem;
  font-weight: 700;
}

label {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
}

`;
