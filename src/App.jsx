import PageNotFound from "components/common/PageNotFound";
import Product from "components/Product/index";
import ProductList from "components/ProductList/index";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => (
  <Switch>
    <Redirect exact from="/" to="/products" />
    <Route exact component={Product} path="/products/:slug" />
    <Route exact component={ProductList} path="/products" />
    <Route exact component={PageNotFound} path="*" />
  </Switch>
);

export default App;
