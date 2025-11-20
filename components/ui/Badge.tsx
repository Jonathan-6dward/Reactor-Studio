import React from 'react';
import { VideoStatus } from '../../types';

interface BadgeProps {
  status: VideoStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles = {
    [VideoStatus.COMPLETED]: "bg-success/10 text-success border-success/20",
    [VideoStatus.PROCESSING]: "bg-primary/10 text-primary border-primary/20 animate-pulse",
    [VideoStatus.QUEUED]: "bg-muted/10 text-muted border-muted/20",
    [VideoStatus.FAILED]: "bg-error/10 text-error border-error/20",
  };

  const labels = {
    [VideoStatus.COMPLETED]: "Ready",
    [VideoStatus.PROCESSING]: "Processing",
    [VideoStatus.QUEUED]: "Queued",
    [VideoStatus.FAILED]: "Failed",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};