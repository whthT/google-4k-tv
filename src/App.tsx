import { invoke } from "@tauri-apps/api";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { move_window, Position } from "tauri-plugin-positioner-api";
import "./App.css";

enum Channels {
  YT = "yt",
  GP = "gp",
}

const sources = [
  {
    title: "Google Movies",
    url: "https://play.google.com/store/movies",
    symbol: Channels.GP,
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/",
    symbol: Channels.YT,
  },
];

const webview = new WebviewWindow("tv");

function App() {
  useEffect(() => {
    move_window(Position.BottomRight);
  }, []);

  const zapt = (type: Channels) => {
    return () => {
      const data = sources.find((s) => s.symbol === type);
      invoke("redirect", data).then((response) => {
        console.log("response", response);
      });
    };
  };

  return (
    <div className="w-full bg-zinc-600 h-full flex flex-col p-5 gap-3">
      <button
        className="bg-white transition-colors hover:bg-gray-200 active:scale-95 rounded-md h-12 text-xl text-gray-800 font-semibold"
        onClick={zapt(Channels.GP)}
      >
        Google Play
      </button>
      <button
        className="bg-red-600 transition-colors hover:bg-red-700 active:scale-95 rounded-md h-12 text-xl text-white font-semibold"
        onClick={zapt(Channels.YT)}
      >
        Youtube
      </button>
    </div>
  );
}

export default App;
