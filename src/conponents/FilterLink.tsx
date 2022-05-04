import React from 'react';
import { ApolloConsumer } from '@apollo/react-components';

import Link from './Link';

const FilterLink = ({ filter, children }: any) => (
  <ApolloConsumer>
    {(client) => (
      <Link
        onClick={() =>
          client.writeData({ data: { visibilityFilter: filter } })
        }>
        {children}
      </Link>
    )}
  </ApolloConsumer>
);

export default FilterLink;
