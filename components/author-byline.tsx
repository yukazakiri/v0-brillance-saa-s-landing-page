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

// Server component version with CSS-based hover popup
export default function AuthorByline({
  name,
  image,
  bio,
  website,
  email,
  socialLinks,
}: AuthorBylineProps) {
  const hasDetails = bio || email || (socialLinks && socialLinks.length > 0) || website;

  // If there's no website, don't make it a link
  const authorElement = (
    <div
      className="flex items-center gap-2 text-sm text-[#605A57] pt-2 hover:text-[#1a3a52] transition-colors"
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
      {website && <ExternalLink className="w-3 h-3 opacity-50" />}
    </div>
  );

  // If website exists, wrap in a link
  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block"
      >
        {authorElement}

        {/* Hover Popup - CSS based - Redesigned */}
        {hasDetails && (
          <div className="absolute left-0 top-full mt-3 z-50 w-96 bg-white rounded-xl shadow-xl border border-[rgba(26,58,82,0.12)] hidden group-hover:block pointer-events-none group-hover:pointer-events-auto">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#1877f2] to-[#0b5bb8] rounded-t-xl"></div>
            
            <div className="p-5">
              {/* Header with image and name */}
              <div className="flex gap-4 items-start mb-4">
                {image?.asset?.url && (
                  <img
                    src={image.asset.url}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-[#f7f5f3]"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a3a52] text-lg">{name}</h3>
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1877f2] text-sm font-medium hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      {website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bio */}
              {bio && (
                <p className="text-sm text-[#605A57] mb-4 leading-relaxed">{bio}</p>
              )}

              {/* Contact and Social Links */}
              {(email || (socialLinks && socialLinks.length > 0)) && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#f0f0f0]">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 text-xs font-medium text-white bg-[#1877f2] hover:bg-[#0b5bb8] px-3 py-2 rounded-lg transition-colors"
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
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#1877f2] bg-[#f7f5f3] hover:bg-[#e8e6e3] px-3 py-2 rounded-lg transition-colors capitalize"
                    >
                      {social.platform || social.handle}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </a>
    );
  }

  // No website - just show the author name without link
  return (
    <div className="group relative inline-block">
      {authorElement}

      {/* Hover Popup - CSS based - Redesigned */}
      {hasDetails && (
        <div className="absolute left-0 top-full mt-3 z-50 w-96 bg-white rounded-xl shadow-xl border border-[rgba(26,58,82,0.12)] hidden group-hover:block">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#1877f2] to-[#0b5bb8] rounded-t-xl"></div>
          
          <div className="p-5">
            {/* Header with image and name */}
            <div className="flex gap-4 items-start mb-4">
              {image?.asset?.url && (
                <img
                  src={image.asset.url}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-[#f7f5f3]"
                />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-[#1a3a52] text-lg">{name}</h3>
              </div>
            </div>

            {/* Bio */}
            {bio && (
              <p className="text-sm text-[#605A57] mb-4 leading-relaxed">{bio}</p>
            )}

            {/* Contact and Social Links */}
            {(email || (socialLinks && socialLinks.length > 0)) && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#f0f0f0]">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-white bg-[#1877f2] hover:bg-[#0b5bb8] px-3 py-2 rounded-lg transition-colors"
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
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#1877f2] bg-[#f7f5f3] hover:bg-[#e8e6e3] px-3 py-2 rounded-lg transition-colors capitalize"
                  >
                    {social.platform || social.handle}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
