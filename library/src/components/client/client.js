import React from 'react';
import AccordionView from './accordionView';
import { ApolloProvider } from '@apollo/client'

export default function ClientView(props) {
  return (
    <ApolloProvider client={props.client}>
      <AccordionView {...props} />
    </ApolloProvider>
  );
}
