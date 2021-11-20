import { useState } from "react";

async function get(
  { url, headers, abortController },
  { setData, setIsPending, setError }
) {
  try {
    const res = await fetch(url, {
      headers: headers,
      signal: abortController.signal,
    });

    if (!res.ok) {
      throw Error(res);
    }

    const parsedRes = await res.json();

    setIsPending(false);
    setData(parsedRes);
    setError(null);
  } catch (error) {
    setIsPending(false);

    if (error.name === "AbortError") {
      console.log(`GET ${url} aborted`);
    } else {
      setError(error.message);
    }
  }
}

async function post(
  { url, headers, body, abortController },
  { setData, setIsPending, setError }
) {
  try {
    setIsPending(true);

    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      signal: abortController.signal,
      body: JSON.stringify(body),
    });

    const parsedRes = await res.json();

    if (!res.ok) {
      throw parsedRes;
    }

    setIsPending(false);
    setData(parsedRes);
    setError(null);
  } catch (error) {
    setIsPending(false);

    if (error.name === "AbortError") {
      console.log(`POST ${url} aborted`);
    } else {
      setError(error);
    }
  }
}

async function put(
  { url, headers, body, abortController },
  { setData, setIsPending, setError }
) {
  try {
    setIsPending(true);

    const res = await fetch(url, {
      method: "PUT",
      headers: headers,
      signal: abortController.signal,
      body: JSON.stringify(body),
    });

    const parsedRes = await res.json();

    if (!res.ok) {
      throw parsedRes;
    }

    setIsPending(false);
    setData(parsedRes);
    setError(null);
  } catch (error) {
    setIsPending(false);

    if (error.name === "AbortError") {
      console.log(`POST ${url} aborted`);
    } else {
      setError(error);
    }
  }
}

async function del(
  { url, headers, abortController },
  { setData, setIsPending, setError }
) {
  try {
    const res = await fetch(url, {
      headers: headers,
      signal: abortController.signal,
      method: "DELETE",
    });

    if (!res.ok) {
      throw Error(res);
    }

    const parsedRes = await res.json();

    setIsPending(false);
    setData(parsedRes);
    setError(null);
  } catch (error) {
    setIsPending(false);

    if (error.name === "AbortError") {
      console.log(`GET ${url} aborted`);
    } else {
      setError(error.message);
    }
  }
}

const useHttp = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const abortController = new AbortController();

  const send = ({
    url,
    method = "GET",
    headers = { "Content-Type": "application/json" },
    body = {},
  }) => {
    if (method === "GET") {
      return get(
        { url, headers, abortController },
        { setData, setIsPending, setError }
      );
    } else if (method === "POST") {
      return post(
        { url, headers, body, abortController },
        { setData, setIsPending, setError }
      );
    } else if (method === "PUT") {
      return put(
        { url, headers, body, abortController },
        { setData, setIsPending, setError }
      );
    } else if (method === "DELETE") {
      return del(
        { url, headers, abortController },
        { setData, setIsPending, setError }
      );
    }
  };

  return { send, data, isPending, error, abortController };
};

export default useHttp;
