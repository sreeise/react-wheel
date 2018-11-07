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
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#222222',
        theme_color: '#222222',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-offline',
  ],
};
