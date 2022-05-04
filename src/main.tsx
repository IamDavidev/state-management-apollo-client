import ReactDOM from 'react-dom/client';

import './index.css';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
  makeVar,
} from '@apollo/client';

const tasks = {
  task: {
    title: '',
    body: '',
  },
};

const davtionState = {
  user: {
    name: '',
    email: '',
    token: '',
    _id: '',
    photo: '',
    isLogged: false,
  },
  tasks: [],
};

const davtionStateVar = makeVar(davtionState);
const tasksVar = makeVar(tasks);

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const GET_STATE_DAVTION = gql`
  query GetSateDavtion {
    davtionState @client {
      tasks
      user {
        name
        email
        token
      }
    }
    task @client
  }
`;
// mutation task
export const AddTask = gql`
  mutation AddTask($task: TaskInput!) {
    addTask(task: $task) {
      id
      task
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          davtionState: {
            read() {
              return davtionStateVar();
            },
          },
          task: {
            read() {
              return tasksVar();
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});

function App() {
  const { data, loading, error } = useQuery(GET_STATE_DAVTION);

  if (loading) return <p>laoding ...</p>;
  if (error) return <p>error ...</p>;
  if (!data) return <p>no data ...</p>;

  console.log(data);

  return (
    <div className="App">
      <h1>react - apollo - local state</h1>
      {/* {data.user.name || ' no user '} */}
    </div>
  );
}

function Form() {
  const hadleTask = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    return tasksVar({
      task: {
        title: e.target.title.value,
        body: e.target.title.value,
      },
    });
  };

  return (
    <form onSubmit={hadleTask}>
      <input type="text" name="title" />
      <button type="submit">add task</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
    <Form />
  </ApolloProvider>
);
