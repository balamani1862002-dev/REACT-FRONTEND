import React, { useRef, useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter description...',
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
  });

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const getButtonClass = (isActive: boolean) => {
    return `px-3 py-1 rounded transition-colors ${
      isActive
        ? 'bg-royal-purple text-white'
        : 'hover:bg-soft-lavender hover:text-royal-purple'
    }`;
  };

  return (
    <div className={`border border-light-lavender rounded-lg overflow-hidden bg-white ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-light-lavender">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className={getButtonClass(activeFormats.bold) + ' font-bold'}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className={getButtonClass(activeFormats.italic) + ' italic'}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className={getButtonClass(activeFormats.underline) + ' underline'}
          title="Underline"
        >
          U
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className={getButtonClass(activeFormats.ul)}
          title="Bullet List"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="4" cy="6" r="2" />
            <circle cx="4" cy="12" r="2" />
            <circle cx="4" cy="18" r="2" />
            <rect x="10" y="5" width="12" height="2" rx="1" />
            <rect x="10" y="11" width="12" height="2" rx="1" />
            <rect x="10" y="17" width="12" height="2" rx="1" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className={getButtonClass(activeFormats.ol)}
          title="Numbered List"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <text x="2" y="8" fontSize="8" fontWeight="bold" fill="currentColor">1.</text>
            <text x="2" y="14" fontSize="8" fontWeight="bold" fill="currentColor">2.</text>
            <text x="2" y="20" fontSize="8" fontWeight="bold" fill="currentColor">3.</text>
            <rect x="10" y="5" width="12" height="2" rx="1" />
            <rect x="10" y="11" width="12" height="2" rx="1" />
            <rect x="10" y="17" width="12" height="2" rx="1" />
          </svg>
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        className="min-h-[120px] p-3 focus:outline-none text-deep-indigo prose prose-sm max-w-none"
        data-placeholder={placeholder}
        style={{
          wordBreak: 'break-word',
        }}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        [contenteditable] ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        [contenteditable] strong {
          font-weight: bold;
        }
        [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
