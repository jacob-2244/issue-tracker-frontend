


'use client';

import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/lib/constants';

interface Filters {
  status: string;
  priority: string;
}

interface IssueFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function IssueFilters({ filters, onChange }: IssueFiltersProps) {
  return (
    <div className="flex gap-4">
      <select
        className="p-2 border rounded"
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priorities</option>
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
