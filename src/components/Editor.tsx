import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { WebsocketProvider } from "y-websocket";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import * as Y from "yjs";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { type EditorState } from "lexical";

export default function Editor({
  initialEditorState,
  noteId,
}: {
  initialEditorState: string | null;
  noteId: string;
}) {
  const saveEditorState = (editorState: EditorState) => {
    console.log("saving editor state", noteId)
    localStorage.setItem(noteId, JSON.stringify(editorState));
  };

  return (
    <LexicalComposer
        key={noteId}
      initialConfig={{
        editorState: null,
        namespace: "test",
        onError: (error: Error) => console.log(error),
      }}
    >
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CollaborationPlugin
        id={noteId}
        providerFactory={(id, yjsDocMap) => {
          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);

          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            doc
          );

          provider.on("sync", () => console.log("sync"));

          return provider;
        }}
        initialEditorState={initialEditorState}
        shouldBootstrap={true}
      />
      <OnChangePlugin onChange={saveEditorState} ignoreSelectionChange />
    </LexicalComposer>
  );
}
