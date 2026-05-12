export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jorge Andrés Morelo Hinestroza',
    alternateName: 'morelodev',
    jobTitle: 'Software Developer',
    url: 'https://morelodev-portfolio.vercel.app',
    sameAs: ['https://github.com/Morelo-Dev', 'https://www.linkedin.com/in/morelodev/'],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    nationality: { '@type': 'Country', name: 'Colombia' },
    availableLanguage: ['Spanish', 'English'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
