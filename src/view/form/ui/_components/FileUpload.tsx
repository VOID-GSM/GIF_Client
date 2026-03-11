'use client';
import { useDropzone } from 'react-dropzone';
import { Upload } from '@/shared/asset/svg/Upload';
import { Cancel } from '@/shared/asset/svg/Cancel';
import { useState } from 'react';
import { UploadFile } from '@/shared/asset/svg/UploadFile';

export function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setUploadedFiles([acceptedFiles[0]]);
      }
    },
    multiple: false
  });

  const deletedFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  };

  return (
    <div className="bg-main-card w-full mt-[27px]">
      {uploadedFiles.length === 0 ? (
        <section className="border-dashed border-2 border-gray-50 rounded-[10px]">
          <div
            {...getRootProps({
              className: 'flex flex-col items-center text-center p-[30px] cursor-pointer',
            })}
          >
            <input {...getInputProps()} />
            <Upload />
            <p className="text-gray-50 mt-6">클릭하거나 파일을 드래그하여 업로드</p>
          </div>
        </section>
      ) : (
        <div className="mt-7 flex flex-col gap-3 bg-white">
          {uploadedFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between border border-gray-70 rounded-3 px-8 py-4 w-full bg-white rounded-[10px]"
            >
              <div className="flex items-center gap-4">
                <UploadFile />
                <div className="flex flex-col text-left">
                  <span className="text-black font-bold text-sm">{file.name}</span>
                  <span className="text-gray-40 text-sm">{formatBytes(file.size)}</span>
                </div>
              </div>

              <button onClick={() => deletedFile(file.name)} className="cursor-pointer">
                <Cancel />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
