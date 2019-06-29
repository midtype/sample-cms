import React from 'react';
import { PageRendererProps } from 'gatsby';
import styled from 'styled-components';
import Loadable from '@loadable/component';

const EditorJs = Loadable(() => import('react-editor-js'));

import Editor from '../../layout/Editor';

const Styled = styled.div`
  margin-top: 3rem;
  .codex-editor {
    padding-top: 1rem;
    overflow: hidden;
    max-width: 50rem;
    margin: auto;
    background: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.06);
  }
`;

const AdminPages: React.FC<PageRendererProps> = props => {
  return (
    <Editor location={props.location}>
      <Styled>
        <EditorJs
          data={{
            time: 1556098174501,
            blocks: [
              {
                type: 'header',
                data: {
                  text: 'My New Post',
                  level: 1
                }
              },
              {
                type: 'paragraph',
                data: {
                  text: 'Hello everyone!'
                }
              }
            ]
          }}
        />
      </Styled>
    </Editor>
  );
};

export default AdminPages;
