# Ketchup Plan: Filter content library by content type (#2)

## TODO

## DONE

- [x] Burst 1: Glossary — add Type filter and Selected type, update Content Library (3e8aa3e)
- [x] Burst 2: A selected type keeps only that type's items (9a478b2)
- [x] Burst 3: A `null` type keeps every item (aefc703)
- [x] Burst 4: Newest-first ordering survives filtering (characterization) (33e529f)
- [x] Burst 5: `listContentTypes` lists each type once, alphabetically (ba372ae)
- [x] Burst 6: `resolveSelectedType` keeps a known stored type (446f169)
- [x] Burst 7: `resolveSelectedType` falls back to All for an unknown type (4d5e324)
- [x] Burst 8: Playwright — pick a type, then go back to All types (5f813bf)
- [x] Burst 9: Playwright — the selected type is remembered for the next visit (d019d1c)

Bursts 9–11 merged: `mount()` props must be serializable, so the story uses the
real `localStorage` adapter instead of an in-memory one. One save-then-restore
journey covers saving, restoring and the `main.tsx` wiring.

# Ketchup Plan: Review round 1 (PR #17)

URL is the single source of truth; one big unit (`presentContentLibrary`) owns what the page shows.

## TODO

## DONE

- [x] R1: Glossary — Selected type lives in the page's link (6ca33c6)
- [x] R2: `presentContentLibrary` returns `{ cards }` (b175b88)
- [x] R3: Type options — All types first, then each type once, alphabetically (05c8d36, 0bb73ac)
- [x] R4: No type — All types selected, every card listed (92c9256, b5bb4ff)
- [x] R5: A selected type narrows the cards, newest first, and is the selected option (95cc1ef)
- [x] R6: Unknown type — All types selected, every card listed (dcb030b, 6103a48)
- [x] R7: `TypeFilter` renders the ViewModel's `typeOptions`; helpers private (d124b0c)
- [x] R8: Playwright — open a filtered link; URL replaces `localStorage` (72cf6ae)
- [x] R9: Playwright — narrow, reset, Back (eb3ad71)
