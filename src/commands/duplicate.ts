import { basename, dirname } from "path";
import { Uri, commands, window, workspace } from "vscode";

function getCopyName(original: string, attempt: number): string {
    let lastIndex = original.lastIndexOf(".");
    if (original.includes(".test.")) {
        lastIndex -= 5;
    }

    let name = lastIndex === -1 ? original : original.slice(0, lastIndex);
    let ext = lastIndex === -1 ? "" : original.slice(lastIndex);

    name += "-copy";
    name += attempt ? attempt + 1 : "";
    name += ext;

    return name;
}

async function executeCopy(uri: Uri, attempt: number = 0) {
    const { fsPath } = uri;
    const file = basename(fsPath);
    const copyName = getCopyName(file, attempt);

    const directory = Uri.file(dirname(fsPath));
    const oldFile = Uri.file(fsPath);
    const newFile = Uri.joinPath(directory, copyName);

    await workspace.fs.copy(oldFile, newFile);

    await window.showTextDocument(newFile);
    await commands.executeCommand("revealInExplorer");
    await commands.executeCommand("renameFile");
}

export default async function duplicate(uri: Uri) {
    let attempt = 0;
    while (attempt < 10) {
        try {
            await executeCopy(uri, attempt);
            return;
        } catch (error) {
            attempt++;
        }
    }

    window.showErrorMessage("Refusing to overwrite existing copy!");
}
