import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import { hasOwn } from '@apollo/client/cache/inmemory/helpers';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
const isLogged: any = makeVar([]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
});

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: isLogged(),
  },
});
function App() {
  const { data } = useQuery(IS_LOGGED_IN);

  function hadleLogged() {
    const newItesm = { isLogged: true };

    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: isLogged([...data.isLoggedIn, newItesm]),
      },
    });
    console.log('logged', isLogged());
    console.log('>>data', data);
  }

  console.log(data);

  return (
    <div className="App">
      <h1>react - apollo - local state</h1>
      <button onClick={hadleLogged}>button </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
