import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";

import Response from "../Response";

export default function Search({ results, term }) {
  const router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header term={term} />

      <SearchResult results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || "0";

  console.log(context.query.term);

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  //www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

  https: return {
    props: {
      results: data,
      term: context.query.term,
    },
  };
}
