import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'h1q48uhb',
  dataset: 'production',
  apiVersion: '2022-10-28',
  useCdn: true,
  token: 'skTgHOTvFr78ICamNMuuGeoOohNCO1RJwWtLHg131stFLN7PU9nx6NUb85IviXDR8p6aIpORwq9FSGl2gTLkZv0ZRdo1HZN1TZY66D6sSSBw4eWFLBK3lcRE0HD0OZMCCGNsSniRgJKhRpyOPxU2d008B8VYA52yZZc2kDXYRy117e5ADdGC'
});