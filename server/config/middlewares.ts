export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
         
        },
      },
    },
  },
  {
  name: 'strapi::cors',
      config: {
        origin: ['http://localhost:3000', 
        'https://studio-one28.vercel.app', 
        'https://www.studioone28.com',
         'https://www.jonnycallender.com',
              'https://studioone28.com',
         'https://jonnycallender.com'
          ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
  },
},
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

