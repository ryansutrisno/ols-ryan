/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const useFetch = ({ url, method, body = null }) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [headersResponse, setHeadersResponse] = useState(undefined);
  const source = axios.CancelToken.source();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log("fetching", url);
        console.log("with body", body);
        setLoading(true);
        const result = await axios.request({
          url,
          method,
          headers: { ...headers },
          data: body,
          cancelToken: source.token,
        });
        setHeadersResponse(result.headers);
        setResponse(result.data);
        console.log("getting data from", url);
        console.log('result', result);
        console.log('header', result.headers);
      } catch (errors) {
        console.log("error", errors.response);
        if (error.response && (errors.response.status === 401)) {
          // TOKEN EXPIRED
          console.log("Token expired!");
          window.location.assign("/login");
        }
        isMounted && setError(errors.response);
      } finally {
        isMounted && setLoading(false);
      }
    };

    isMounted && fetchData();

    return () => {
      isMounted = false;
      console.log("Cleaning up stuff");
      source.cancel(`cancel req ${url}`);
    };

  }, []);

  return { response, error, loading, headersResponse };
};
