import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

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
      user
    }
  }
`;

const Pamphlet = () => {
  const router = useRouter();
  const { pamphlet_slug } = router.query;
  const { loading, data, error } = useQuery(GET_PAMPHLET, {
    variables: { pamphlet_slug },
  });
  console.log(data);
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
        <div className="pamphlet">
          <h1>My pamphlet</h1>
          {loading
            ? "Loading..."
            : data
            ? data.pamphlet.links_array.map((link, i) => (
                <a className="pamphlet-link" href={link.link} key={i}>
                  {link.name}
                </a>
              ))
            : "it broke"}
        </div>
      </article>
    </>
  );
};

export default Pamphlet;
