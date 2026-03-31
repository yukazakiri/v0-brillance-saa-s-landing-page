'use client';

import { useState } from 'react';
import { User, ExternalLink } from 'lucide-react';

interface AuthorBylineProps {
  name: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  bio?: string;
  website?: string;
  email?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
    handle?: string;
  }>;
}

export default function AuthorByline({
  name,
  image,
  bio,
  website,
  email,
  socialLinks,
}: AuthorBylineProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 text-sm text-[#605A57] pt-2 cursor-pointer hover:text-[#1a3a52] transition-colors"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        {image?.asset?.url ? (
          <img
            src={image.asset.url}
            alt={name}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span className="font-medium">By {name}</span>
        {website && <ExternalLink className="w-3 h-3 opacity-50 hover:opacity-100" />}
      </div>

      {/* Hover Popup */}
      {showPopup && (bio || email || (socialLinks && socialLinks.length > 0) || website) && (
        <div className="absolute left-0 top-full mt-2 z-50 w-80 bg-white rounded-lg shadow-lg border border-[rgba(26,58,82,0.12)] p-4 pointer-events-auto">
          <div className="flex gap-3">
            {image?.asset?.url && (
              <img
                src={image.asset.url}
                alt={name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-[#1a3a52]">{name}</h3>
              {bio && <p className="text-xs text-[#605A57] mt-1 line-clamp-2">{bio}</p>}
              {(website || email || (socialLinks && socialLinks.length > 0)) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1877f2] hover:underline px-2 py-1 bg-[#f7f5f3] rounded transition-colors hover:bg-[#e8e6e3]"
                    >
                      Visit
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-1 text-xs text-[#1877f2] hover:underline px-2 py-1 bg-[#f7f5f3] rounded transition-colors hover:bg-[#e8e6e3]"
                    >
                      Email
                    </a>
                  )}
                  {socialLinks?.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1877f2] hover:underline px-2 py-1 bg-[#f7f5f3] rounded transition-colors hover:bg-[#e8e6e3] capitalize"
                    >
                      {social.platform || social.handle}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
