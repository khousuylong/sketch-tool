const typeDefs = `
  type PluginSetting{
    id: ID!
    pluginId: ID!
    setting: String
  }

  type Query{
    pluginSetting(id: ID!): PluginSetting
  }

  type Mutation {
    updatePluginSetting(id: ID!, setting: String): PluginSetting
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export {typeDefs};
