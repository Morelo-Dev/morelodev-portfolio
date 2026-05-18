import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'meta', title: 'Metadatos'},
    {name: 'monetization', title: 'Precio y descarga'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'date',
      title: 'Fecha de publicación',
      type: 'date',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Próximamente (oculta el contenido)',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en home',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de contenido',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Artículo', value: 'article'},
          {title: 'Video', value: 'video'},
          {title: 'Recurso descargable', value: 'resource'},
          {title: 'Oferta', value: 'offer'},
        ],
        layout: 'radio',
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      group: 'meta',
      options: {
        list: ['NUEVO', 'DESTACADO', 'PRÓXIMAMENTE', 'FREE', 'PREMIUM'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del video (YouTube/Vimeo)',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
            defineField({name: 'caption', title: 'Pie de foto / referencia', type: 'string'}),
          ],
        },
        {
          type: 'code',
          options: {
            languageAlternatives: [
              {title: 'TypeScript', value: 'typescript'},
              {title: 'JavaScript', value: 'javascript'},
              {title: 'Bash', value: 'bash'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Precio (0 = gratis)',
      type: 'number',
      group: 'monetization',
      initialValue: 0,
    }),
    defineField({
      name: 'priceLabel',
      title: 'Texto del precio (ej: USD $9)',
      type: 'string',
      group: 'monetization',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'URL de descarga',
      type: 'url',
      group: 'monetization',
    }),
    defineField({
      name: 'downloadLabel',
      title: 'Texto del botón de descarga',
      type: 'string',
      group: 'monetization',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'coverImage'},
  },
})
