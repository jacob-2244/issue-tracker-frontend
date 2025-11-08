'use client';

import IssueForm from '@/components/IssueForm';
import { issueAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Issue } from '@/lib/types';

export default function CreateIssuePage() {
  const router = useRouter();

  const handleCreate = async (data: Issue) => {
    await issueAPI.create(data);
    router.push('/issues');
  };

  return (
    <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create New Issue</h2>
      <IssueForm onSubmit={handleCreate} />
    </div>
  );
}
