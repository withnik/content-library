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
