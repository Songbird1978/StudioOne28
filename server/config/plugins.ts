export default ({ env }) => ({
  upload: {
    config: {
      provider: env('NODE_ENV') === 'production'
        ? '@strapi/provider-upload-cloudinary'
        : '@strapi/provider-upload-local',
      providerOptions: env('NODE_ENV') === 'production'
        ? {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          }
        : {
            // Local uploads stored in ./public/uploads
            sizeLimit: 10000000, // 10MB limit
          },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
