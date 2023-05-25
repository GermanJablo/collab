import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const EditorCSR = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function EditorPage() {
  const [activeNote, setActiveNote] = React.useState("1");

  return (
    <>
      <button onClick={() => setActiveNote("1")}>Note 1</button>
      <button onClick={() => setActiveNote("2")}>Note 2</button>
      <h1>Active Note: {activeNote}</h1>
      <div style={{ height: "500px", width: "500px" }}>
        <div style={{ border: "solid 1px" }}>
          <EditorCSR noteId={activeNote} />
        </div>
      </div>
    </>
  );
}
