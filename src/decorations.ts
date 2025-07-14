// src/decorations.ts
import * as vscode from "vscode";
import * as fs from "fs";
import { getMarkedFiles } from "./storage";

export class MarkerDecorationProvider implements vscode.FileDecorationProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri | vscode.Uri[]>();
  onDidChangeFileDecorations = this._onDidChange.event;

  fire(uri: vscode.Uri) {
    console.log("Firing decoration change for:", uri.fsPath);
    this._onDidChange.fire(uri);
  }

  provideFileDecoration(
    uri: vscode.Uri
  ): vscode.ProviderResult<vscode.FileDecoration> {
    const marks = getMarkedFiles();
    const mark = marks[uri.fsPath];

    // Check if it's a folder
    const isFolder =
      fs.existsSync(uri.fsPath) && fs.statSync(uri.fsPath).isDirectory();

    console.log(
      "provideFileDecoration called for:",
      uri.fsPath,
      "mark:",
      mark,
      "isFolder:",
      isFolder
    );

    if (mark) {
      const iconMap: Record<string, any> = {
        fire: {
          badge: "🔥",
        },
        zap: {
          badge: "⚡",
        },
        rocket: {
          badge: "🚀",
        },
        eye: {
          badge: "👁️",
        },
      };

      const decoration = iconMap[mark];
      if (decoration) {
        console.log(
          "Returning decoration with badge:",
          decoration.badge,
          "for",
          isFolder ? "folder" : "file"
        );

        return {
          badge: decoration.badge,
          tooltip: `Marked ${isFolder ? "folder" : "file"} - Click to remove`,
        };
      }
    }

    return undefined;
  }
}
