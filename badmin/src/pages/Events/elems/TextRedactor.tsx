import React, { useRef, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TextField } from '@mui/material';
import { useChangeFnEventField } from '../../../hooks/useChangeFnEventField';

type Props = {
  title?: string;
  text?: string;
};

const TextRedactor = ({ title }: Props) => {
  const editorRef = useRef(null);

  const handleChange = useChangeFnEventField('title');

  const log = () => {
    if (editorRef.current) {
      // @ts-ignore
      console.log(editorRef.current.getContent());
    }
  };

  console.log('render TextRedactor');

  return (
    <div>
      <TextField
        label='Заголовок'
        type='text'
        fullWidth
        sx={{ mb: 2 }}
        value={title || ''}
        focused={!!title}
        onChange={handleChange}
      />
      <Editor
        apiKey='mkbhjdmg9784ilfvaggoe0alboviospc5ch4sdz6e8yqqwic'
        // @ts-ignore
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={log}
        init={{
          height: 350,
          menubar: false,
          plugins: [
            'a11ychecker',
            'advcode',
            'casechange',
            'export',
            'formatpainter',
            'image',
            'editimage',
            'linkchecker',
            'autolink',
            'lists',
            'checklist',
            'media',
            'mediaembed',
            'pageembed',
            'permanentpen',
            'powerpaste',
            'table',
            'advtable',
            'tableofcontents',
            'tinycomments',
            'tinymcespellchecker',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          toolbar_mode: 'floating',
          tinycomments_mode: 'embedded',
        }}
      />
    </div>
  );
};

export default memo(TextRedactor);
