import axios from 'axios';


const resolvers = {
  Query: {
      pluginSetting: async (root, args, context, info) => {
        const pluginSetting = (await axios.get(`http://localhost:3004/pluginSettings/${args.id}`)).data;
        return pluginSetting;
      }
  },
  Mutation: {
    updatePluginSetting: async (root, args, context, info) => {
      const pluginSetting = (await axios.get(`http://localhost:3004/pluginSettings/${args.id}`)).data;
      pluginSetting['setting'] = args.setting;
      return (await axios.put(`http://localhost:3004/pluginSettings/${args.id}`, pluginSetting, { headers: {"Content-Type": "application/json"}})).data;
    }
  }
};

export {resolvers};
