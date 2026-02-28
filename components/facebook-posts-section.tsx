import { Calendar, Facebook, Heart, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"

import {
  formatFacebookDate,
  getFacebookPosts,
  truncateMessage,
} from "@/lib/facebook"
import type { NormalizedFacebookPost, FacebookPageInfo } from "@/lib/facebook/types"

// Badge component matching design system
function Badge({ text }: { text: string }) {
  return (
    <div className="px-3 py-1.5 bg-[#f7f5f3] shadow-[0px_0px_0px_4px_rgba(26,58,82,0.05)] overflow-hidden rounded-full flex justify-start items-center gap-2 border border-[rgba(26,58,82,0.12)]">
      <div className="w-2 h-2 rounded-full bg-[#1877f2]" />
      <span className="text-[#1a3a52] text-xs font-medium uppercase tracking-wider">
        {text}
      </span>
    </div>
  )
}

// Individual Facebook Post Card
function FacebookPostCard({
  post,
  index,
}: {
  post: NormalizedFacebookPost
  index: number
}) {
  const isEven = index % 2 === 0
  const formattedDate = formatFacebookDate(post.createdAt)
  const truncatedMessage = truncateMessage(post.message, 280)

  return (
    <article
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center group`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative">
        {/* Geometric Decoration */}
        <div
          className={`absolute -top-4 -bottom-4 ${isEven ? "-left-4" : "-right-4"} w-full border border-[rgba(26,58,82,0.08)] hidden lg:block transition-transform duration-500 group-hover:scale-[1.02]`}
        />

        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          {post.image ? (
            <img
              src={post.image}
              alt={truncateMessage(post.message, 60) || "Facebook post"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#f7f5f3]">
              <Facebook className="w-16 h-16 text-[#1877f2]/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-[#1a3a52]/0 group-hover:bg-[#1a3a52]/5 transition-colors duration-300" />
        </div>

        {/* Post Type Badge */}
        <div className={`absolute top-4 ${isEven ? "left-4" : "right-4"}`}>
          <span className="px-3 py-1 bg-white/95 backdrop-blur text-[#1877f2] text-[10px] font-bold uppercase tracking-wider border border-[rgba(26,58,82,0.1)] flex items-center gap-1.5">
            <Facebook className="w-3 h-3" />
            {post.type}
          </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-medium text-[#605A57]/70 mb-4 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="w-px h-3 bg-[rgba(26,58,82,0.2)]" />
          <span className="flex items-center gap-1.5 text-[#1877f2]">
            <Facebook className="w-3.5 h-3.5" />
            Facebook
          </span>
        </div>

        {/* Message */}
        {truncatedMessage && (
          <p className="text-[#605A57] text-base leading-relaxed mb-4 font-light">
            {truncatedMessage}
          </p>
        )}

        {/* Engagement Metrics */}
        <div className="flex items-center gap-4 text-xs text-[#605A57]/70 mb-6">
          {post.likes > 0 && (
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              {post.likes.toLocaleString()}
            </span>
          )}
          {post.comments > 0 && (
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              {post.comments.toLocaleString()}
            </span>
          )}
          {post.shares > 0 && (
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              {post.shares.toLocaleString()}
            </span>
          )}
        </div>

        {/* View on Facebook Link */}
        <Link
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#1877f2] text-sm font-medium uppercase tracking-wider group/link"
        >
          <span className="border-b border-[#1877f2] group-hover/link:border-transparent transition-colors">
            View on Facebook
          </span>
          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}

// Page info header
function PageInfoHeader({ pageInfo }: { pageInfo: FacebookPageInfo }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {pageInfo.picture?.data?.url && (
        <img
          src={pageInfo.picture.data.url}
          alt={pageInfo.name}
          className="w-12 h-12 rounded-full border border-[rgba(26,58,82,0.12)]"
        />
      )}
      <div>
        <h3 className="font-serif text-lg text-[#1a3a52]">{pageInfo.name}</h3>
        {pageInfo.followers_count && (
          <p className="text-xs text-[#605A57]">
            {pageInfo.followers_count.toLocaleString()} followers
          </p>
        )}
      </div>
    </div>
  )
}

// Main component props
interface FacebookPostsSectionProps {
  limit?: number
  showPageInfo?: boolean
  title?: string
  subtitle?: string
}

// Main Facebook Posts Section Component
export default async function FacebookPostsSection({
  limit = 4,
  showPageInfo = true,
  title = "From Our Facebook",
  subtitle = "See what's happening on our social media",
}: FacebookPostsSectionProps) {
  const { posts, pageInfo } = await getFacebookPosts({ limit })

  if (!posts.length) {
    return null
  }

  return (
    <section className="w-full border-b border-t border-[rgba(26,58,82,0.12)] flex flex-col justify-center items-center">
      <div className="self-stretch flex justify-center items-start">
        {/* Left Decorative Sidebar */}
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 border-l border-r border-[rgba(26,58,82,0.12)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f5f3]">
          <div className="max-w-[1060px] mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 sm:mb-20 gap-4">
              <Badge text="Social Feed" />

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-[#1a3a52] tracking-tight leading-[1.1]">
                {title}
              </h2>

              <p className="text-[#605A57] text-lg font-light leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Page Info */}
            {showPageInfo && pageInfo && (
              <div className="flex justify-center mb-12">
                <PageInfoHeader pageInfo={pageInfo} />
              </div>
            )}

            {/* Posts */}
            <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
              {posts.map((post, index) => (
                <FacebookPostCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* View All Footer */}
            {pageInfo?.link && (
              <div className="mt-16 sm:mt-20 flex justify-center">
                <Link
                  href={pageInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#1877f2] text-white text-sm font-semibold hover:bg-[#1877f2]/90 transition-all duration-300 flex items-center gap-3 uppercase tracking-wider"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Follow on Facebook</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Decorative Sidebar */}
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
