import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
import AppNavbar from './components/NavBar';
import Search from './pages/Search';
import SingleEvent from './pages/SingleEvent';
import SingleArtist from './pages/SingleArtist';
import Profile from './pages/Profile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <AppNavbar />
        <Routes>
          {/* <Route 
            path='/' 
            element={<Home />} 
          /> */}
          <Route
            path='/me'
            element={< Profile />}
          />
          <Route
            path='/profile:userId'
            element={< Profile/>}
          />
          <Route 
            path='/' 
            element={<Search />} 
          />
          <Route
            path='/event/:eventId'
            element={<SingleEvent />}
          />
          <Route
            path='/artist/:artistId'
            element={<SingleArtist />}
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    {/* <Footer /> */}
 
  </ApolloProvider>
  );
}

export default App;
