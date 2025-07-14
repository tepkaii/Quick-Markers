// src/storage.ts
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const MARKS_FILE = ".vscode/marked-files.json";

function getMarkFilePath(): string | undefined {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;
  return path.join(workspaceFolder.uri.fsPath, MARKS_FILE);
}

export function getMarkedFiles(): Record<string, string> {
  const filePath = getMarkFilePath();
  if (!filePath || !fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function updateMark(fsPath: string, color: string | null) {
  const filePath = getMarkFilePath();
  if (!filePath) return;

  const marks = getMarkedFiles();
  if (color) marks[fsPath] = color;
  else delete marks[fsPath];

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(marks, null, 2));
}
