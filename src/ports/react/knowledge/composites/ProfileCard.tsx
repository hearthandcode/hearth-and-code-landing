/**
 * ProfileCard (React port)
 * Source: src/components/knowledge/composites/ProfileCard.astro
 * Knowledge composite (k-composite): c-profile-card
 */
import * as React from 'react';
import { Avatar } from '../atoms/Avatar';

export interface ProfileCardProps {
  name: string;
  title: string;
  bio?: string;
  avatarSrc?: string;
  className?: string;
}

export function ProfileCard({
  name,
  title,
  bio,
  avatarSrc,
  className = '',
}: ProfileCardProps) {
  const classes = ['kc-profile-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <Avatar name={name} size="lg" src={avatarSrc} />
      <div className="kc-profile-card__content">
        <h3 className="kc-profile-card__name">{name}</h3>
        <p className="kc-profile-card__title">{title}</p>
        {bio && <p className="kc-profile-card__bio">{bio}</p>}
      </div>
    </div>
  );
}
