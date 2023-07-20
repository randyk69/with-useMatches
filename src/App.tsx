import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useMatches
} from "react-router-dom";

import "./App.css";


/**
 * https://stackoverflow.com/questions/75473709/react-router-v6-breadcrumbs-and-partially-matching-routes
 */

const Layout = () => {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  console.log("Layout", { crumbs });

  return (
    <>
      <h3>Navigaton</h3>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {[123, 456, 789].map((user) => (
          <li key={user}>
            <Link to={`/users/${user}`}>User {user}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h4>Breadcrumbs</h4>
      <ul className="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <li key={index}>{index > 0 ? '/' : ''} {crumb}</li>
        ))}
      </ul>
      <br /><br />
      <Outlet />
    </>
  );
};

const UserList = () => {
  return (
    <>
      <h1>UserList</h1>
      <ul>
        <li>John</li>
        <li>Mark</li>
        <li>Elizabeth</li>
      </ul>
    </>
  );
};

const UserDetails = () => {
  return (
    <>
      <h4>UserDetails</h4>
      <p>Name: </p>
      <p>Email: </p>
    </>
  );
};

const DynamicUserNameCrumb = () => (
  <>
    <span>Hello world</span>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    handle: {
      crumb: () => "Home"
    },
    children: [
      {
        path: "/users",
        handle: {
          crumb: () => "Users"
        },
        children: [
          {
            index: true,
            element: <UserList />
          },
          {
            path: "/users/:id",
            element: <UserDetails />,
            handle: {
              crumb: () => <DynamicUserNameCrumb />
            }
          }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
