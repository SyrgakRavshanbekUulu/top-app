export const Api = {
  topPage: {
    find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    byAllias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/',
  },
  product: {
    find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find'
  },
  review: {
    createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo'
  }
}