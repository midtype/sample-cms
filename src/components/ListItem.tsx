import styled from 'styled-components';

export default styled.div`
  padding: 2rem;
  background: white;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  h3 {
    color: black;
  }
  h3 span {
    margin-left: 1rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }
  p {
    margin: 0;
  }
  svg {
    flex: 0 0 2rem;
    height: 1rem;
    fill: black;
    margin-left: 2rem;
    transition: 250ms all;
  }
  &:hover svg {
    transform: translateX(5px);
  }
  &.add-new {
    background: rgba(255, 255, 0, 0.2);
  }
`;
