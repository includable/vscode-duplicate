import { ExtensionContext, Uri, commands } from "vscode";
import duplicate from "./commands/duplicate";

export async function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("file-duplicate.execute", (uri: Uri) =>
            duplicate(uri)
        )
    );
}

export function deactivate() {}
