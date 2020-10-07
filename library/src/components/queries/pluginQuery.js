import gql from 'graphql-tag';

const OPEN_SKETCH = gql`
  query IsSketchOpened {
    isSketchOpened @client
    sketchId @client
  }
`;

const EDIT_GEOJSON = gql`
  query IsEditingGeoJson {
    isEditingGeoJson @client
  }
`;

export {OPEN_SKETCH, EDIT_GEOJSON}
