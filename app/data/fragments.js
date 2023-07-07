export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        id
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    title_de_ch: metafield(namespace: "custom_fields", key: "title_de_ch") {
      value
     }
     title_fr: metafield(namespace: "custom_fields", key: "title_fr") {
      value
     }
     title_it: metafield(namespace: "custom_fields", key: "title_it") {
      value
     }
     description_de_ch: metafield(namespace: "custom_fields", key: "description_de_ch") {
      value
     }
     description_fr: metafield(namespace: "custom_fields", key: "description_fr") {
      value
     }
     description_it: metafield(namespace: "custom_fields", key: "description_it") {
      value
     }

    vendor
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
`;

export const FEATURED_COLLECTION_FRAGMENT = `#graphql
  fragment FeaturedCollectionDetails on Collection {
    id
    title
    handle
    image {
      altText
      width
      height
      url
    }
  }
`;
