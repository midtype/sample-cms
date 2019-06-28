import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface IProps {
  pages: IPage[];
}

const Styled = styled.header`
  width: 100vw;
  height: 5rem;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;

  .nav__logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.2rem;
    color: black;
  }

  .nav__logo__letter {
    width: 2.5rem;
    height: 2.5rem;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
  }
  .nav__sections {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav__sections__section a {
    color: black;
    margin: 0.5rem 1rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    transition: 250ms all;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
  }
  .nav__sections__section:hover a {
    color: rgba(0, 0, 0, 1);
    transform: translateY(-3px);
    border-bottom: 2px solid black;
  }
`;

const Nav: React.FC<IProps> = props => {
  return (
    <Styled>
      <Link to="/" className="nav__logo">
        <div className="nav__logo__letter">M</div>
        <div className="nav__logo__name">Midtype Portfolio</div>
      </Link>
      <div className="nav__sections">
        {props.pages.map(page => (
          <div key={page.id} className="nav__sections__section">
            <Link to={page.slug}>{page.title}</Link>
          </div>
        ))}
      </div>
    </Styled>
  );
};

export default Nav;
