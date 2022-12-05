import { ApolloProvider } from "react-apollo";

import App from "./App/Home";
import { injectGlobal } from './styled/global.style';
import client from "../client";

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Index;
