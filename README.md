# graphql-memo

```shell
$ npm install --save graphql-memo
```

```diff
import memo from 'graphql-memo';

const { cache } = memo({ store: new Map() });

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString, defaultValue: 'world' },
      },
-     resolve: async (root, { name }, context, info) => {
-       return Promise.resolve(name);
-     },
+     resolve: cache(async (root, { name }, context, info) => {
+       return Promise.resolve(name);
+     }),
    },
  }),
});
```

<p align="center">🐘</p>
