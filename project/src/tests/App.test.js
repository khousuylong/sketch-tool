import React from 'react';
import {
  CREATE_PLUGIN_STORAGE_MUTATION, 
  PLUGIN_STORAGES_QUERY,
  UPDATE_PLUGIN_STORAGE_MUTATION,
  DELETE_PLUGIN_STORAGE_MUTATION
} from 'plugin-storage'

import { MockedProvider } from "@apollo/client/testing";

import {AccordionView} from '../dist/index'
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from '@testing-library/react'

import App from '../App';

const updatedStorage = {"id":"988d0ee9-9b28-4040-9a93-8c4b85067372","json":"{\"name\":\"sketch updated\",\"description\":\"\",\"geoJson\":\"\"}"}

const newStorage = {
  "id": "93-8c4b85067372",
  "pluginId":"869a172a-1026-458d-8c6b-89590d16b5d5","json":"{\"name\":\"New Untitled sketch\",\"description\":\"\",\"geoJson\":\"\"}"
}

const pluginStorages = [
  {
    "id": "988d0ee9-9b28-4040-9a93-8c4b85067372",
    "pluginId": "869a172a-1026-458d-8c6b-89590d16b5d5",
    "json": "{\"name\":\"My Untitled sketch\",\"description\":\"\",\"geoJson\":\"\"}"
  }
]

describe('Render Sketch tool', () => {
  it('checking client ui', async () => {
    const component = render(<App />);
    const expandDrawerIcon = component.getByTestId('drawer-right')
    expect(expandDrawerIcon).toBeInTheDocument();
    fireEvent.click(expandDrawerIcon);

    const collapseDrawerIcon = component.getByTestId('drawer-left')
    expect(collapseDrawerIcon).toBeInTheDocument();
  });
  it('create new sketch', async () => {
    const mocks = [
      {
        request: {
          query:PLUGIN_STORAGES_QUERY,
          variables: { pluginId: "869a172a-1026-458d-8c6b-89590d16b5d5"}
        },
        result: {
          data: {
            pluginStorages: pluginStorages
          },
        },
      },
      {
        request: {
          query: CREATE_PLUGIN_STORAGE_MUTATION,
          variables: {"input":{"pluginId":"869a172a-1026-458d-8c6b-89590d16b5d5","json":"{\"name\":\"Untitled sketch\",\"description\":\"\",\"geoJson\":\"\"}"}}
        },
        result: {
          data: {
            createPluginStorage: newStorage
          },
        },
      }
    ]
    const component = render(<MockedProvider mocks={mocks} addTypename={false}><AccordionView pluginId="869a172a-1026-458d-8c6b-89590d16b5d5" settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/></MockedProvider>);
    const createSketch = component.getByText('Create sketch') 
    expect(createSketch).toBeInTheDocument()

    expect(await waitForElement(() => component.getByTestId('988d0ee9-9b28-4040-9a93-8c4b85067372'))).toBeInTheDocument();

    fireEvent.click(createSketch)
    expect(await waitForElement(() => component.getByTestId('93-8c4b85067372'))).toBeInTheDocument();
  });
  
  it('delete sketch', async () => {
    const mocks = [
      {
        request: {
          query:PLUGIN_STORAGES_QUERY,
          variables: { pluginId: "869a172a-1026-458d-8c6b-89590d16b5d5"}
        },
        result: {
          data: {
            pluginStorages: pluginStorages
          },
        },
      },
      {
        request: {
          query: DELETE_PLUGIN_STORAGE_MUTATION,
          variables: {"id":"988d0ee9-9b28-4040-9a93-8c4b85067372"}
        },
        result: {
          data: {
            deletePluginStorage: pluginStorages[0]
          },
        },
      }
    ]
    const component = render(<MockedProvider mocks={mocks} addTypename={false}><AccordionView pluginId="869a172a-1026-458d-8c6b-89590d16b5d5" settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/></MockedProvider>);

    const deleteSketchBtn = await waitForElement(() => component.getByText('Delete Sketch'))
    expect(deleteSketchBtn).toBeInTheDocument();
    fireEvent.click(deleteSketchBtn)

    expect(await waitForElement(() => component.getByTestId('988d0ee9-9b28-4040-9a93-8c4b85067372'))).not.toBeInTheDocument();
  });


  afterEach( () => {
    cleanup();
  });
});
