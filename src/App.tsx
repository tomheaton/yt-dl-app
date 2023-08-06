import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export default function App() {
  const [downloadMsg, setDownloadMsg] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (downloadMsg) {
      setTimeout(() => {
        setDownloadMsg("");
      }, 5000);
    }
  }, [downloadMsg]);

  async function download() {
    setDownloadMsg("");
    setLoading(true);
    setDownloadMsg(await invoke("download", { url }));
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">yt-dl-app</h1>
      <p>Enter the url of the yt video you would like to download.</p>
      <form
        className="flex justify-center space-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          download();
        }}
      >
        <input
          className=""
          id="url"
          name="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a url..."
        />
        <button type="submit" className="">{loading ? "Downloading..." : "Download"}</button>
      </form>
      <p>{downloadMsg}</p>
    </div>
  );
}
