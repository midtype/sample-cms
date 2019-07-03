import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Symbol } from './Logo';

const Styled = styled.header`
  position: fixed;
  height: 100vh;
  width: 15rem;
  left: 0;
  top: 0;
  background: white;
  padding: 3rem;

  .nav__sections {
    margin-left: -20px;
    margin-top: 4rem;
    display: flex;
    flex-flow: column;
  }
  .nav__sections__section {
    margin: 1rem 0;
    padding: 0.2rem 0;
    padding-left: 17px;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
    cursor: pointer;
    transition: 250ms all;
    opacity: 0.6;
    border-left: 3px solid rgba(0, 0, 0, 0);
  }
  .nav__sections__section:hover {
    opacity: 1;
  }
  .nav__sections__section.active {
    opacity: 1;
    border-left: 3px solid black;
  }
`;

const Nav: React.FC = (p, c) => {
  return (
    <Styled>
      <Symbol />
      <div className="nav__sections">
        <Link
          to="/admin/pages"
          className="nav__sections__section"
          activeClassName="active"
          partiallyActive={true}
        >
          Pages
        </Link>
        <Link
          to="/admin/posts"
          className="nav__sections__section"
          activeClassName="active"
          partiallyActive={true}
        >
          Posts
        </Link>
        <Link
          to="/admin/photos"
          className="nav__sections__section"
          activeClassName="active"
          partiallyActive={true}
        >
          Photos
        </Link>
      </div>
    </Styled>
  );
};

export default Nav;
