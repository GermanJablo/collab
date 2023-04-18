import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const EditorCSR = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function EditorPage() {
  const [activeNote, setActiveNote] = React.useState("1");
  const [currentEditorState, setCurrentEditorState] = React.useState<null | string>(null);

  useEffect(() => {
    const editorState = localStorage.getItem(activeNote);
    if (editorState) setCurrentEditorState(editorState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetActiveNote = (note: string) => {
    setActiveNote(note);
    const editorState = localStorage.getItem(note);
    console.log("loading editor state", note, editorState);
    if (editorState) setCurrentEditorState(editorState);
  }

  return (
    <>
      <button onClick={() => handleSetActiveNote("1")}>Note 1</button>
      <button onClick={() => handleSetActiveNote("2")}>Note 2</button>
      <h1>Active Note: {activeNote}</h1>
      <div style={{ height: "500px", width: "500px" }}>
        <div style={{ border: "solid 1px" }}>
          <EditorCSR initialEditorState={currentEditorState} noteId={activeNote} />
        </div>
        <div style={{ border: "solid 1px" }}>
          <EditorCSR initialEditorState={currentEditorState} noteId={activeNote} />
        </div>
      </div>
    </>
  );
}
