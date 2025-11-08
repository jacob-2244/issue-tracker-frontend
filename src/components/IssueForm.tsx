



'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PRIORITY_OPTIONS, STATUS_OPTIONS, TEAM_MEMBERS } from '@/lib/constants';
import { Issue } from '@/lib/types';

interface IssueFormProps {
  onSubmit: (data: Issue) => void;
  defaultValues?: Partial<Issue>;
}

export default function IssueForm({ onSubmit, defaultValues }: IssueFormProps) {
  const { register, handleSubmit } = useForm<Issue>({ defaultValues });
  const router = useRouter();

  const handleBack = () => {
    router.push('/issues');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('title', { required: true })}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />

      <textarea
        {...register('description', { required: true })}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />

      <select {...register('priority')} className="w-full p-2 border rounded">
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select {...register('status')} className="w-full p-2 border rounded">
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select {...register('assignee')} className="w-full p-2 border rounded">
        {TEAM_MEMBERS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <div className="flex justify-between gap-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>

        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-200 w-full text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
