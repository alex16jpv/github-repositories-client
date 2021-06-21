import fetch from "node-fetch";

const makeRequest = async (username, limit) => {
  const result = await fetch(
    `${process.env.REACT_APP_API_URL}/repositories/${username}/${limit}?ownerAffiliations=OWNER`
  );
  const data = await result.json();
  return data;
};

export default makeRequest;
