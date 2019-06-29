import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Styled = styled.div`
  .logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.2rem;
    color: black;
  }
`;

const StyledSymbol = styled.div`
  font-weight: 600;
  width: 2.5rem;
  height: 2.5rem;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
`;

export const Symbol: React.FC = () => <StyledSymbol>M</StyledSymbol>;

const Logo: React.FC = () => {
  return (
    <Styled>
      <Link to="/" className="logo">
        <Symbol />
        <div className="logo__name">Midtype Portfolio</div>
      </Link>
    </Styled>
  );
};

export default Logo;
