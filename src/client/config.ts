import DefaultClient from 'apollo-boost';
import ApolloClient from 'apollo-boost';

export const client: DefaultClient<any> = new ApolloClient({
  uri: 'http://localhost:3000',
});
