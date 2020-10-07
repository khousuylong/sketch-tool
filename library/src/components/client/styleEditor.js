import React from 'react';
import PubSub from 'pubsub-js'
class StyleEditor extends React.Component {
  componentDidMount(){
    PubSub.publish("style-editor-container-ready")
  }
  render() {
    const {id} = this.props;
    return <div style={{width: '100%'}} id={`sketch-container-${id}`}></div>
  }
}
export default StyleEditor
