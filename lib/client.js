import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'caj4yb4i',
  dataset: 'production',
  apiVersion: '2022-10-25',
  useCdn: true,
  token: 'skYGNJe5V4WvCjOyk72nxNqJefx0I95HLGMWuFGjPz06J7isCWSuPKiBjUepFztmrNNftcPJrfciuZ5SFxzpjDqm9N4SqhqqlNpxRIw0APso1xhfZEE7Hon3aIFLpY0f0B1tRCQitllZQf7fwMNAEBEUi62HJT3znGfzueLqjD5xCZvnhS2t'
});