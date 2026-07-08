import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, image, url }) => {
  const siteName = 'Buildfolio'
  const defaultDescription =
    'Discover projects, share ideas, and build your portfolio. The platform for developers to showcase their work.'
  const defaultImage =
    'https://api.dicebear.com/9.x/pixel-art/svg?seed=buildfolio'
  const defaultUrl = 'https://buildfolio.vercel.app'

  const fullTitle = title
    ? `${title} — ${siteName}`
    : `${siteName} — Discover Projects. Share Ideas. Build Your Portfolio.`
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const metaUrl = url || defaultUrl

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />

      {/* Open Graph */}
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaImage} />
      <meta property='og:url' content={metaUrl} />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImage} />
    </Helmet>
  )
}

export default SEO
