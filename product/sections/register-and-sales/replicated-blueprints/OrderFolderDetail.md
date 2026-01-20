# OrderFolderDetail Blueprint

## Logic Tree
- [Screen: Order folder detail]
  - [Header]
    - [Back]: Chevron-left icon
    - [Title]: Folder/category name (e.g. "Iced drinks")
  - [Grid: Items]
    - [Menu item tile]: Name + price (optional image)
      - [If in order]: show qty + decrease/remove + increase actions
  - [Bottom bar: Order summary]
    - [Interaction]: Tap expands into order details / checkout

## Notes / Deltas vs OrdersMain
- Tabs removed (replaced with back + title header)
- Favorites removed
- Inventory title removed
- Custom item + folder tiles removed

