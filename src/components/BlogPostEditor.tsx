import React, { useState } from 'react';
import { RouteComponentProps, NavigateFn, navigate } from '@reach/router';
import styled from 'styled-components';
import { Query, QueryResult, Mutation } from 'react-apollo';
import Markdown from 'react-markdown';
import { convertToRaw } from 'draft-js';

import Editor, {
  createEditorState,
  BLOCK_BUTTONS,
  ImageSideButton,
  addNewBlock,
  Block
} from 'medium-draft';
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';

import GET_SECTIONS, { ISections } from '../apollo/graphql/getSections';
import GET_POST, { IPostQuery } from '../apollo/graphql/getPost';
import SET_POST from '../apollo/graphql/setPost';
import CREATE_POST from '../apollo/graphql/createPost';
import DELETE_POST from '../apollo/graphql/deletePost';
import { UserContext } from '../layout/Editor';
import Loader from './Loader';
import { getJWT } from '../utils/jwt';

// tslint:disable-next-line
import 'medium-draft/lib/index.css';

const Styled = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 2rem;
  .toolbar {
    padding: 1rem 2rem;
    background: white;
    position: absolute;
    top: 0;
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
    padding-top: 7rem;
    width: 100%;
    max-width: 50rem;
    margin: 20px auto;
  }
  .post__container {
    background: none;
    transition: 250ms all;
    padding: 3rem;
  }
  .post__container--editing {
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .md-RichEditor-root {
    margin-top: -1rem;
    padding: 0;
    background: none;
  }
  .md-block-paragraph span[data-text] {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
  .md-sb-button,
  .md-sb-button.md-sb-img-button {
    padding: 0;
    background: rgba(0, 0, 0, 0.5);
    border: 0;
  }
  .md-sb-button.md-sb-img-button {
    padding: 7px 10px;
    width: auto;
    height: auto;
    display: flex;
  }
  .md-sb-button.md-sb-img-button:after {
    content: 'Image';
    color: white;
    letter-spacing: 0;
    font-size: 12px;
  }
  .md-sb-button svg path {
    fill: white;
  }
  .fields {
    padding-top: 7rem;
    padding-left: 2rem;
  }
  .fields__section {
    margin-bottom: 2.5rem;
    display: flex;
    flex-flow: column;
  }
  .fields__section label {
    margin-bottom: 0.75rem;
  }
  .fields__section--delete {
    margin-top: 3rem;
  }
  .fields__section--delete button {
    width: fit-content;
  }
  .fields__section p {
    margin: 0;
  }
`;

class CustomImageSideButton extends ImageSideButton {
  private onChange(e: any) {
    const file = e.target.files[0];
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
        this.props.setEditorState(
          addNewBlock(this.props.getEditorState(), Block.IMAGE, {
            src: data.location
          })
        );
      });
    this.props.close();
  }
}

const blockButtons = [
  {
    label: 'H1',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 1'
  },
  {
    label: 'H2',
    style: 'header-two',
    icon: 'header',
    description: 'Heading 2'
  }
].concat(BLOCK_BUTTONS);

const Post: React.FC<{
  post?: IPost;
  sections: ISection[];
}> = props => {
  const { post, sections } = props;
  const [editing, setEditing] = useState(post ? false : true);
  const [draft, setDraft] = useState(
    createEditorState(post ? markdownToDraft(post.body) : null)
  );
  const raw = convertToRaw(draft.getCurrentContent());
  const [fields, setFields] = useState({
    title: post ? post.title : '',
    slug: post ? post.slug : '',
    section: post ? post.section.id : sections[0].id
  });
  const SaveButton = (
    <UserContext.Consumer>
      {user => {
        return (
          <Mutation
            mutation={post ? SET_POST : CREATE_POST}
            refetchQueries={['GetPosts']}
            variables={
              post
                ? {
                    body: draftToMarkdown(raw),
                    id: post.id,
                    title: fields.title,
                    slug: fields.slug,
                    sectionId: fields.section
                  }
                : {
                    body: draftToMarkdown(raw),
                    authorId: user ? user.id : null,
                    title: fields.title,
                    slug: fields.slug,
                    sectionId: fields.section
                  }
            }
          >
            {(savePost: any) => (
              <button
                onClick={() =>
                  savePost().then((res: any) => {
                    navigate(
                      `/admin/posts/${
                        post
                          ? res.data.updatePost.post.id
                          : res.data.createPost.post.id
                      }`
                    );
                    setEditing(false);
                  })
                }
              >
                Save
              </button>
            )}
          </Mutation>
        );
      }}
    </UserContext.Consumer>
  );
  const DeleteButton = post ? (
    <Mutation
      mutation={DELETE_POST}
      variables={{ id: post.id }}
      refetchQueries={['GetPosts']}
    >
      {(deletePage: any) => (
        <button
          className="error"
          onClick={() => {
            deletePage().then(() => {
              if (navigate) {
                navigate('/admin/posts');
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
          {editing && SaveButton}
        </div>
      </div>
      <div className="fields">
        <div className="fields__section">
          <label>Title</label>
          {!editing && <p>{fields.title}</p>}
          {editing && (
            <input
              value={fields.title}
              onChange={e => setFields({ ...fields, title: e.target.value })}
            />
          )}
        </div>
        <div className="fields__section">
          <label>Slug</label>
          {!editing && <p>{fields.slug}</p>}
          {editing && (
            <input
              value={fields.slug}
              onChange={e => setFields({ ...fields, slug: e.target.value })}
            />
          )}
        </div>

        <div className="fields__section">
          <label>Section</label>
          {!editing && <p>{post ? post.section.title : ''}</p>}
          {editing && (
            <select
              value={fields.section}
              onChange={e => setFields({ ...fields, section: e.target.value })}
            >
              {sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          )}
        </div>
        {editing && DeleteButton}
      </div>
      <div className="post">
        <div
          className={`post__container post__container--${
            editing ? 'editing' : 'readonly'
          }`}
        >
          {!editing && post && <Markdown source={post.body} />}
          {editing && (
            <Editor
              blockButtons={blockButtons}
              editorState={draft}
              onChange={(newDraft: any) => setDraft(newDraft)}
              sideButtons={[
                {
                  title: 'Image',
                  component: CustomImageSideButton
                }
              ]}
            />
          )}
        </div>
      </div>
    </Styled>
  );
};

const SectionsWrapper: React.FC<{
  post?: IPost;
}> = props => (
  <Query query={GET_SECTIONS}>
    {({ data, error, loading }: QueryResult<ISections>) => {
      if (loading) {
        return <Loader />;
      }
      if (error) {
        return null;
      }
      if (data) {
        return <Post post={props.post} sections={data.sections.nodes} />;
      }
      return null;
    }}
  </Query>
);

const BlogPostEditor: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props;
  if (id === 'new') {
    return <SectionsWrapper />;
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
          return <SectionsWrapper post={data.post} />;
        }
        return null;
      }}
    </Query>
  );
};

export default BlogPostEditor;
