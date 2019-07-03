import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, NavigateFn } from '@reach/router';
import { Mutation, Query, QueryResult } from 'react-apollo';

import GET_PAGE, { IPageQuery } from '../apollo/graphql/getPage';
import SET_PAGE from '../apollo/graphql/setPage';
import CREATE_PAGE from '../apollo/graphql/createPage';
import DELETE_PAGE from '../apollo/graphql/deletePage';
import { UserContext } from '../layout/Editor';
import Loader from './Loader';

const Styled = styled.div`
  position: relative;
  p {
    margin: 0;
  }
  textarea {
    height: 10rem;
  }
  .toolbar {
    padding: 1rem 2rem;
    background: white;
    position: absolute;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toolbar__section {
    display: flex;
    flex-flow: column;
  }
  .toolbar__section p {
    font-size: 0.8rem;
    font-weight: 600;
  }
  .toolbar__section--buttons {
    flex-flow: row;
  }
  .toolbar__section--buttons button {
    margin-left: 0.5rem;
  }
  .page {
    max-width: 50rem;
    margin: auto;
    padding-top: 7rem;
    overflow: auto;
    display: flex;
    flex-flow: column;
  }

  .page__section {
    margin-bottom: 2.5rem;
    display: flex;
    flex-flow: column;
  }
  .page__section label {
    margin-bottom: 0.75rem;
  }
  .page__section--delete {
    margin-top: 3rem;
  }
  .page__section--delete button {
    width: fit-content;
  }
`;

const Page: React.FC<{ navigate?: NavigateFn; page?: IPage }> = props => {
  const { page, navigate } = props;
  const [editing, setEditing] = useState(page ? false : true);
  const [fields, setFields] = useState({
    title: page ? page.title || '' : '',
    description: page ? page.description || '' : '',
    slug: page ? page.slug || '' : '',
    template: page ? page.template || '' : ''
  });
  const SaveButton = (
    <UserContext.Consumer>
      {user => {
        return (
          <Mutation
            mutation={page ? SET_PAGE : CREATE_PAGE}
            refetchQueries={['GetPages']}
            variables={
              page
                ? { ...fields, id: page.id }
                : { ...fields, ownerId: user ? user.id : null }
            }
          >
            {(savePage: any) => (
              <button
                onClick={() => {
                  savePage().then(() => setEditing(false));
                }}
              >
                Save
              </button>
            )}
          </Mutation>
        );
      }}
    </UserContext.Consumer>
  );
  const DeleteButton = page ? (
    <Mutation
      mutation={DELETE_PAGE}
      variables={{ id: page.id }}
      refetchQueries={['GetPages']}
    >
      {(deletePage: any) => (
        <button
          className="error"
          onClick={() => {
            deletePage().then(() => {
              if (navigate) {
                navigate('/admin/pages');
              }
            });
          }}
        >
          Delete
        </button>
      )}
    </Mutation>
  ) : null;
  return (
    <Styled>
      <div className="toolbar">
        <div className="toolbar__section">
          <label>Page ID</label>
          <p>{page ? page.id : 'New Page'}</p>
        </div>
        <div className="toolbar__section toolbar__section--buttons">
          {!editing && (
            <button className="secondary" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          {editing && (
            <button className="secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          )}
          {editing && SaveButton}
        </div>
      </div>
      <div className="page">
        <div className="page__section">
          <label>Title</label>
          {!editing && <h2>{fields.title}</h2>}
          {editing && (
            <input
              value={fields.title}
              onChange={e => setFields({ ...fields, title: e.target.value })}
            />
          )}
        </div>
        <div className="page__section">
          <label>Description</label>
          {!editing && <p>{fields.description}</p>}
          {editing && (
            <textarea
              value={fields.description}
              onChange={e =>
                setFields({ ...fields, description: e.target.value })
              }
            />
          )}
        </div>
        <div className="page__section">
          <label>Slug</label>
          {!editing && <p>{fields.slug}</p>}
          {editing && (
            <input
              value={fields.slug}
              onChange={e => setFields({ ...fields, slug: e.target.value })}
            />
          )}
        </div>
        <div className="page__section">
          <label>Template</label>
          {!editing && <p>{fields.template}</p>}
          {editing && (
            <input
              value={fields.template}
              onChange={e => setFields({ ...fields, template: e.target.value })}
            />
          )}
        </div>
        {editing && (
          <div className="page__section page__section--delete">
            {DeleteButton}
          </div>
        )}
      </div>
    </Styled>
  );
};

const PageEditor: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const { id, navigate } = props;
  if (id === 'new') {
    return <Page navigate={navigate} />;
  }
  return (
    <Query query={GET_PAGE} variables={{ id }}>
      {({ data, error, loading }: QueryResult<IPageQuery>) => {
        if (loading) {
          return <Loader />;
        }
        if (error) {
          return null;
        }
        if (data) {
          return <Page page={data.page} navigate={navigate} />;
        }
        return null;
      }}
    </Query>
  );
};

export default PageEditor;
