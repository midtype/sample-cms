import React, { useState } from 'react';
import { PageRendererProps } from 'gatsby';
import { Query, QueryResult, Mutation } from 'react-apollo';
import styled from 'styled-components';

import Editor, { UserContext } from '../../layout/Editor';
import Loader from '../../components/Loader';

import GET_PHOTOS, { IPhotos } from '../../apollo/graphql/getPhotos';
import CREATE_PHOTO from '../../apollo/graphql/createPhoto';
import DELETE_PHOTO from '../../apollo/graphql/deletePhoto';
import { getJWT } from '../../utils/jwt';

const Styled = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
  }
  .header input {
    display: none;
  }
  .photos-list {
    margin-top: 3rem;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
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
  .photos-list__photo__actions {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 250ms all;
  }
  .photos-list__photo:hover .photos-list__photo__actions {
    opacity: 1;
  }
`;

const PhotosList: React.FC<{ photos: IPhoto[] }> = props => (
  <div className="photos-list">
    {props.photos.length > 0 ? (
      props.photos.map(photo => (
        <Mutation
          key={photo.id}
          mutation={DELETE_PHOTO}
          refetchQueries={['GetPhotos']}
          variables={{ id: photo.id }}
        >
          {(deletePhoto: any) => (
            <div
              className="photos-list__photo"
              style={{ backgroundImage: `url('${photo.image.location}')` }}
            >
              <div className="photos-list__photo__actions">
                <button onClick={deletePhoto}>Delete</button>
              </div>
            </div>
          )}
        </Mutation>
      ))
    ) : (
      <label>No Photos Uplodaded</label>
    )}
  </div>
);

const AdminPages: React.FC<PageRendererProps> = props => {
  const [loading, setLoading] = useState(false);
  return (
    <Editor location={props.location}>
      <UserContext.Consumer>
        {user => (
          <Styled>
            <div className="header">
              <h2>My Photos</h2>
              <Mutation mutation={CREATE_PHOTO} refetchQueries={['GetPhotos']}>
                {(addPhoto: any) => (
                  <div>
                    <input
                      type="file"
                      name="add-photo"
                      id="add-photo"
                      multiple={true}
                      onChange={e => {
                        setLoading(true);
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                          const body = new FormData();
                          body.append('asset', file, file.name);
                          fetch(`${process.env.GATSBY_API_URL}/upload`, {
                            method: 'POST',
                            headers: {
                              authorization: `Bearer ${getJWT()}`
                            },
                            body
                          })
                            .then(response => response.json())
                            .then(data => {
                              const { asset_id } = data;
                              return addPhoto({
                                variables: {
                                  imageId: asset_id,
                                  ownerId: user ? user.id : null
                                }
                              });
                            })
                            .then(() => setLoading(false))
                            .catch(() => setLoading(false));
                        });
                      }}
                    />
                    <label className="button" htmlFor="add-photo">
                      Add Photo
                    </label>
                  </div>
                )}
              </Mutation>
            </div>
            {loading && <Loader />}
            <Query query={GET_PHOTOS}>
              {({
                data,
                error,
                loading: queryLoading
              }: QueryResult<IPhotos>) => {
                if (queryLoading) {
                  return <Loader />;
                }
                if (error) {
                  return null;
                }
                if (data) {
                  return <PhotosList photos={data.photos.nodes} />;
                }
                return null;
              }}
            </Query>
          </Styled>
        )}
      </UserContext.Consumer>
    </Editor>
  );
};

export default AdminPages;
