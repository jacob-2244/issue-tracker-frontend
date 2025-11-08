



'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { issueAPI } from '@/lib/api';
import IssueDetail from '@/components/IssueDetail';
import Loading from '@/components/Loading';
import { Issue } from '@/lib/types';

export default function IssueDetailPage() {
  const { id } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/login');
  }, [router]);

 
  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      try {
        const res = await issueAPI.get(id as string);
        setIssue(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIssue();
  }, [id]);

 
  const handleUpdate = async (data: Partial<Issue>): Promise<void> => {
    if (!id) return;
    await issueAPI.update(id as string, data);
    router.refresh();
  };

  if (loading) return <Loading />;
  if (!issue) return <p>Issue not found.</p>;

  return (
    <div className="mt-20 max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <IssueDetail issue={issue} onUpdate={handleUpdate} />
    </div>
  );
}
