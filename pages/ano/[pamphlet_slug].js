import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

import styles from "../../styles/post.module.css";

// import { client } from "../_app";

// FIXME: HANDLE REDIRECT IF THE SLUG CANNOT BE FOUND

const GET_PAMPHLET = gql`
  query pamphlet($pamphlet_slug: String!) {
    pamphlet(pamphlet_slug: $pamphlet_slug) {
      id
      links_array {
        link
        name
      }
      pamphlet_slug
      pamphlet_name
      user
    }
  }
`;

const Pamphlet = (props) => {
  const router = useRouter();
  const { pamphlet_slug } = router.query;
  const { loading, data, error } = useQuery(GET_PAMPHLET, {
    variables: { pamphlet_slug },
  });

  const ToRender = loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>{data.pamphlet.pamphlet_name}</h1>
      {data.pamphlet.links_array.map((link, i) => (
        <a className={styles.btn} href={link.link} key={i}>
          {link.name}
        </a>
      ))}
    </>
  );
  return (
    <>
      <style jsx>{`
        .article {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pamphlet {
          padding-top: 40px;
          width: 320px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-flow: column nowrap;
        }

        .pamphlet-link {
          margin: 8px;
          padding: 8px;
          border: 0px solid transparent;
          display: block;
          background: pink;
          text-decoration: none;
        }

        .pamphlet-link:link,
        .pamphlet-link:visited {
          color: white;
        }

        .pamphlet-link:hover {
          background: red;
        }
      `}</style>
      <article className="article">
        <div className="pamphlet">{ToRender}</div>
      </article>
    </>
  );
};

/**
 *  TL; DR we need to have a new instance of the ApolloClient for each time we load the SSR page.
 * So we need a function to figure out if we have initial state
 * ... and then figure out if we're doing SSR/ SSG
 * ... and if we do SSR then we use the Apollo client to make our query and then pass it to props via cache extraction
 *
 * Look up the with-apollo example in the Next.js repo
 */
// export async function getServerSideProps(context) {
//   console.dir(context);
//   return {
//     props: {
//       mySampleProp: "HI THERE",
//     },
//   };
// }

export default Pamphlet;
