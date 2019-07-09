import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Layout from '../layout/Layout';

const Styled = styled.div`
  .header {
    text-align: center;
  }
  .header__title {
    margin-bottom: 1.5rem;
  }
  .header__description {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 2.25rem;
  }
  .photos-list {
    position: absolute;
    width: 100vw;
    left: 0;
    margin: 3rem 0;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-auto-rows: 20rem;
    grid-gap: 1rem;
  }
  .photos-list__photo {
    overflow: hidden;
  }
  .photos-list__photo .gatsby-image-wrapper {
    min-height: 100%;
  }
`;

interface IQueryData {
  allPhoto: {
    nodes: IPhoto[];
  };
  allAsset: {
    nodes: IAsset[];
  };
}

const Page: React.FC<{ pageContext: IPage; data: IQueryData }> = props => {
  const photos = props.data.allPhoto.nodes;
  return (
    <Layout>
      <Styled>
        <div className="header">
          <h1 className="header__title">Photography</h1>
        </div>
        <div className="photos-list">
          {photos.map(photo => (
            <div key={photo.id} className="photos-list__photo">
              <Img fluid={photo.localImage.childImageSharp.fluid} />
            </div>
          ))}
        </div>
      </Styled>
    </Layout>
  );
};

export const query = graphql`
  query GetPhotos {
    allPhoto(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        localImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default Page;
