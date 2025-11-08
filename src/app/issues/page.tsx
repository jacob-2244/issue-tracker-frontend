

'use client';

import { useEffect, useState } from 'react';
import { issueAPI } from '@/lib/api';
import IssueList from '@/components/IssueList';
import IssueFilters from '@/components/IssueFilters';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { Issue } from '@/lib/types';
import Navbar from '@/components/Navbar';

interface Filters {
  status: string;
  priority: string;
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filters, setFilters] = useState<Filters>({ status: '', priority: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/login');
  }, [router]);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const res = await issueAPI.list(filters);
        setIssues(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [filters]);

  
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  if (loading) return <Loading />;

  return (
    <>
    <Navbar/>
    <div className="mx-20 my-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Issues</h2>
        <button
          onClick={() => router.push('/issues/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Issue
        </button>
      </div>

      <IssueFilters filters={filters} onChange={handleFilterChange} />
      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found.</p>
      ) : (
        <IssueList issues={issues} />
      )}
    </div>

    </>
  );
}
