import { useCallback, useEffect, useRef, useState } from "react";
import { App as H5Viewer, H5GroveProvider } from "@h5web/app";
import "./App.css";

interface DownloadRequest {
  requestId: number;
  status: string;
  path: string | null;
}

function App() {
  const pollInterval = useRef<number | null>(null);
  const [downloadRequest, setDownloadRequest] =
    useState<DownloadRequest | null>(null);

  const pollProgress = useCallback(async () => {
    const requestId = downloadRequest?.requestId;
    if (requestId) {
      pollInterval.current = setInterval(async () => {
        const response = await fetch(
          `http://localhost:8000/request/${requestId}`
        );
        const request: DownloadRequest = JSON.parse(await response.text());

        if (request.status === "COMPLETE") {
          clearInterval(pollInterval.current!!);
        }

        setDownloadRequest(request);
      }, 3000);
    }
  }, [downloadRequest]);

  useEffect(() => {
    async function request() {
      const params = new URLSearchParams({
        sessionId: "2453b71d-5899-44ec-8e1c-1e20638157d9",
        datafileId: "91445662",
      });

      const response = await fetch("http://localhost:8000/request?" + params);
      const request: DownloadRequest = JSON.parse(await response.text());

      setDownloadRequest(request);
    }

    request();
  }, []);

  useEffect(() => {
    if (downloadRequest && !pollInterval.current) {
      pollProgress();
    }
  }, [downloadRequest, pollInterval.current, pollProgress]);

  const filePath = downloadRequest?.path;

  console.log("filePath", filePath);

  return filePath ? (
    <H5GroveProvider
      filepath={filePath}
      url="http://localhost:8000"
      axiosConfig={{ params: { file: filePath } }}
    >
      <H5Viewer />
    </H5GroveProvider>
  ) : (
    <p>Loading....</p>
  );
}

export default App;
