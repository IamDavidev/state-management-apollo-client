import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
} from '@apollo/client';
// import { useEffect } from 'react';

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

function App() {
  const { data, loading, error } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>laoding ...</p>;
  if (error) return <p>error ...</p>;
  if (!data) return <p>no data ...</p>;

  return (
    <div className="App">
      <ApolloProvider client={client}>
        react - apollo - local state
        {data?.rates.map(({ currency, rate }: any) => {
          <div key={currency}>
            <p>
              {currency}:{rate}
            </p>
          </div>;
        })}
      </ApolloProvider>
    </div>
  );
}

export default App;
