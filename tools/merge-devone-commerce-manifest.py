#!/usr/bin/env python3
"""
Merge DevOne Commerce into an existing DevOneCMS remote-marketplace manifest.json.
Usage from repo root:
  python tools/merge-devone-commerce-manifest.py
"""
import json
from pathlib import Path

repo = Path.cwd()
manifest_path = repo / "manifest.json"
item_path = repo / "manifest-add-this-item.json"

if not manifest_path.exists():
    raise SystemExit("manifest.json not found in current folder.")
if not item_path.exists():
    raise SystemExit("manifest-add-this-item.json not found in current folder.")

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
item = json.loads(item_path.read_text(encoding="utf-8"))
items = manifest.setdefault("items", [])
slug = item.get("slug")
replaced = False
for i, existing in enumerate(items):
    if existing.get("slug") == slug and existing.get("type") == item.get("type"):
        items[i] = item
        replaced = True
        break
if not replaced:
    items.append(item)
manifest["updated"] = "2026-07-07"
# light version bump if current version exists
manifest["version"] = manifest.get("version", "1.1.15")
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(("Updated" if replaced else "Added") + f" {slug} in manifest.json")
