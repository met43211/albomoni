import { FormEvent, SyntheticEvent, useState } from 'react';

export const FilesSend = () => {
  const [files, setFiles] = useState<FileList | undefined>();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyODE5ODE1LCJpYXQiOjE3MTIyMTUwMTUsImp0aSI6IjFlYTY5YmUzZWE5ZTQwYjBhNThiYmFhYTlmMmIxNWQ3IiwidXNlcl9pZCI6MX0.hB9Ym3yY40l6mal2O9O6Mwpx74PndWjbDopJWTjgJQo';

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    setFiles(target.files);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i += 1) {
      formData.append('file', files[i]);
    }

    await fetch('http://192.168.22.188:8000/api/v1/create/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleInputChange}
      />
      <button type='submit'>Отправить</button>
    </form>
  );
};
