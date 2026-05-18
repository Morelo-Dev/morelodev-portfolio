import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && (published == true || comingSoon == true)] | order(date desc) {
    "slug": slug.current,
    title,
    excerpt,
    date,
    tags,
    published,
    comingSoon,
    badge,
    type,
    featured,
    "coverImage": coverImage.asset->url,
    videoUrl,
    downloadUrl,
    downloadLabel,
    price,
    priceLabel,
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    excerpt,
    date,
    tags,
    published,
    comingSoon,
    badge,
    type,
    "coverImage": coverImage.asset->url,
    videoUrl,
    downloadUrl,
    downloadLabel,
    price,
    priceLabel,
    body,
  }
`
