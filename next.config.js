module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/websites',
          permanent: true,
        },
      ]
    },
    images: {
      // loader: 'cloudinary'
      domains: ['res.cloudinary.com']
    }
  }