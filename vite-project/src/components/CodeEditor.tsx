
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue);
  };

  return (
    <MonacoEditor
      height="500px"
      language={language === "typescript" ? "typescript" : "javascript"}
      value={value}
      onChange={handleEditorChange}
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
};

export default CodeEditor;
