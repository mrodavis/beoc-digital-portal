/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Applies to every route on every host this deployment serves.
        source: '/:path*',
        headers: [
          {
            // Two years, covering subdomains, and flagged for the browser
            // preload list.
            //
            // Why `preload` matters here: without it, a device visiting for the
            // first time sends one plaintext HTTP request before it learns to
            // upgrade. On school and other filtered networks that first request
            // is intercepted by the content filter and never reaches us, so the
            // site appears to load over http. Preloading ships the domain inside
            // the browser binary, so no plaintext request is ever made.
            //
            // NOTE: preload is difficult to reverse — removal from the list takes
            // months of browser release cycles. It commits this domain and all
            // subdomains to HTTPS permanently. Only `www` exists today and it is
            // HTTPS-only, so this is safe. Do not add an HTTP-only subdomain later.
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
