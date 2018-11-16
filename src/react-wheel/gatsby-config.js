module.exports = {
  siteMetadata: {
    title: 'react-wheel',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    `gatsby-plugin-sass`,
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'react-wheel',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-offline',
  ],
};
