import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'icon-src',
  description: 'Generated with Logo Foundry',
  icons: {
    icon: '/icons/favicon.ico',
    icon: '/icons/favicon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
};

// manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'icon-src',
    short_name: 'icon-src',
    description: 'icon-src - Generated with Logo Foundry',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/android-chrome-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
