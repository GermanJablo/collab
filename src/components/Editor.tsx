/* eslint-disable @typescript-eslint/no-unused-vars */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import * as Y from "yjs";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { type Provider } from "@lexical/yjs";
import {
  HocuspocusProvider,
} from "@hocuspocus/provider";

export default function Editor({
  initialEditorState,
  noteId,
}: {
  initialEditorState: string | null;
  noteId: string;
}) {
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
      <OnChangePlugin onChange={() => console.log("change")} />
      <CollaborationPlugin
        id={noteId}
        providerFactory={createWebsocketProvider}
        initialEditorState={initialEditorState}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );
}

function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Y.Doc>
): Provider {
  const doc = new Y.Doc();
  yjsDocMap.set(id, doc);


  const hocuspocusProvider = new HocuspocusProvider({
    url: `ws://localhost:7398`,
    name: `test-${id}`,
    document: doc,
    onConnect: () => {
      console.log("connected to:", `test-${id}`);
    }
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return hocuspocusProvider;
}
