import React, { useState } from 'react';
import { RouteComponentProps, NavigateFn } from '@reach/router';
import styled from 'styled-components';
import Loadable from '@loadable/component';
import { Query, QueryResult } from 'react-apollo';
import Markdown from 'react-markdown';

import EditorJSImage from '@editorjs/image';
import EditorJSCode from '@editorjs/code';
import EditorJSEmbed from '@editorjs/embed';
import EditorJSHeader from '@editorjs/header';
import EditorJSLink from '@editorjs/link';
import EditorJSList from '@editorjs/list';
import EditorJSParagraph from '@editorjs/paragraph';
import EditorJSQuote from '@editorjs/quote';
import EditorJSTable from '@editorjs/table';

import GET_POST, { IPostQuery } from '../apollo/graphql/getPost';
import Loader from './Loader';
import { getJWT } from '../utils/jwt';

const EditorJs = Loadable(() => import('react-editor-js'));

const Styled = styled.div`
  position: relative;

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
    margin: 0;
  }
  .toolbar__section--buttons {
    flex-flow: row;
  }
  .toolbar__section--buttons button {
    margin-left: 0.5rem;
  }
  .post {
    max-width: 50rem;
    margin: auto;
    padding-top: 9rem;
  }
  .codex-editor {
    padding-top: 1rem;
    overflow: hidden;
    margin: auto;
    background: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.06);
  }
`;

const EditorConfig = {
  code: { class: EditorJSCode },
  embed: { class: EditorJSEmbed },
  header: { class: EditorJSHeader },
  link: { class: EditorJSLink },
  list: { class: EditorJSList },
  paragraph: { class: EditorJSParagraph },
  quote: { class: EditorJSQuote },
  table: { class: EditorJSTable },
  image: {
    class: EditorJSImage,
    config: {
      uploader: {
        uploadByFile: (file: File) =>
          new Promise(res => {
            const formData = new FormData();
            formData.append('asset', file, file.name);
            fetch('https://api-staging.midtype.com/upload', {
              method: 'POST',
              headers: {
                authorization: `Bearer ${getJWT()}`
              },
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                res({
                  success: 1,
                  file: {
                    url: data.location
                  }
                });
              });
          })
      }
    }
  }
};

const Post: React.FC<{ navigate?: NavigateFn; post?: IPost }> = props => {
  const { post } = props;
  const [editing, setEditing] = useState(false);
  let a: any = null;
  const onC = () => console.log(a);
  return (
    <Styled>
      <div className="toolbar">
        <div className="toolbar__section">
          <label>Post ID</label>
          <p>{post ? post.id : 'New Post'}</p>
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
        </div>
      </div>
      <div className="post">
        {!editing && post && <Markdown source={post.body} />}
        {editing && (
          <EditorJs
            tools={EditorConfig}
            instanceRef={(instance: any) => {
              a = instance;
            }}
          />
        )}
      </div>
    </Styled>
  );
};

const BlogPostEditor: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const { id, navigate } = props;
  if (id === 'new') {
    return <Post navigate={navigate} />;
  }
  return (
    <Query query={GET_POST} variables={{ id }}>
      {({ data, error, loading }: QueryResult<IPostQuery>) => {
        if (loading) {
          return <Loader />;
        }
        if (error) {
          return null;
        }
        if (data) {
          return <Post post={data.post} navigate={navigate} />;
        }
        return null;
      }}
    </Query>
  );
};

export default BlogPostEditor;
