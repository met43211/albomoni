export const TestCategoriesAttributes = [
  {
    category_id: 'realty',
    attributes: [
      {
        name: 'apartment',
        selection: 'one',
        collection: [
          {
            name: 'buy',
            selection: 'many',
            collection: ['new', 'old'],
            otherFilters: [
              {
                selection: 'many',
                variants: ['studio', 'one', 'two', 'three', 'four', 'more'],
              },
            ],
          },
          {
            name: 'rent',
            selection: 'many',
            collection: [],
          },
        ],
      },
    ],
  },
];

export const AttributesVariables = [
  {
    attribute_id: 1,
    variants: ['apartment', 'room', 'house', 'stead', 'garage', 'commercial'],
    selection: 'one',
  },
  {
    attribute_id: 2,
    variants: ['buy', 'rent'],
    selection: 'one',
  },
  {
    attribute_id: 3,
    variants: ['new', 'old'],
    selection: 'many',
  },
  {
    attribute_id: 4,
    variants: ['studio', 'one', 'two', 'three', 'four', 'more'],
    selection: 'many',
  },
  {
    attribute_id: 5,
    variants: ['cars', 'trucs', 'motocycle', 'water'],
    selection: 'one',
  },
  {
    attribute_id: 6,
    variants: ['buy', 'rent'],
    selection: 'one',
  },
];
