---
external: false
draft: false
title: Powering Your React Application with Apollo Client
description: How we can harness the power of Apollo Client within a React application.
date: 2023-10-01
image: '/images/apollo.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'state management', 'apollo']
popular: false
---

![Blogster](/images/apollo.webp)

Building React applications that interact with GraphQL APIs can significantly simplify with Apollo Client. This feature-rich library enables effortless GraphQL query management, ensures automatic UI updates, and comes packed with handy tools. Let’s delve deeper into how we can harness the power of Apollo Client within a React application.

### Kickstarting with Apollo Client

Apollo Client is crafted to seamlessly handle GraphQL operations (queries, mutations, and subscriptions) while updating the user interface in response to GraphQL server interactions. It’s stacked with useful features like caching, optimistic UI, error management, and pagination and server-side rendering (SSR) support.

First things first, let’s install the necessary packages. Execute the following command in your terminal:


```bash
npm install @apollo/client graphql
```

### Integrating Apollo Client in a React Application

To integrate Apollo Client in your React app, you’ll need to instantiate ApolloClient and encompass your React app with the ApolloProvider component. This makes the client instance accessible across your component tree.

```js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://my-graphql-server.com/graphql',
  cache: new InMemoryCache()
});

// Wrapping the App component with ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      {/* Your app components go here */}
    </ApolloProvider>
  );
}

export default App;
```


### Making Queries with the useQuery Hook

Apollo Client provides a useQuery hook, a handy tool for executing GraphQL queries within your components. This hook updates your user interface automatically with the data received.

Let’s consider a case where we need to fetch all articles. Here’s how you can use the *useQuery* hook:

```js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query
const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
    }
  }
`;

// Component to display articles
function ArticleList() {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  // Handling the loading state
  if (loading) return <p>Loading...</p>;

  // Handling the error state
  if (error) return <p>Error :(</p>;

  // Returning the list of articles
  return data.articles.map(({ id, title }) => (
    <div key={id}>
      <p>
        {id}: {title}
      </p>
    </div>
  ));
}

export default ArticleList;
```

### Updating Data with useMutation Hook

For updating data on your server, Apollo Client offers the useMutation hook. This hook returns a mutation function that you can call to perform the mutation.

Let’s say we want to add an article:

```js
import React from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutation
const ADD_ARTICLE = gql`
  mutation AddArticle($title: String!) {
    addArticle(title: $title) {
      id
      title
    }
  }
`;

// Component to add articles
function AddArticle() {
  let input;
  const [addArticle, { data }] = useMutation(ADD_ARTICLE);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addArticle({ variables: { title: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Article</button>
      </form>
    </div>
  );
}

export default AddArticle;
```

### Deleting Data with useMutation Hook

Just like creating or updating data, Apollo Client uses the useMutation hook for deleting data as well. This hook returns a mutation function that executes the mutation when called.

Let’s consider a scenario where we want to delete an article. Here’s how you can leverage *useMutation*:

```js
import React from 'react';
import { useMutation, gql } from '@apollo/client';

// Define your mutation
const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

// Component to delete articles
function DeleteArticle() {
  let input;
  const [deleteArticle, { data }] = useMutation(DELETE_ARTICLE);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          deleteArticle({ variables: { id: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Delete Article</button>
      </form>
    </div>
  );
}

export default DeleteArticle;
```

In this example, *useMutation* returns the *deleteArticle* function, which we call with the ID of the article we want to delete. After the article is deleted from the server, Apollo Client automatically updates the cache to reflect the changes in the UI.

This feature showcases the true power of Apollo Client’s automatic cache management, helping to maintain a single source of truth and ensuring that the UI is in sync with the server.

### Re-fetching Data and Polling with Apollo Client

Apollo Client also allows you to control how and when you want to fetch data. Two of the strategies that you might find helpful are re-fetching data and polling.

### Re-fetching Data

Re-fetching data is useful when you want to manually fetch the latest data from your server. Apollo Client provides a *refetch* function returned from *useQuery* that you can call to fetch the data again.

Here’s an example where you can re-fetch articles:

```js
import { useQuery, gql } from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
    }
  }
`;

function ArticlesList() {
  const { loading, error, data, refetch } = useQuery(GET_ARTICLES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {data.articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, clicking the “Refresh” button will re-fetch the articles from the server.


### Polling

Polling is another strategy to keep your data up to date. Instead of manually triggering a re-fetch, you can configure your useQuery hook to poll the server at a specific interval.

Here’s how you can poll articles every 5000 milliseconds (5 seconds):

```js
import { useQuery, gql } from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
    }
  }
`;

function ArticlesList() {
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    pollInterval: 5000,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.articles.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
}
```

In this example, Apollo Client will automatically send a GET_ARTICLES query to the server every 5 seconds and update the UI with the latest data.

Using re-fetching and polling, you can ensure your application always displays the most current data from your server.

### Conclusion

Incorporating Apollo Client with your React application ushers in a new level of interactivity and dynamism. It leverages GraphQL’s power by offering features like intuitive caching, optimistic UI, pagination, and more.

The useQuery and useMutation hooks provide a straightforward way to integrate GraphQL operations into your React components. This guide is a primer for what's possible with Apollo Client and React; many more examples and resources in the Apollo Client documentation can help you develop efficient, feature-rich React applications with GraphQL. Keep exploring.
