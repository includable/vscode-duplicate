import { ExtensionContext, Uri, TextDocument, commands, window } from "vscode";
import duplicate from "./commands/duplicate";

export async function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(
      "file-duplicate.execute",
      (uri: TextDocument | Uri) => {
        if (!uri || !(<Uri>uri).fsPath) {
          const editor = window.activeTextEditor;
          if (!editor) return;
          return duplicate(<Uri>editor.document.uri);
        }

        duplicate(<Uri>uri);
      }
    )
  );
}

export function deactivate() {}
