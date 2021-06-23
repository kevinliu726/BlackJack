import { Route } from "react-router-dom";
import { Redirect } from "react-router";

export class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthed } = this.state;

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthed ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/Login", state: { from: props.location } }} />
          )
        }
      />
    );
  }
}
