import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [downloadMsg, setDownloadMsg] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function download() {
    setLoading(true);
    setDownloadMsg(await invoke("download", { url }));
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>yt-dl-app</h1>
      <p>Enter the url of the yt video you would like to download.</p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          download();
        }}
      >
        <input
          id="url"
          name="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          placeholder="Enter a url..."
        />
        <button type="submit" >{loading ? "Downloading..." : "Download"}</button>
      </form>
      <p>{downloadMsg}</p>
    </div>
  );
}
