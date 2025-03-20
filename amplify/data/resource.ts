import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Food: a
    .model({
      name:a.string(),
      amount: a.float(),
      unit: a.string(),
      meal: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
