// Config Imports
import themeConfig from '@/configs/themeConfig'

/** Copy for each error page; the slug is the URL segment under /pages/errors. */
export const errorPages = {
  unauthorized: {
    code: '401',
    title: 'Unauthorized access',
    description: 'Please sign in with the appropriate credentials to access this resource.',
    canRetry: true
  },
  forbidden: {
    code: '403',
    title: 'Access forbidden',
    description: "You don't have the necessary permission to view this resource.",
    canRetry: true
  },
  'not-found': {
    code: '404',
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or might have been removed.",
    canRetry: true
  },
  'internal-server-error': {
    code: '500',
    title: 'Something went wrong',
    description: 'We apologise for the inconvenience. Please try again later.',
    canRetry: true
  },
  maintenance: {
    code: '503',
    title: 'Under maintenance',
    description: "The site isn't available at the moment. We'll be back online shortly.",
    canRetry: false
  }
} as const

export type ErrorSlug = keyof typeof errorPages

export const errorSlugs = Object.keys(errorPages) as ErrorSlug[]

export const homeHref = themeConfig.homePageUrl
