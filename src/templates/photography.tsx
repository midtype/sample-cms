import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

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
    margin-top: 3rem;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 1rem;
  }
  .photos-list::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  .photos-list > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  .photos-list__photo {
    background-size: cover;
    background-position: center center;
  }
`;

interface IQueryData {
  allPhotos: {
    nodes: IPhoto[];
  };
  allAssets: {
    nodes: IAsset[];
  };
}

const Page: React.FC<{ pageContext: IPage; data: IQueryData }> = props => {
  const { title, description } = props.pageContext;
  const photos = props.data.allPhotos.nodes;
  const assets = props.data.allAssets.nodes;
  return (
    <Layout>
      <Styled>
        <div className="header">
          <h1 className="header__title">{title}</h1>
          <p className="header__description">{description}</p>
        </div>
        <div className="photos-list">
          {photos.map(photo => {
            const image = assets.find(asset => asset.id === photo.imageId);
            return (
              <div
                key={photo.id}
                className="photos-list__photo"
                style={{
                  backgroundImage: `url('${image ? image.location : ''}')`
                }}
              />
            );
          })}
        </div>
      </Styled>
    </Layout>
  );
};

export const query = graphql`
  query GetPhotos {
    allPhotos(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        imageId
      }
    }
    allAssets {
      nodes {
        id
        location
      }
    }
  }
`;

export default Page;
