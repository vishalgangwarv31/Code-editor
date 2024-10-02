import { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import Sidebar from './components/Sidebar';
import * as ts from 'typescript';
import './App.css'

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const [files, setFiles] = useState<Record<string, string>>({
    'index.js': '// Start coding here',
  });
  const [selectedFile, setSelectedFile] = useState<string>('index.js');
  const [code, setCode] = useState<string>(files[selectedFile]);
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    setCode(files[selectedFile] || '');
  }, [selectedFile]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleSave = () => {
    const updatedFiles = { ...files, [selectedFile]: code };
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleReset = () => {
    setCode('');
  };

  const handleCreateFile = () => {
    const newFileName = `file${Object.keys(files).length + 1}.${language === 'javascript' ? 'js' : 'ts'}`;
    setFiles({ ...files, [newFileName]: '' });
    setSelectedFile(newFileName);
  };

  const handleDeleteFile = (fileName: string) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileName];
    setFiles(updatedFiles);
    if (selectedFile === fileName) {
      setSelectedFile(Object.keys(updatedFiles)[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  const handleRunCode = () => {
    try {
      if (language === 'javascript') {
        const result = eval(code);
        setOutput(String(result));
      } else if (language === 'typescript') {
        const transpiledCode = ts.transpile(code);
        const result = eval(transpiledCode);
        setOutput(String(result));
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  return (
      <div className="app">
      <div className="files-section">
        <Sidebar
          files={files}
          onSelectFile={setSelectedFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
        />
      </div>
      <div className='right-side'>
        <div className="code-editor">
        <div className="header">
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleRunCode}>Run Code</button>
        </div>
          <CodeEditor language={language} value={code} onChange={setCode} />
        </div>
        <div className="output-section">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
      </div>
  
    
      
  );
};

export default App;
