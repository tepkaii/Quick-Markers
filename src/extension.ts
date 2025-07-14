// src/extension.ts
import * as vscode from "vscode";
import * as fs from "fs";
import { MarkerDecorationProvider } from "./decorations";
import { updateMark, getMarkedFiles } from "./storage";

let provider: MarkerDecorationProvider;

export function activate(context: vscode.ExtensionContext) {
  console.log("File Marker extension is being activated!");

  provider = new MarkerDecorationProvider();
  vscode.window.registerFileDecorationProvider(provider);
  console.log("File decoration provider registered!");

  // Helper function to check if path is folder
  function isFolder(path: string): boolean {
    try {
      return fs.existsSync(path) && fs.statSync(path).isDirectory();
    } catch {
      return false;
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("fileMarker.markFire", (uri) => {
      console.log(
        "markFire command called with:",
        uri?.fsPath,
        "isFolder:",
        isFolder(uri.fsPath)
      );
      const marks = getMarkedFiles();
      const currentMark = marks[uri.fsPath];

      if (currentMark === "fire") {
        updateMark(uri.fsPath, null);
      } else {
        updateMark(uri.fsPath, "fire");
      }
      provider.fire(uri);
    }),
    vscode.commands.registerCommand("fileMarker.markZap", (uri) => {
      console.log(
        "markZap command called with:",
        uri?.fsPath,
        "isFolder:",
        isFolder(uri.fsPath)
      );
      const marks = getMarkedFiles();
      const currentMark = marks[uri.fsPath];

      if (currentMark === "zap") {
        updateMark(uri.fsPath, null);
      } else {
        updateMark(uri.fsPath, "zap");
      }
      provider.fire(uri);
    }),
    vscode.commands.registerCommand("fileMarker.markRocket", (uri) => {
      console.log(
        "markRocket command called with:",
        uri?.fsPath,
        "isFolder:",
        isFolder(uri.fsPath)
      );
      const marks = getMarkedFiles();
      const currentMark = marks[uri.fsPath];

      if (currentMark === "rocket") {
        updateMark(uri.fsPath, null);
      } else {
        updateMark(uri.fsPath, "rocket");
      }
      provider.fire(uri);
    }),
    vscode.commands.registerCommand("fileMarker.markEye", (uri) => {
      console.log(
        "markEye command called with:",
        uri?.fsPath,
        "isFolder:",
        isFolder(uri.fsPath)
      );
      const marks = getMarkedFiles();
      const currentMark = marks[uri.fsPath];

      if (currentMark === "eye") {
        updateMark(uri.fsPath, null);
      } else {
        updateMark(uri.fsPath, "eye");
      }
      provider.fire(uri);
    }),
    vscode.commands.registerCommand("fileMarker.clearMark", (uri) => {
      console.log(
        "clearMark command called with:",
        uri?.fsPath,
        "isFolder:",
        isFolder(uri.fsPath)
      );
      updateMark(uri.fsPath, null);
      provider.fire(uri);
    })
  );

  console.log("All commands registered!");
}

export function deactivate() {}
