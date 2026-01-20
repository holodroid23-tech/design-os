# FolderDetail Blueprint

## Logic Tree
- [Screen: Daily expenses folder detail]
  - [Header]
    - [Back]: Chevron-left icon
    - [Title]: Folder/category name (e.g. "Monthly utilities")
  - [Grid: Expense templates]
    - [Tile]: Name only (optional image) — no price, no counters
    - [Interaction]: Tap tile to start an expense entry for that template

## Notes
- Uses `ProductTile` (not `OrderProductTile`) to avoid counters/actions.

