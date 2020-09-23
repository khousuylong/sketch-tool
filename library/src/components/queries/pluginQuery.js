import gql from 'graphql-tag';

const PLUGIN_SETTING_QUERY = gql`
  query PluginSettingQuery($id: ID!) {
    pluginSetting(id: $id) {
      id
      pluginId
      setting
    }
  }
`

const UPDATE_PLUGIN_SETTING_MUTATION = gql`
  mutation($id: ID!, $setting: String){
    updatePluginSetting(id: $id, setting: $setting){
      id
      pluginId
      setting
    }
  }
`

export {UPDATE_PLUGIN_SETTING_MUTATION, PLUGIN_SETTING_QUERY}
