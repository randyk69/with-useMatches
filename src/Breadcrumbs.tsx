import { useMatches } from "react-router-dom";

interface BreadcrumbItem {
  title: string;
  href: string;
}

function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches.map((match) => {
    if (match.handle?.crumb) {
      return {
        title: match.handle.crumb(),
        href: match.pathname,
      };
    } else {
      return null;
    }
  });
  return (
    <ul>
      {crumbs.map((crumb) => (
        <li key={crumb.title}>
          <a href={crumb.href}>{crumb.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;

// import React, { useState, useEffect } from "react";
// // import { Route } from "react-router-dom";

// const Breadcrumbs = ({ matches }) => {
//   const crumbs = matches.map((match) => {
//     const crumb = match.handle?.crumb;
//     const path = match.pathname;

//     return (
//       <li key={path}>
//         {crumb ? crumb : path}
//       </li>
//     );
//   });

//   return (
//     <ul>
//       {crumbs}
//     </ul>
//   );
// };

// export default Breadcrumbs;