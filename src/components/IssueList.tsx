


'use client';

import { useRouter } from 'next/navigation';
import { Issue } from '@/lib/types';

interface IssueListProps {
  issues: Issue[];
}

export default function IssueList({ issues }: IssueListProps) {
  const router = useRouter();

  return (
    <table className="min-w-full bg-white border rounded shadow">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">Title</th>
          <th className="p-3">Status</th>
          <th className="p-3">Priority</th>
          <th className="p-3">Assignee</th>
          <th className="p-3">Created</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr
            key={issue._id}
            onClick={() => router.push(`/issues/${issue._id}`)}
            className="border-t hover:bg-gray-50 cursor-pointer"
          >
            <td className="p-3">{issue.title}</td>
            <td className="p-3">{issue.status}</td>
            <td className="p-3">{issue.priority}</td>
            <td className="p-3">{issue.assignee || 'Unassigned'}</td>
            <td className="p-3 text-gray-500">
              {issue.createdAt
                ? new Date(issue.createdAt).toLocaleDateString()
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
