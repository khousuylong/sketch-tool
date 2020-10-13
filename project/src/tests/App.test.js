import React from 'react';
import {
  CREATE_PLUGIN_STORAGE_MUTATION, 
  PLUGIN_STORAGES_QUERY,
  UPDATE_PLUGIN_STORAGE_MUTATION,
  client
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

const pluginStorages = [
  {
    "id": "988d0ee9-9b28-4040-9a93-8c4b85067372",
    "pluginId": "869a172a-1026-458d-8c6b-89590d16b5d5",
    "json": "{\"name\":\"My Untitled sketch\",\"description\":\"\",\"geoJson\":\"\"}"
  }
]

describe('Render Sketch tool', () => {
  /*
  it('checking client ui', async () => {
    const component = render(<App />);
    const expandDrawerIcon = component.getByTestId('drawer-right')
    expect(expandDrawerIcon).toBeInTheDocument();
    fireEvent.click(expandDrawerIcon);

    const collapseDrawerIcon = component.getByTestId('drawer-left')
    expect(collapseDrawerIcon).toBeInTheDocument();
  });
  */
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
          query: CREATE_PLUGIN_STORAGE_MUTATION
        },
        result: {
          data: {
          },
        },
      }
    ]
    const component = render(<MockedProvider mocks={mocks} addTypename={false}><AccordionView client={client} pluginId="869a172a-1026-458d-8c6b-89590d16b5d5" settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/></MockedProvider>);
    const createSketch = component.getByText('Create sketch') 
    expect(createSketch).toBeInTheDocument()

    expect(await waitForElement(() => component.getAllByText('Add to map').length)).toBeGreaterThan(1);

    //fireEvent.click(createSketch)
  });

  afterEach( () => {
    cleanup();
  });
});
