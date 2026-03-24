'use client';

import { useCallback, useEffect, useRef, useState, KeyboardEvent } from 'react';
import PencilIcon from '@/shared/asset/svg/Pencil';
import { toast } from 'sonner';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  editable?: boolean;
  multiline?: boolean;
  className?: string;
  pencilSize?: { width: string; height: string };
}

export default function EditableField({
  value,
  onSave,
  editable = true,
  multiline = false,
  className = '',
  pencilSize,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [inputWidth, setInputWidth] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const isEscaping = useRef(false);
  const isToastingRef = useRef(false);
  const baseClassName = `bg-transparent outline-none ${className}`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isEditing) setDraft(value);
  }, [value, isEditing]);

  useEffect(() => {
    if (!isEditing) return;
    const element = multiline ? textareaRef.current : inputRef.current;
    if (!element) return;
    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, multiline]);

  useEffect(() => {
    if (!multiline || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [draft, multiline]);

  useEffect(() => {
    if (!multiline && sizerRef.current) {
      setInputWidth(sizerRef.current.offsetWidth);
    }
  }, [draft, multiline]);

  const handleSave = useCallback(() => {
    if (draft.trim() === '') {
      if (!isToastingRef.current) {
        isToastingRef.current = true;
        toast.warning('내용을 입력해주세요.', {
          onDismiss: () => {
            isToastingRef.current = false;
          },
          onAutoClose: () => {
            isToastingRef.current = false;
          },
        });
      }
      return;
    }
    onSave(draft);
    setIsEditing(false);
  }, [draft, onSave]);

  const handleBlur = (e: React.FocusEvent) => {
    if (isEscaping.current) {
      isEscaping.current = false;
      return;
    }

    const next = e.relatedTarget;
    if (next instanceof Node && wrapperRef.current?.contains(next)) {
      return;
    }

    handleSave();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      isEscaping.current = true;
      setDraft(value);
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    setDraft(value);
    setIsEditing(true);
  };

  if (!editable) return <span className={className}>{value}</span>;

  if (isEditing) {
    const sharedProps = {
      value: draft,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    };

    return multiline ? (
      <textarea
        {...sharedProps}
        ref={textareaRef}
        rows={1}
        className={`${baseClassName} resize-none w-full`}
        onChange={(e) => setDraft(e.target.value)}
      />
    ) : (
      <span ref={wrapperRef} className="relative inline-flex items-center">
        <span
          ref={sizerRef}
          className={`invisible absolute whitespace-pre ${className}`}
          aria-hidden
        >
          {draft || ' '}
        </span>
        <input
          {...sharedProps}
          ref={inputRef}
          className={baseClassName}
          style={{ width: inputWidth > 0 ? inputWidth + 4 : 'auto' }}
          onChange={(e) => setDraft(e.target.value)}
        />
      </span>
    );
  }

  return (
    <span className="inline">
      <span className={`inline ${className}`}>{value}</span>
      <button
        type="button"
        onClick={startEditing}
        aria-label="편집"
        className="inline-flex items-center ml-2 translate-y-[1px] hover:opacity-70 transition-opacity cursor-pointer"
      >
        <PencilIcon {...pencilSize} />
      </button>
    </span>
  );
}
