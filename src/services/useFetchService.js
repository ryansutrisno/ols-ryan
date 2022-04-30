/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : null,
};

export const useFetchService = ({ startFetching, url, method, body = null }) => {
  const [response, setResponse] = useState(undefined);
  const [headersResponse, setHeadersResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const source = axios.CancelToken.source();

  useEffect(() => {
    let isMounted = true;

    if (startFetching) {
      const fetchData = async () => {
        try {
          console.log("fetching", url);
          console.log("with body", body);
          setLoading(true);
          const result = await axios.request({
            url,
            method,
            data: body,
            cancelToken: source.token,
          });
          setHeadersResponse(result.headers);
          setResponse(result.data);
          console.log("getting data from", url);
          console.log(result);
        } catch (err) {
          console.log("error", err.response);
          if (err.response && err.response.status === 401) {
            console.log("Token expired!");
            window.location.assign("/login");
          }
          isMounted && setError(err.response);
        } finally {
          isMounted && setLoading(false);
        }
      };

      isMounted && fetchData();
    }

    // cancel req when unmounted
    return () => {
      isMounted = false;
      source.cancel(`cancel req ${  url}`);
    };
  }, [startFetching]);

  return { response, error, loading, headersResponse };
};
