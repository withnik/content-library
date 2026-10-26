# Ketchup Plan: Filter content library by content type (#2)

## TODO

- [ ] Burst 1: Glossary — add Type filter and Selected type, update Content Library
- [ ] Burst 2: A selected type keeps only that type's items
- [ ] Burst 3: A `null` type keeps every item
- [ ] Burst 4: Newest-first ordering survives filtering (characterization)
- [ ] Burst 5: `listContentTypes` lists each type once, alphabetically
- [ ] Burst 6: `resolveSelectedType` keeps a known stored type
- [ ] Burst 7: `resolveSelectedType` falls back to All for an unknown or missing type
- [ ] Burst 8: Playwright — pick a type, then go back to All types (`ActionMenu` in `App`)
- [ ] Burst 9: Playwright — picking a type saves it (storage injected into `App`)
- [ ] Burst 10: Playwright — a stored selection is restored on mount
- [ ] Burst 11: Wire the `localStorage` adapter in `main.tsx`, verify by hand

## DONE
