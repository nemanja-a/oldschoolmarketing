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
    domains: ["res.cloudinary.com", "i.pinimg.com"]
  },
  env: {
    apiSecret: 'howdidyouknowthattheansweris42?'
  }
}