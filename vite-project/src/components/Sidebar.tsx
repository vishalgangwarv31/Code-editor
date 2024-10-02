import React from 'react';

interface FileTreeProps {
  files: Record<string, string>;
  onSelectFile: (fileName: string) => void;
  onCreateFile: () => void;
  onDeleteFile: (fileName: string) => void;
}

const Sidebar: React.FC<FileTreeProps> = ({ files, onSelectFile, onCreateFile, onDeleteFile }) => {
  return (
    <div className="sidebar">
      <button onClick={onCreateFile}>New File</button>
      <ul>
        {Object.keys(files).map((fileName) => (
          <li key={fileName}>
            <button onClick={() => onSelectFile(fileName)}>{fileName}</button>
            <button onClick={() => onDeleteFile(fileName)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
