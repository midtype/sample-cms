import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from './Logo';

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
  align-items: center;

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
      <Logo />
      <div className="nav__sections">
        {props.pages.map(page => (
          <div key={page.id} className="nav__sections__section">
            <Link to={page.slug}>{page.title}</Link>
          </div>
        ))}
        <div className="nav__sections__section">
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav__sections__section">
          <Link to="/photography">Photography</Link>
        </div>
      </div>
    </Styled>
  );
};

export default Nav;
