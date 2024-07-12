module.exports = {
    images: {
        domains: ['tenor.com',"images.unsplash.com",'res.cloudinary.com'],
        
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
}

