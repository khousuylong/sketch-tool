import gql from 'graphql-tag';

const OPEN_SKETCH = gql`
  query IsSketchOpened {
    isSketchOpened @client
    sketchId @client
  }
`;

export {OPEN_SKETCH}
