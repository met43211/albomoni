'use client';

import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

type Props = {
  value: string;
  className?: string;
};

const DraftJsRenderer: React.FC<Props> = ({ value, className }) => {
  const [html, setHtml] = useState('');
  const [desc, setDesc] = useState<any[]>([]);
  useEffect(() => {
    try {
      const contentState = convertFromRaw(JSON.parse(value));
      const editorState = EditorState.createWithContent(contentState);
      const generatedHtml = stateToHTML(editorState.getCurrentContent());
      setHtml(generatedHtml);
    } catch (error) {
      setDesc(value.split('\n'));
    }
  }, [value]);
  return (
    <>
      {desc.length ? (
        <div className='w-full flex flex-col'>
          {desc.map((stroke) => (
            <h6
              key={stroke}
              className='w-full font-medium select-text cursor-text'
            >
              {stroke}
            </h6>
          ))}
        </div>
      ) : (
        <div
          className={`select-text ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      <style>{`ul, ol, menu{
        margin: auto;
        padding-left: 20px;
        padding-top: 10px;
      }
      ol{
        list-style-type: decimal;
      }
      ul{
        list-style-type: disc;
      }
      h1{
        font-size: 25px;
      }`}</style>
    </>
  );
};

export default DraftJsRenderer;
