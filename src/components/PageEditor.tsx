import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { Mutation, Query, QueryResult } from 'react-apollo';

import GET_PAGE, { IPageQuery } from '../apollo/graphql/getPage';
import SET_PAGE from '../apollo/graphql/setPage';
import Loader from './Loader';

const Styled = styled.div`
  position: relative;
  p {
    margin: 0;
  }
  button {
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 3px;
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
  .page {
    max-width: 50rem;
    margin: auto;
    padding-top: 7rem;
    overflow: auto;
  }

  .page__section {
    margin-bottom: 2.5rem;
    display: flex;
    flex-flow: column;
  }
  .page__section label {
    margin-bottom: 0.75rem;
  }
`;

const Page: React.FC<{ page: IPage }> = props => {
  const { page } = props;
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    title: page.title,
    description: page.description,
    slug: page.slug,
    template: page.template
  });
  const SaveButton = (
    <Mutation mutation={SET_PAGE} variables={{ ...fields, id: page.id }}>
      {(savePage: any) => (
        <button
          onClick={() => {
            savePage();
            setEditing(false);
          }}
        >
          Save
        </button>
      )}
    </Mutation>
  );
  return (
    <Styled>
      <div className="toolbar">
        <div className="toolbar__section">
          <label>Page ID</label>
          <p>{page.id}</p>
        </div>
        <div className="toolbar__section">
          {!editing && (
            <button className="secondary" onClick={() => setEditing(true)}>
              Edit
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
            <input
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
      </div>
    </Styled>
  );
};

const PageEditor: React.FC<RouteComponentProps<{ pageId: string }>> = props => {
  return (
    <Query query={GET_PAGE} variables={{ id: props.pageId }}>
      {({ data, error, loading }: QueryResult<IPageQuery>) => {
        if (loading) {
          return <Loader />;
        }
        if (error) {
          return null;
        }
        if (data) {
          return <Page page={data.page} />;
        }
        return null;
      }}
    </Query>
  );
};

export default PageEditor;
