import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button, Card, Select } from '@/components/ui';
import { useUploadMedia } from '@/hooks/admin';
import type { MediaType, UploadedMedia } from '@/core/types';

const FOLDER_OPTIONS = [
  { value: 'general', label: 'Général' },
  { value: 'projects', label: 'Projets' },
  { value: 'about', label: 'À propos' },
  { value: 'skills', label: 'Compétences' },
  { value: 'services', label: 'Services' },
];

const TYPE_OPTIONS = [
  { value: 'image', label: 'Image' },
  { value: 'raw', label: 'PDF / document' },
];

interface MediaUploaderProps {
  onUploaded: (media: UploadedMedia) => void;
}

export function MediaUploader({ onUploaded }: MediaUploaderProps) {
  const upload = useUploadMedia();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('general');
  const [type, setType] = useState<MediaType>('image');

  const submit = () => {
    if (!file) return;
    upload.mutate(
      { file, folder, type },
      {
        onSuccess: (media) => {
          onUploaded(media);
          setFile(null);
          if (inputRef.current) inputRef.current.value = '';
        },
      }
    );
  };

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="font-heading font-semibold text-text">Uploader un fichier</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Dossier" options={FOLDER_OPTIONS} value={folder} onChange={setFolder} />
        <Select
          label="Type"
          options={TYPE_OPTIONS}
          value={type}
          onChange={(value) => setType(value as MediaType)}
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={type === 'image' ? 'image/*' : '.pdf'}
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
      />
      <div className="flex justify-end">
        <Button onClick={submit} isLoading={upload.isPending} disabled={!file}>
          <Upload className="h-4 w-4" />
          Uploader
        </Button>
      </div>
    </Card>
  );
}
