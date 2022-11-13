import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const MarkdownEditor = ({handleEditorChange}) => {
   

    return (
        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

    )
}

export default MarkdownEditor;