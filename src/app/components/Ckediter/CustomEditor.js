'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




function CustomEditor() {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: [
                    'undo', 'redo', '|', 
                    'heading', '|', 
                    'bold', 'italic', '|',
                    'link', 'bulletedList', 'numberedList', '|', 
                    'blockQuote', 'insertTable', '|',
                    'imageUpload', 'mediaEmbed', '|',
                    
                ],
               
                
            }}
          
            
        />
    );
}

export default CustomEditor;
