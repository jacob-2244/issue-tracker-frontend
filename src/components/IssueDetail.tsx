


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_OPTIONS, TEAM_MEMBERS } from '@/lib/constants';
import { Issue } from '@/lib/types';

interface IssueDetailProps {
  issue: Issue;
  onUpdate: (data: Partial<Issue>) => Promise<void>;
}

export default function IssueDetail({ issue, onUpdate }: IssueDetailProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    status: issue.status,
    assignee: issue.assignee,
  });

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setFormData({
      status: issue.status,
      assignee: issue.assignee,
    });
  }, [issue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdated(false);
  };

  const handleSave = async () => {
    await onUpdate(formData);
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleBack = () => {
    router.push('/issues');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{issue.title}</h2>
      <p className="text-gray-700">{issue.description}</p>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Assignee</label>
        <select
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          {TEAM_MEMBERS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 items-center mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Issue
        </button>

        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>

      {updated && (
        <p className="text-green-600 text-sm mt-2">
           Issue updated successfully!
        </p>
      )}
    </div>
  );
}
