import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";

interface BaseEditorProps{
  initialValue?: string,
  onChange?: (html: string) => void,
};

export default function BaseEditor({ initialValue = '', onChange }: BaseEditorProps) {
  const editorRef = useRef<Editor>(null);

  function handleChange() {
    const html = editorRef?.current
      ? editorRef?.current.getInstance().getHTML()
      : "";
    onChange && onChange(html)
  }

  return (
    <Editor
      height="300px"
      initialEditType="wysiwyg"
      initialValue={initialValue}
      onChange={handleChange}
      previewStyle="vertical"
      ref={editorRef}
      useCommandShortcut={true}
    />
  );
}
