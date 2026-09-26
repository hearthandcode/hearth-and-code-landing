/**
 * TaskHierarchy (React port)
 * Source: src/components/knowledge/composites/TaskHierarchy.astro
 * Knowledge composite (k-composite): k-task-hierarchy
 *
 * Interactive: click to expand/collapse
 */
import * as React from 'react';

type Status = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
interface Task {
  id: string;
  title: string;
  owner?: string;
  status?: Status;
  children?: Task[];
}

function renderTask(task: Task, expanded: boolean): React.ReactNode {
  const hasChildren = task.children && task.children.length > 0;
  return (
    <li
      key={task.id}
      className={`kc-task-hierarchy__item ${hasChildren ? 'has-children' : ''} ${expanded ? 'is-expanded' : ''}`}
    >
      <div className="kc-task-hierarchy__row">
        {hasChildren && <span className="kc-task-hierarchy__toggle" />}
        <span className={`kc-task-hierarchy__status kc-task-hierarchy__status--${task.status || 'todo'}`} />
        <span className="kc-task-hierarchy__title">{task.title}</span>
        {task.owner && <span className="kc-task-hierarchy__owner">{task.owner}</span>}
      </div>
      {hasChildren && <ul>{task.children!.map((c) => renderTask(c, expanded))}</ul>}
    </li>
  );
}

export interface TaskHierarchyProps {
  tasks: Task[];
  initiallyExpanded?: boolean;
  className?: string;
}

export function TaskHierarchy({
  tasks,
  initiallyExpanded = false,
  className = '',
}: TaskHierarchyProps) {
  return (
    <div className={['kc-task-hierarchy', className].filter(Boolean).join(' ')}>
      <ul className="kc-task-hierarchy__root">
        {tasks.map((t) => renderTask(t, initiallyExpanded))}
      </ul>
    </div>
  );
}
