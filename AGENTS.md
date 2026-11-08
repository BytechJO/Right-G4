# Grade 4 project agreement

These conventions were explicitly carried over by the user from Right-G2 to
Right-G4. Preserve Grade 4's own design, colors, layout, dimensions, content,
images, recordings, answer data, and exercise concept. Adapt behavior locally;
never copy Grade 2 question content or visual styling into Grade 4.

## Reference locations

The existing exercise reference paths in the inherited rules below refer to
C:/Users/d.dahamsheh.ALROWAD/Desktop/Right-G2, unless explicitly identified as a
Grade 4 reference. Resolve those paths against Right-G2 when inspecting examples;
do not assume the same relative filename exists or has the same content here.
Inspect the actual target and reference before modifying an exercise. Do not
modify Right-G2 reference files as part of Grade 4 work. User-approved Grade 4
examples can be registered here as they are established.

Only requested exercises are in scope. For an unknown exercise type, leave it
unchanged and ask for its reference; if the user requests skipping unknown types,
list them at the end. For mixed exercises, apply each constituent type's own
reference while preserving their combined interaction.

# Exercise reference agreement

- Before modifying an exercise of a new type for which the user has not supplied
  a reference, inspect it, explain the type and missing reference, and ask the
  user how to proceed. Do not modify that exercise until the user responds.
- For a mixed exercise, identify each constituent exercise type and apply its
  own user-provided reference and conventions to that part, preserving how the
  parts work together. Do not impose one type's behavior on the entire exercise.
- If any part of a mixed exercise has no supplied reference, ask the user about
  that part before modifying the mixed exercise. Existing references remain
  valid for known types; this does not require repeated approval for them.

# Mixed Matching and letter Drag and Drop navigation

- In every mixed exercise containing Matching, while either endpoint is selected,
  exclude the accompanying exercise's controls from Tab/Shift+Tab navigation until
  the connection is completed or cancelled. Include only available endpoints on
  the opposite matching side and keep exercise action buttons accessible. Restore
  the accompanying exercise's normal navigation after completion or cancellation.
- Order matching focus targets by their displayed order, never by the correct
  answer mapping. This applies to source-selection focus and arrow navigation;
  Tab/Shift+Tab must follow the same visual order without positive tab indices.
- For mixed exercises arranged like `Review8_Page2_Q2`, while a matching source
  is selected, exclude letter blanks and letter-bank tiles from Tab/Shift+Tab
  navigation. Treat each word as one matching endpoint, rather than entering
  its embedded Drag and Drop controls before the connection is completed.
- After selecting an image, move keyboard focus to an available whole-word
  endpoint; keep the image endpoints out of the Tab order during that pending
  image selection. Tab/Shift+Tab traverse word endpoints without trapping focus
  or removing access to the exercise action buttons.
- Completing or cancelling the connection restores normal navigation to letter
  blanks and banks. Keep mouse/touch interaction and independent answer locks.

# Shared focus and audio preferences for future exercise work

These latest user preferences apply to every exercise type below and override
older examples that style the exercise action buttons.

- Do not add `focusClass`, custom focus rings/outlines, or equivalent descendant
  focus selectors to Check Answer, Show Answer, or Start Again buttons. Preserve
  their existing shared/native focus behavior and keyboard accessibility.
- Custom keyboard focus indicators on exercise choices, words, sentences, slots,
  grid cells, and matching endpoints must have rounded corners. Reuse the
  element's existing border radius, or add a minimal local rounded radius if it
  has none. Preserve existing pill/circle shapes, dimensions, and layout.
- Do not modify shared components or global styles to implement these preferences.
  Apply them in future requested work; do not migrate existing exercises unless
  the user asks.

- Every `QuestionAudioPlayer` usage in requested exercise work must pass a stable,
  exercise-specific `pageId` prop. Prefix it with `sb` for Student Book/StudentPages
  or `wb` for Workbook/WorkBookPages, then the lowercase unit/review, page, and
  question joined with underscores: `sb_review7_page2_q1`, `sb_unit8_page5_q1`,
  `wb_unit8_page5_q1`, etc. Match
  the actual exercise, not the origin of its audio assets. Do not reuse another
  exercise's ID or generate it dynamically. This namespaces saved audio positions.
  Do not migrate unrelated exercises without a request.

- In exercises using `QuestionAudioPlayer`, Start Again resets exercise answers
  and feedback without rewinding or restarting that player. It may pause playback,
  but must preserve the current time and saved audio position. Do not seek to zero,
  remove the player's saved-position key, reload/change its source, or remount it
  with a changing key as part of the exercise reset. Keep the player's own explicit
  restart control separate. Owned word/fragment audio may still be stopped and
  cleared. Apply this rule when requested; do not change shared player internals.

- In every exercise type, Show Answer reveals correct answers with the same green
  correct-answer feedback as a successful check: selected answer borders, slot
  borders/underlines, matching lines/endpoints, or completed sentence/grid feedback
  as appropriate. Keep revealed answers locked and clear incorrect feedback.
  Do not display a new score alert or count revealed answers as a student-earned
  score. Start Again clears the green feedback and all reveal locks.

# Check Answer completion rule — all exercise types

- In every future requested exercise update, explicitly check this behavior:
  after Check Answer confirms that all required answers are correct, actually
  disable the native Check Answer button (`disabled`) and show a `not-allowed`
  cursor. Repeated mouse/touch clicks or Enter/Space activation must not show
  another alert, score, or other feedback, or rerun checking side effects.
- Keep a handler guard as well as actual button disabling. Derive the disabled
  state from the exercise's checked completion/reveal state and keep it synchronized
  across rerenders; do not rely only on `aria-disabled`, an event's `currentTarget`,
  or a one-time cursor mutation. Correct choices before checking alone must not
  disable the first Check Answer attempt.
- Incomplete or partially incorrect attempts keep Check Answer available for
  correction and rechecking. In mixed exercises, success requires every required
  part to be correct. Show Answer keeps Check Answer disabled without awarding
  a student-earned score. Start Again restores the enabled state and normal cursor.
- References for this fix are the local completion checks and native-button
  synchronization in `src/component/WorkBookPages/Unit2/WB_Unit2_Page13_Q1.jsx`,
  `WB_Unit2_Page13_Q2.jsx`, `WB_Unit2_Page14_Q1.jsx`, and `WB_Unit2_Page14_Q2.jsx`
  in that same directory. Adapt to the target's own state without changing its
  design, content, audio, or other behavior. Do not modify shared components or
  global styles, or migrate unrelated questions, without user authorization.
- Verify first successful checking, repeated activation, rerender persistence,
  partial correction/rechecking, Show Answer, and Start Again. Distinguish native
  button/handler simulation from real browser mouse/touch/keyboard verification.

# Drag and Drop exercise conventions

These are the user's established conventions for Drag and Drop exercises in this
project. Apply them when asked to create or update a Drag and Drop exercise;
do not update other exercises automatically. Exercise-specific user instructions
take precedence. Do not apply these conventions to Select, Matching, or Word
Search without their separate requirements.

## References and scope

- Use `src/component/StudentPages/unit8/Unit8_Page5_Q2.jsx` as the implemented
  example and `src/component/StudentPages/review5&6/Review5_Page2_Q3.jsx` as a
  reference. The latter currently exports `Review5_Page2_Q4`; inspect actual
  component names rather than assuming they match filenames.
- Adapt local behavior; do not copy an entire reference component or replace
  the target's structure unnecessarily.
- Preserve the exercise's question concept, answer data, text, images, layout,
  dimensions, colors, spacing, and mouse/touch drag interactions, except for
  explicitly requested changes such as the header and speaker indicator.
- Use the existing `ExerciseHeader` with the target's own title and numbering.
  Do not invent question text or subtitles.
- Keep changes confined to the requested exercise. Avoid modifying reference
  exercises, shared components, CSS, audio managers, global styles, or adding
  dependencies unless explicitly authorized.

## Audio and speaker indicator

- Connect existing audio assets to the correct words and text fragments. Do not
  invent paths, recordings, or content.
- Support click/touch activation and Enter/Space audio playback.
- Keyboard-visible focus may play audio, following the reference pattern;
  suppress playback during programmatic focus movement.
- Show the reference-style speaker badge on the element whose audio is playing,
  without shifting its layout. Clear it when playback ends, stops, or fails.
  Do not add a separate visible player unless requested.
- Prevent overlapping playback; guard stale completion/error/rejection callbacks.
  Stop exercise audio on reset and unmount, and during check/reveal as appropriate.

## Selection, placement, return, and focus

- In every requested Drag and Drop update, inspect drag positioning for mouse
  and touch, especially inside the Book's transformed/zoomed containers. Never
  override the drag library's active position, top, left, transform, or dimensions
  with normal bank styles such as `position: relative`; apply library positioning
  after those styles. The dragged word must remain visible at the pointer without
  a jump or displacement. When reparenting is needed, move the actual draggable
  into an untransformed portal in the active fullscreen element or document body,
  keeping it visible above page layers. Do not remove the source in favor of a
  clone that may be invisible. Preserve the bank appearance, mouse/touch sensors,
  keyboard flow, and protected answer locks. Test portal visibility/coordinates
  and report separately whether real mouse/touch verification was available.
- Preserve logical Tab/Shift+Tab navigation. Enter and Space select a bank word
  and place it in an editable slot. Prevent duplicate activation, key-repeat
  actions, and conflicts with global handlers or the drag library's keyboard
  sensor; preserve the library's mouse/touch sensors.
- Move keyboard focus to an available slot after selection, and back to an
  available bank word after placement, without unexpected audio.
- While dragging over an editable answer slot, show a dashed blue outline around
  the whole slot and a light blue background with rounded corners. Drive this
  from the drag library's target-over state; clear it when leaving, dropping, or
  cancelling. Do not show an active drop effect on correctly locked/revealed slots,
  or change slot dimensions or surrounding layout.
- Keep the selected bank word/sentence visibly highlighted with a blue outline
  and light blue background while awaiting placement, even after focus moves to
  the slots or audio finishes. Clear it on placement, cancellation, drag start,
  check/reveal, and reset. Preserve the drag library's inline positioning styles.
- Questions/text fragments with audio show a blue outline and light blue
  background while their own audio plays, in addition to the speaker badge.
  Clear this playback effect on stop/end/error. Use shadows or outlines so the
  effect does not change dimensions or shift the layout.
- Activating a filled editable slot by click/touch or Enter/Space, with no
  pending keyboard replacement, returns its word to the bank. This also works
  before checking. Keyboard placement of a newly selected word may replace an
  editable answer. A pointer activation of a filled editable slot returns its
  current word.
- Tab focus alone must never remove or change an answer. Escape cancels the
  pending selection and returns keyboard focus to its source word.
- Delete/Backspace may remove only an editable answer marked incorrect by Check.
- Keep focus stable across renders and cancel pending focus work on reset,
  check/reveal, drag start, and unmount as appropriate.

## Validation and answer states

- Check against the target's existing answer data and actual slot IDs. Keep
  incomplete-answer validation and score feedback consistent with the exercise.
- Lock each correctly checked answer individually and show a green underline.
  Preserve these locks on subsequent checks.
- Leave incorrect answers editable; make their words available for correction.
  Clear only affected incorrect feedback when answers change. Preserve the
  target's existing incorrect styling.
- Never overwrite, remove, or move a correctly locked answer through pointer,
  keyboard, or shared placement helpers. Listening must not modify an answer.
- Show Answer reveals correct answers and locks changes. Start Again clears
  answers, locks, feedback, pending selections, playback indicators, and local
  progress, and stops audio.

## Images and verification

- Inspect actual artwork before writing meaningful image alt text. SVGs may
  contain embedded PNG artwork that can be inspected directly. Never infer a
  description from a variable name, filename, or expected answer. If visual
  inspection is unavailable, identify the image requiring review.
- Run targeted lint and an available build, plus proportionate checks for
  keyboard selection/placement/return, focus suppression, partial correction and
  rechecking, protected locks, audio lifecycle, reveal, and reset.
- Verify real mouse/touch behavior, Tab/Shift+Tab, audible playback, screen-reader
  behavior, and visual preservation when a browser/device session is available.
  Handler-level checks do not substitute for those browser/device checks.
- Report exactly what was changed and tested, and any unavailable, blocked,
  declined, or failed checks. Never claim an unverified test passed.

# Select exercise conventions

These are the user's established conventions for Select exercises. Apply them
when asked to create or update a Select exercise; do not migrate exercises
automatically. Exercise-specific user instructions take precedence. Keep these
rules separate from Drag and Drop, Matching, and Word Search behavior.

## References and scope

- Use `src/component/StudentPages/unit8/Unit8_Page5_Q1.jsx` as the implemented
  example and `src/component/StudentPages/review3&4/Review4_Page2_Q1.jsx` as the
  reference. The reference component is `Review4_Page2_Q1`; its actual directory
  is `review3&4`, not `review4&5`.
- Use the existing `ExerciseHeader` with the target's own section, question
  number, and title. Preserve wording and meaningful emphasis; do not invent
  subtitles or import reference exercise content.
- Preserve the target's concept, question structure, answer choices, correct
  answer data, images, layout, dimensions, spacing, and pointer/touch behavior.
  Apply the requested result borders and keyboard focus styling locally.
- Prefer modifying only the target JSX. Do not modify reference exercises, CSS,
  shared components, global styles, or audio managers without authorization.
  Do not add dependencies or a testing framework for routine exercise changes.

## Selection and keyboard focus

- For true/false (tick/cross) Select exercises, the selected option must have
  a persistent light blue background before checking, so selection is clear
  with mouse, touch, and keyboard even after focus moves away. Preserve the
  option dimensions and rounded shape. Correct/incorrect result borders still
  take precedence in green/red; switching or resetting clears the old selection.
- Use accessible answer buttons with descriptive names, selected state
  (`aria-pressed` where appropriate), and locked-state descriptions.
- Tab/Shift+Tab navigate in logical order without selecting or changing answers.
  Enter/Space activate an answer exactly once, consistently with click/touch.
  Guard duplicate native/manual activation, key repeat, and global-handler
  conflicts. Prefer local handlers; do not introduce global keyboard listeners.
- Show a clearly visible, thick blue keyboard focus outline, using the current
  example's 4px outline with an offset and rounded corners. Apply it to answer
  choices, not Check Answer, Show Answer, or Start Again. Keep it distinct from
  the correct/incorrect border and avoid resizing controls or shifting the layout.
- Announce selection, validation, locked answers, reveal, and reset through a
  local screen-reader status region. Keep focus stable when feedback changes.

## Checking, feedback, and locks

- Validate required answers using the target's original answer data. Preserve
  its score alerts and incomplete-answer flow.
- Check each question independently. Lock correct answers individually; never
  lock incorrect answers merely because Check Answer was pressed.
- After checking, the entire border of the selected answer box is green for
  correct and red for incorrect. Retain the requested green underline for a
  correctly checked selection and existing incorrect feedback such as a cross.
  Do not color unselected alternatives as if they were submitted answers.
- Correct answers cannot be changed by mouse, touch, Enter, or Space. Preserve
  their results, green feedback, and locks through later checks.
- Incorrect answers remain editable. Changing one clears only that question's
  outdated feedback; it must not clear other results or unlock correct answers.
- Lock the entire exercise on successful completion or Show Answer according
  to its intended flow. Show Answer reveals correct selections and blocks edits.
- Start Again clears selections, individual/global locks, results, score/status
  feedback, and relevant exercise progress, and stops/resets exercise audio.

## Audio and images

- Preserve existing instruction audio, captions, timestamps, and initial playback
  behavior. Do not invent audio paths, individual-question mappings, or segment
  boundaries. Grouped captions do not establish individual-question timestamps.
- If verified individual-question audio exists, provide keyboard-accessible
  Enter/Space playback following the reference pattern. Prevent overlapping
  playback and guard stale callbacks; clean up owned listeners, timers, and audio.
  Suppress unexpected audio from programmatic focus changes if focus plays sound.
- Every word or sentence with audio must show the reference-style speaker badge
  on the element whose audio is currently playing. This is a user requirement for
  Select as well as Drag and Drop. Use absolute positioning so it does not shift
  the layout. Track the activated element, not only the audio asset: the same word
  may appear in several questions. Clear the badge on completion, replacement,
  stopping, playback failure, reset, and reveal. Do not add a separate visible
  audio player unless requested.
- Reuse shared audio components without altering them. Scope any local audio
  stopping/resetting to the exercise, rather than unrelated page audio.
- Inspect actual image artwork before writing alt text. Describe informative
  images accurately without unnecessarily revealing the phonics answer. Use
  empty alt and hidden decorative tick/cross images when the enclosing button
  already supplies their accessible meaning. Report unverified artwork.

## Verification

- Run targeted lint and available build checks, and proportionate verification
  of incomplete answers, mixed results, correction/rechecking, persistent locks,
  full result borders, keyboard activation/repeat suppression, reveal, and reset.
- Verify audio configuration and lifecycle and preservation of target content,
  assets, and layout. Inspect the final changes for unrelated edits.
- Verify actual Tab navigation, mouse/touch, focus visibility, audible playback,
  screen-reader feedback, and visual appearance when a browser/device is available.
  Distinguish isolated handler/style checks from real browser verification.
- Report checks actually run and any failures, limitations, or declined checks.
  Never claim an unverified check passed.

# Word Search — إيجاد الكلمات

Use this name for standalone word-finding exercises without sentence completion.
User-provided interaction reference:
`src/component/StudentPages/unit5/Unit5_Page5_Q3.jsx`.
Workbook adaptation:
`src/component/WorkBookPages/Unit1/WB_Unit1_Page7_Q1.jsx`.
Keep this pattern separate from Word Search Sentence, Select, and Drag and Drop.

- Preserve the target grid, word list, target paths, content, layout, dimensions,
  and existing book colors/styles. Verify coordinates against the actual grid.
  Adapt the interaction locally; do not copy reference images or Student Book
  styling into Workbook exercises. Use ExerciseHeader with the target's title
  and book theme, without inventing subtitles.
- Support mouse/touch/pen dragging and two-click/two-tap endpoint selection.
  Accept exact paths forward or backward, including paths through intersections
  with previously found words. Reject invalid paths and duplicate discoveries.
  Scope hit testing to this grid; use pointer capture and pointer identity so a
  second pointer cannot hijack or finish a selection. Handle cancellation safely.
- Provide one grid Tab stop, arrow navigation and preview, Enter/Space endpoint
  activation, Escape cancellation, and Backspace undo. Tab must leave the grid.
  Guard repeated activation and global keyboard conflicts; keep custom focus
  visible and rounded, without styling the exercise action buttons.
- Undo cancels an unfinished selection first; otherwise remove the most recent
  discovery while editable. Shared cells stay found if another discovered word
  still uses them. Preserve the target's found-cell and word-list feedback.
- Check with no discoveries prompts the student. Partial checking marks missing
  words and reports the existing score while keeping the activity editable.
  Lock only on complete successful checking or Show Answer. Revealing shows all
  paths with the same correct feedback and no new score. Start Again clears all
  discoveries, feedback, locks, selection, capture, audio and pending focus work.
- Use verified word audio where available. Word-list items or existing picture
  cards support click/touch and Enter/Space listening; keyboard-visible focus may
  listen. Show the speaker indicator and playback effect on the active item,
  without shifting layout. Guard stale callbacks, stop overlap, and clean up on
  check/reveal/reset/unmount. Listening never changes discoveries or locks.
- Verify paths/reverse paths, invalid/duplicate/intersecting selections, keyboard
  navigation/undo, pointer identity/capture/cancellation, partial rechecking,
  reveal/reset, audio and preservation of content/styles. Run targeted lint and
  available build checks. Distinguish handler checks from real browser/device,
  audible playback, visual and screen-reader verification.

# Word Search Sentence — البحث عن الكلمات لتكوين جملة

When the user asks for "Word Search Sentence" or "البحث عن الكلمات لتكوين جملة",
apply this exercise pattern to the requested target. Use
`src/component/StudentPages/unit7/Unit7_Page5_Q4.jsx` as the interaction reference
and `src/component/StudentPages/unit8/Unit8_Page5_Q4.jsx` as the adapted example.
Do not apply Select or Drag and Drop answer-state rules to this type.

- Preserve the target grid letters, row lengths, words, sentence order, images,
  dimensions, and existing visual layout. Use `ExerciseHeader` with its own title.
  Verify every word coordinate against the actual grid; correct bad coordinates
  without changing the content and explain the correction.
- Support mouse/touch/pen dragging and selecting the first and last letter with
  two taps/clicks. Use pointer capture, cancellation, pointer identity, and
  exercise-scoped hit testing. Prevent a second touch from hijacking a selection.
- Match the exact target coordinates forward or in reverse. Preview a straight
  path without accepting unrelated matching letters elsewhere. Account for
  unequal row lengths. Reject invalid paths and duplicate discoveries.
- Provide a roving grid tab stop, arrows to navigate and preview, Enter/Space to
  start and complete selection, Escape to cancel, and Backspace to undo. Guard
  activation repeats and global keyboard conflicts. Tab must leave the grid.
  Show a thick blue keyboard focus indicator and announce selection/results.
- Keep found word cells green and fill the read-only sentence slots in the
  original sentence order, regardless of discovery order. Do not enforce discovery
  order unless explicitly requested. Undo cancels an unfinished selection first,
  otherwise removes the most recently found word while the activity is editable.
- Check with no discoveries prompts the student. A partial score keeps the grid
  editable so the student can find missing words or undo. Lock after a complete
  successful check or Show Answer. Do not lock a partial attempt.
- Show Answer reveals all target paths and the complete sentence and locks edits.
  Start Again clears discoveries, selection/preview, pointer state, result locks,
  score/status feedback, audio, and pending focus work; restore grid focus safely.
- Reuse only verified sentence audio. When available, play on sentence completion
  and allow click/Enter/Space replay from the completed answer. Show a speaker
  indicator while playing, clear it on stop/end/error, prevent overlap, and clean
  up on reset/unmount. If no verified sentence recording exists, report the missing
  asset; never fabricate audio, concatenate unrelated recordings, or show a fake
  playback indicator. Keep the existing shared audio components/managers unchanged.
- Inspect actual artwork for alt descriptions. Preserve target imagery and do
  not copy reference images or question content. Avoid changes to CSS, shared
  components, other exercises, or dependencies without authorization.
- Verify all paths, reverse paths, invalid selections, short-row navigation,
  keyboard activation, pointer endpoints/cancellation/second-touch guards, undo,
  partial checking, completion locks, reveal/reset, and content/layout invariants.
  Run targeted lint/build checks when available. Clearly distinguish handler
  checks from real browser/touch/audio/visual verification and report limitations.

# Matching — التوصيل

Use this pattern when the user requests a Matching/التوصيل exercise update.
Reference: `src/component/StudentPages/review5&6/Review6_Page2_Q2.jsx`, component
`Review6_Page2_Q2`. Adapted example:
`src/component/StudentPages/unit8/Unit8_Page6_Q2.jsx`. Exercise-specific user
instructions take precedence; keep Matching separate from the other patterns.

- Preserve target images, text, answer mapping, row order, endpoint placement,
  layout, dimensions, and click/touch interaction. Do not copy reference content
  or swap the target's image/text sides. Use `ExerciseHeader` with its own title.
- Allow choosing either image or text first, then the opposite endpoint to
  connect. Choosing the same endpoint again cancels; another endpoint on the same
  side changes the source. Show persistent source selection and a dashed line
  preview toward an available opposite endpoint on hover or keyboard focus.
- Follow the target's matching cardinality. The reference and Unit 8 example
  are one-to-one: replacing a match removes conflicting editable connections on
  either side. Do not impose one-to-one matching on a target that reuses endpoints.
- Support Tab/Shift+Tab, Enter/Space activation, arrows to move between endpoints
  on a side, and Escape to cancel. Prevent repeat/duplicate activation and global
  keyboard conflicts. Show a thick blue focus outline and accessible selected,
  result, and locked states, with a local status region.
- Keyboard source selection focuses an available opposite endpoint. After
  connecting, return focus to an available text endpoint following the reference
  pattern. Suppress audio during programmatic focus changes and cancel pending
  focus work on check/reveal/reset/unmount.
- Check complete matches against the target's existing mapping. Lock each correct
  pair, including both endpoints, and show its connecting line green. Incorrect
  pairs remain editable with the target's existing red/cross feedback. Changing
  a connection clears only results for affected editable pairs. Never remove,
  replace, or steal either endpoint of a correctly locked pair during correction.
- Show Answer reveals correct connections and locks edits. Start Again clears
  lines, results, selection, preview, completion/reveal locks, audio, and indicators.
- Connect only verified existing audio assets. Text click/touch and Enter/Space
  listen while retaining the matching interaction. Listening to locked text must
  not modify a match. Keyboard-visible focus may listen; programmatic focus must
  not trigger unexpected audio.
- For a multi-sentence text endpoint with separate verified recordings, play its
  recordings in text order as one cancellable queue. Keep the speaker badge and
  blue playback outline/background on that endpoint throughout the queue, then
  clear them on completion, replacement, error, check/reveal, or reset. Guard stale
  callbacks so cancelled audio cannot start its next recording or clear new audio.
  Stop overlap and clean up owned playback/listeners on unmount.
- Preserve line geometry and refresh endpoint coordinates after resizing and
  image/layout changes. Keep SVG lines non-interactive and hidden from screen
  readers. Inspect actual artwork before adding accurate image descriptions.
- Prefer changes only to the requested JSX; leave reference exercises, CSS,
  shared components/audio managers, and other exercise types unchanged unless
  authorized. Do not add dependencies for these routine updates.
- Verify connections from either side, replacement/cardinality, persistent locks,
  correction/rechecking, keyboard/focus/cancellation, preview/geometry, audio queue
  and speaker lifecycle, and Show Answer/Start Again. Run appropriate lint/build
  checks and report limitations. Handler checks are not real browser/touch/audio
  or visual verification; never claim an unverified check passed.

# Clock Hands — ضبط عقارب الساعة

User-provided interaction reference:
`src/component/StudentPages/unit6/Unit6_Page6_Q1.jsx`, component
`Unit6_Page6_Q1`. Read the active implementation; the file also contains an
older commented-out implementation. Use this pattern when the user requests
Clock Hands, ضبط عقارب الساعة, or an exercise based on this reference.
Do not migrate other exercises merely because this reference was registered.

- This is a clock-hand positioning activity: the student sets the hour and
  minute hands to match a sentence. Keep it separate from freehand drawing with
  Pen/Eraser/Undo/Clear and from numeric-only time entry. In particular, the
  independently approved numeric-only grading and ungraded freehand drawing in
  `WB_Unit6_Page35_Q2.jsx` remain unchanged unless the user requests conversion.
- Preserve the target's own sentences, recordings, images, book colors, clock
  appearance, dimensions, arrangement and existing mouse/touch concept. Adapt
  the interaction locally; do not copy the reference's content or redesign the
  target. Use ExerciseHeader with the target's own title and book theme.
- Provide separate accessible hour/minute hand controls (slider semantics,
  current values and descriptions), with visible rounded keyboard focus and
  practical pointer hit areas. Tab/Shift+Tab reach the hands in logical order;
  arrows adjust the focused hand, Enter/Space advance it once, and
  Backspace/Delete reset an editable clock following this reference. Prevent
  repeated Enter/Space activation and conflicts with global keyboard handlers.
- Pointer input supports mouse, touch and pen, scoped pointer capture and
  pointer identity. Prevent accidental scrolling during manipulation, handle
  cancellation/lost capture/cleanup safely, and never let a second pointer
  hijack a pending drag. Account for Book scaling when converting coordinates.
  Keep overlapping hands independently reachable. The hour hand reflects the
  minute offset as on a real clock.
- Adapt snapping to the target's time data. This reference advances hours by
  one and minutes by 30, and starts at 12:00 with touched=false. Its digital
  time is read-only and shows --:-- until adjusted. Do not assume every future
  target uses half-hour steps or accepts this initial time as an answer.
- Grade the semantic hour/minute values, never pixel accuracy or stroke shape.
  Require all clocks to be set before checking. Lock each correctly checked
  clock individually with green feedback; incorrect clocks remain editable,
  and changing one clears only its outdated error. Preserve prior correct locks
  through rechecking. Listening to a sentence never changes or unlocks a clock.
- Use verified sentence audio with click/touch and Enter/Space playback, a
  speaker indicator and the established playback effect. Keyboard-visible
  sentence focus may listen; suppress audio during programmatic focus moves.
  Guard stale audio callbacks and stop overlap, errors and owned playback on
  check/reveal/reset/unmount according to the shared audio rules above.
- Show Answer positions all hands correctly, uses green feedback and locks
  changes without awarding an earned score. Start Again clears times/touched
  flags, locks, errors, announcements of previous results, pending pointer/focus
  work and owned playback. Apply the current native Check Answer disabling and
  popup focus-return rules above; do not inherit omissions from an older
  reference implementation. Do not add custom focus styling to action buttons.
- Prefer changes only to the requested exercise JSX. Do not modify the
  reference, CSS, shared clock/audio components or global styles without
  authorization. Verify keyboard steps/wrapping, pointer capture/cancellation,
  independent locks, partial correction/rechecking, audio, reveal/reset and
  repeated successful checking, and run targeted lint/build checks. Distinguish
  handler simulations from actual browser/device, visual and audible checks.


# Latest Drag and Drop presentation rule — stable bank and sized preview

Apply this rule to every requested Drag and Drop update, including mixed
exercises, without migrating unrelated exercises. It supplements the inherited
Drag and Drop conventions above.

- During dragging, retain the source tile's exact place in the bank so other
  tiles do not shift, collapse, reorder, wrap differently, or change the bank's
  dimensions and spacing. A reserved source is presentation only: never mark a
  word used until a valid placement succeeds. Dropping back at the source,
  cancelling, or making a small drag must not consume the item.
- For @hello-pangea/dnd, follow the established local BankDragItem pattern:
  portal the actual draggable into an untransformed body/fullscreen host, keep
  an inert, aria-hidden source spacer with the original appearance and footprint,
  suppress duplicate library placeholder space during a bank-origin drag, and
  suppress sibling displacement only while preserving the bank. Spacers have no
  interactive handlers, focus stops, or draggable refs. Keep the native
  placeholder mounted when the library requires its ref.
- For dnd-kit, preserve source layout while displaying a portal DragOverlay.
  Keep the existing source and its reserved footprint; do not remove it on pickup.
  Use the target library's supported mechanism, rather than mixing the two APIs.
- The dragged text and its box must stay together at the pointer without a jump
  or displacement, including in scaled/transformed Book containers and after
  scrolling. Preserve the library's active positioning and dimensions after
  normal styles. Do not replace its top/left/transform with ordinary bank styles.
- Match the measured visible bank tile's size and typography in the portal.
  Account for font family, size, weight, line height, letter spacing, padding,
  borders, and book scaling. Use fractional computed border-box width when
  calculating scale; offsetWidth rounds and is only a fallback. Prevent unwanted
  line wrapping and retain text alignment inside the original box; never hide
  overflow to conceal missing words or change the normal bank design.
- Image previews must explicitly match the source image's visible width and
  height. Prefer the source DOM element's getBoundingClientRect at pickup over
  a sensor rect that may not yet be populated. Supply positive, target-specific
  fallback dimensions matching the normal tile (100 by 100 only when that is
  actually its normal size), including explicit preview width/height before a
  measurement is ready. Keep border-box sizing and object containment consistent
  with the source. Never let a preview inherit a global img height such as 85vh.
- Keep existing sensors, keyboard selection/placement, matching navigation,
  answer locks, audio, validation, reset/reveal, and mouse/touch behavior intact.
  Do not alter CSS, global rules, shared components, or dependencies for a local
  presentation fix without explicit authorization.
- Review all actual drag implementations in the requested scope. A click-only
  letter ordering activity does not need a drag-preview change merely because
  it shares the Drag and Drop reference conventions.
- Check pickup, small/cancelled drags, valid/invalid drops, bank stability,
  text/image containment, pointer alignment, scroll, zoom, and fullscreen. Run
  targeted lint and an available build. Report real browser/device checks
  separately from handler/style simulations; never claim an unverified mouse,
  touch, visual, or audible check passed.

# Grade 4 local references — references established with the user

All paths in this section are relative to Right-G4, not Right-G2. These local
references supplement the inherited agreements. Apply them to future requested
work; registering a reference does not authorize migrating other components.
Always inspect the current implementation and adapt it to the target's own
content, colors and layout. Preserve all earlier rules unless a later explicit
user instruction overrides them. Read the reference rather than copying its
entire component. Do not treat an existing reference defect as a new requirement.

## Question Audio Player — مشغّل صوت السؤال

Reference: `src/component/QuestionAudioPlayer.jsx`.

- Keep `forwardRef` and the existing `src`, `captions = []`,
  `stopAtSecond = null`, `stops = []`, `onTimeUpdate`, and `onPlay` props. Add or
  pass `pageId` without removing or repurposing those props or the audio ref.
- Persist playback position under `audio-position-${pageId}`. Use a stable,
  specific ID with the correct `sb`/`wb` prefix. Reading sections may use
  `sb_unit2_page11_reading`, for example. Do not silently rename existing IDs
  and thereby discard learners' saved positions. Without pageId, retain usable
  playback without writing an ambiguous shared storage key.
- Save progress during playback, pause, seeking, pagehide and cleanup. Restore
  a valid saved time in a paused state; preserve initial playback behavior for a
  fresh recording. Guard invalid/out-of-range saved values and unavailable
  storage. Do not let an old source's cleanup overwrite a different source's
  saved position with zero. Clear saved progress on natural completion.
- Keep Play/Pause and an explicit Restart button in the existing purple
  `main-audio-controls` group with `main-audio-btn` styles. Restart starts at
  zero, clears the saved position and re-arms both the single automatic stop
  and the stop checkpoints. Exercise Start Again remains separate and must not
  invoke this restart or rewind the player.
- Retain stopAtSecond and stops semantics when adding persistence or restarting.
  Resuming before a future stop must still reach that stop. A stop already
  passed in the saved recording must not immediately stop resumed playback.
  Stop monitors must remain usable after pausing for another sound; manage and
  clean up owned timers safely. Preserve callback behavior and register playback
  before playing when registration can pause the previously active element.
- Caption toggle, Play/Pause, Restart and Settings are native buttons with
  descriptive accessible names. Tab/Shift+Tab follow DOM order; Enter/Space
  activate once. Suppress key repeat, duplicate native/manual clicks and global
  key conflicts without trapping Tab. Show rounded visible focus on player
  controls, scoped to this player.
- Keep `.caption-inPopup` out of sequential keyboard navigation with
  `tabIndex={-1}`, including the browser's automatic focus on scroll containers.
  From the caption toggle, Tab proceeds directly to Play/Pause. Keep captions
  readable and their existing display/scrolling behavior; do not make them
  inert or hide them from assistive reading merely to remove a Tab stop.
- Preserve the existing volume/progress controls, colors and dimensions. Use
  existing styles; do not copy unrelated controls or redesign the player.

## Vocabulary Keyboard — مفردات بالكيبورد

Reference: `src/component/StudentPages/Vocabulary.jsx`.

- The vocabulary words follow QuestionAudioPlayer in DOM/Tab order. After the
  player controls (and any open Settings control), Tab reaches the first word,
  then follows the existing displayed word/column order. Shift+Tab reverses it.
- Each interactive word has button semantics, tabIndex 0, a meaningful name,
  and a clearly visible thick blue focus outline with its existing rounded
  corners. Use local selectors; do not change the cards' normal design.
- Click/touch and Enter/Space play that word's existing timing once. Ignore
  activation repeats and suppress key conflicts; Tab alone does not play audio.
  Preserve actual recordings, word-to-timing mapping and normal pointer behavior.
  Do not add automatic focus jumps when audio finishes.
- Pass the vocabulary's own stable pageId through to QuestionAudioPlayer. Keep
  the player ref and existing onTimeUpdate linkage used by active-word feedback.

## Reading Highlight — تظليل القراءة المتزامن

Shared reference: `src/component/StudentPages/ReadingSection.jsx`.
Primary adapted example:
`src/component/StudentPages/unit1/page5_ReadingSection_U1.jsx`.
Additional local examples: `src/component/StudentPages/unit2/ReadingSection_U1.jsx`
through `src/component/StudentPages/unit10/ReadingSection_U1.jsx`.

- Keep the reading as its original image/SVG; do not replace its text, fonts,
  image, layout, headings or colors to implement highlighting.
- Inspect the actual artwork used by the `image` prop. Do not infer it from an
  import name: Unit 10, for example, uses a different image than `imgReading`
  for its reading body. Some SVG text consists of glyph paths, not text nodes.
- Use optional `sentenceHighlights` entries shaped as
  `{ captionIndex, boxes: [{ x, y, width, height }] }`. Box coordinates are
  percentages of that specific full reading image. Measure each unit's own
  text positions; do not reuse another unit's coordinates or guess them.
- Reuse existing verified captions/times. Match each highlighted group to
  `captions[captionIndex]` with `start <= currentTime && currentTime < end`.
  Receive currentTime through QuestionAudioPlayer's existing onTimeUpdate.
  Highlighting follows playback and seeking in either direction, with no
  highlight outside mapped ranges or in timing gaps. Reset stale highlighting
  when the source/pageId changes.
- A caption grouping several sentences is highlighted as a group using its
  supplied timing. Do not fabricate finer sentence timestamps or claim precise
  sentence alignment when only grouped timing is available. Do not infer audio
  boundaries from text length. Report missing or unsuitable timing/artwork.
- Overlay translucent yellow rectangles above the original image, with multiply
  blending to retain readable text. Use several rectangles for a group wrapping
  across lines. Match the full image with a relative wrapper and a percentage
  SVG (`viewBox="0 0 100 100"`, `preserveAspectRatio="none"`). This keeps the
  overlay aligned under resizing and Book scaling without changing layout.
- The overlay is decorative and non-interactive: aria-hidden, focusable=false,
  pointer-events:none, and no Tab stops. It must not intercept mouse/touch,
  scrolling or keyboard navigation. Existing consumers without mappings keep
  their previous appearance and interaction.
- Preserve captions, recordings, stopAtSecond, question/header content and other
  reading/comprehension sections. Pass a unique, stable pageId for each reading.
- Verify every mapping against the actual glyphs/lines, multiline boundaries,
  caption transitions/gaps, seek/reset, scaling and full image bounds. A raster
  geometry preview or simulated currentTime is not a live audible timing test;
  distinguish these checks explicitly in the report.

## Comprehension A — True/False بالكتابة

Reference: `src/component/StudentPages/unit1/page5_ComprehensionA.jsx`.

- This reference retains text entry for True/False. Do not convert it into Select,
  radio buttons, a dropdown or Drag and Drop without the user's instruction.
- Keep existing statements, answer data, input pill shapes, dimensions, colors,
  error badges and exercise layout. Add a meaningful label to each answer field
  and a thick blue rounded focus outline locally on the fields.
- Tab/Shift+Tab navigate editable fields and the exercise buttons naturally.
  Space inside a field remains normal text input. Suppress global Enter/Space
  handlers without preventing text entry; do not invent an Enter-to-check or
  Enter-to-select action on the fields.
- Replace non-keyboard action divs with native type=button controls, retaining
  their icon/card appearance. Reset/Start Again, Show Answer and Check Answer
  support Enter/Space once, click and touch; ignore repeated activation. Do not
  add custom focusClass/rings/selectors to those exercise action buttons.
- Keep individual correct-answer locks and editable wrong answers. Follow the
  inherited completion rule: Check Answer has a native disabled state plus a
  handler guard and not-allowed cursor after complete checked success or reveal;
  partial attempts remain checkable and Reset restores availability.
- Before showing success that disables the focused Check button, establish a
  stable enabled return-focus target inside the exercise (Reset in the local
  reference), so dismissing the score alert does not lose keyboard focus.

## Comprehension B — إكمال بالكتابة من بنك كلمات

Reference: `src/component/StudentPages/unit1/page5_ComprehensionB.jsx`.

- Retain sentence-completion by typing and the existing static word bank. Do not
  make bank words selectable/draggable or invent word audio without instruction.
- Apply the same native action-button, Tab/Shift+Tab, Enter/Space activation,
  repeat suppression, accessible field labels, locks, completion disabling and
  success-return-focus conventions as Comprehension A.
- Preserve sentence fragments, answers, bank order, underline-style fields and
  layout. Keep focus styling local and rounded; a small radius may be applied
  only to the focused field's outline presentation when its normal shape has no
  rounded corners. Do not redesign the normal input borders.

These two comprehension references establish keyboard and completion behavior.
They do not override the inherited green correct/revealed-answer feedback rule;
do not copy inconsistent older result styling as a new convention. Do not
silently change a text-entry exercise's interaction concept based on a Select
or Drag and Drop reference.

## Book Navigation — تنقّل الكتاب والعرض المتجاوب

Reference: `src/component/Book.jsx`.

- Keep each tab's saved page index independent in localStorage. Restoring a tab
  must not be followed by setPageIndex(0) in a tab-change effect. Preserve saved
  progress and the tab-change handler's restoration.
- Workbook unit navigation follows goToPage's spread alignment, as in the supplied
  reference. A unit's opening page has an odd page number and an even zero-based
  array index, displayed on the right. In spread mode, the stored left-page
  index may be the preceding page; do not confuse it with the target unit page's
  own index. Single/mobile mode opens the target page directly. Do not change
  other tabs' unit mapping or page numbering for this Workbook-specific rule.
- At the current breakpoint (width <= 1200px), use Single automatically. Crossing
  back above it restores Spread automatically for Student/Workbook/Teacher;
  Posters (`flash`) remains Single. Do not require a manual button press.
- React to isMobile as well as activeTab when selecting the view mode. Keep zoom
  and pan resets tied to tab changes, not viewport-size changes. Preserve the
  current page within its spread and use current state when aligning pages.
- Do not overwrite manual display choices on every resize within the same size
  category. Preserve layout, controls and native navigation/accessibility.

## Verification boundaries for these references

- Run proportionate targeted lint/build and behavior checks for requested code
  changes; inspect for unrelated edits. No dependency/framework additions for
  routine updates. Do not modify globals, reference exercises or other units
  merely because a reference is registered.
- Existing unused `paragraphs` declarations in reading callers were reported as
  baseline lint errors during the highlight work. Do not claim lint passed when
  such findings remain, or remove unrelated content just to conceal them.
- The established checks included render/handler/effect simulations and local
  raster inspection of SVG highlight geometry. Live browser, touch, audible
  synchronization and screen-reader checks were unavailable at that time. These
  remain verification limitations, not evidence that those behaviors passed.


## Written answers — إجابات الكتابة

- Keep the learner's typed answers visible after checking, including incorrect
  attempts. Normalize only for comparison; never replace the displayed input
  with normalized text. Show Answer may explicitly replace it with the model.
- Accept reasonable capitalization, repeated/leading/trailing whitespace, straight
  or curly apostrophes and optional sentence punctuation when those differences
  are not the skill being assessed. Normalize both the model and submitted answer.
  Preserve meaningful word boundaries, word order, subjects and negation; do not
  accept a different answer merely by stripping all spaces or letters. Keep each
  exercise's approved alternative answers. If punctuation/case is itself being
  assessed, follow that exercise's own reference rather than ignoring it.
- Text fields keep normal typing, including Space. Stop conflicting ancestor
  Enter/Space shortcuts without preventing text entry; Tab/Shift+Tab follow DOM
  order. Do not invent Enter-to-submit. Use labelled fields and local rounded
  focus outlines; native action buttons support Enter/Space once without repeats.
- Local grammar writing examples: StudentPages/unit1/page6_GrammarB.jsx and
  page6_GrammarC.jsx. Preserve prompts, layout, original input underlines and
  button appearance; correct/revealed answers share green underline feedback.
  Incorrect answers stay editable; correct answers lock individually. Apply the
  existing completion-disable and stable success-return-focus rules.
- Read and say substitution: user-approved local reference is
  StudentPages/unit1/page6_GrammarA.jsx. Its six replacement words are buttons;
  click/touch or Enter/Space replaces only the highlighted word in that example.
  Tab follows visual order, activation repeats are ignored, focus stays on the
  chosen word, and a local status announces the completed example. Preserve the
  original default examples, numbering and layout. No invented audio or grading.
  Other static oral activities still need an agreed action before conversion.


## Grade 4 Unit 1 exercises — Pages 8 and 9

- Main-page keyboard launcher examples: StudentPages/unit1/Page8.jsx and Page9.jsx.
  Preserve the positioned outer div, SVG/image dimensions and existing popup
  startIndex. Give the SVG button semantics, an accessible name, tabIndex 0 and
  rounded visible focus. Enter/Space open once; ignore repeats and suppress
  conflicting ancestor shortcuts. Keep click/touch opening and native Tab order.
- Writing examples: Page8_Q1.jsx (picture naming from a static word bank),
  Page8_Q2.jsx and Page9_Q2.jsx (unscramble by typing). Apply Written answers rules
  without converting these writing exercises to Drag and Drop or Select.
  Feedback comes from the latest checked result, not
  from typing a correct value: an unchecked correction must stay editable.
- Unique Number Selectors — اختيار أرقام بدون تكرار: user-approved example is
  Page8_Q3.jsx. Each item has one labelled native select, with numbers 1–5 and
  a dash option to clear an editable answer. Disable a number in other selectors
  while it is assigned; also reject duplicates and out-of-range values in the
  handler. Keep the current number visible/available in its own selector.
  Clearing/changing an editable answer releases its old number. Correct checked
  answers stay locked and reserve their numbers. Incorrect answers can be
  cleared to exchange two numbers without moving another answer automatically.
- Preserve native select keyboard behavior (Tab/Shift+Tab, Enter/Space and arrow
  keys); stop conflicting Enter/Space ancestor handlers without preventing the
  select's default action. Keep focus on the selector after a change rather than
  advancing during arrow selection. Preserve original box dimensions, colors,
  green/red result feedback and rounded blue focus. Show Answer fills the unique
  correct mapping and locks it; Start Again clears it and releases all numbers.
- Page8_Q3 retains its original recording, captions and stopAtSecond=6. Its
  player ID is sb_unit1_page8_q3. Reset never seeks/remounts that player.
- Picture Select example: Page9_Q1.jsx. Each sentence has two picture buttons;
  preserve its tick/cross selection concept, image pairing and answer mapping.
  Use verified artwork descriptions in the buttons' accessible names. Keep
  selected-state blue feedback, red/green checked feedback, independent correct
  locks and editable incorrect choices; reveal uses the same green feedback.
- These examples use ExerciseHeader with their own original titles/letters and
  local native action buttons retaining the shared Button appearance. This
  enables real disabled completion state without changing the shared component.
- Page8_Q4.jsx is not active in LessonData and was left unchanged in this work.


## Grade 4 Unit 2 — behavior-only adaptation from Unit 1

- User scope: review the whole unit, excluding Reading_Unit2_Page1.jsx and
  Reading_Unit2_Page2.jsx. Preserve existing styles, header markup, assets,
  recordings, captions, timestamps and layout; add only the established keyboard,
  focus, selection, validation and checked-answer state behavior locally.
- Unit2_Page1 through Unit2_Page6 expose their existing click actions to Tab,
  Enter and Space, with repeat suppression and scoped rounded focus. Keyboard
  activation dispatches the same click; do not duplicate navigation/audio logic.
  Vocabulary's shared keyboard support is reused with sb_unit2_page10_vocabulary.
- ReadingSection_U1 already has the unit-specific reading highlights and player
  ID; page7_WritingSection_U1 is a static wrapper. Both were reviewed and retained.
- ComprehensionA/B, GrammarC, page7_WritingA/B and the active written exercises
  retain typing and follow the written-answer reference. Keep raw typed text
  visible; compare normalized case/spacing/punctuation and lock checked correct
  answers individually. Correction clears only that field's stale feedback.
- page7_WritingA uses renderInput as a render helper, rather than defining an
  Input component inside the parent. This preserves the input DOM/focus while
  typing. Keep its original actual widths/styles; do not copy unused width props
  into new styling or redesign the email.
- GrammarA follows Unit 1's oral substitution using Unit 2's own phrases.
  GrammarB and Unit2_Page5_Q3 follow Select behavior, preserving their circle and
  tick/cross concepts respectively. Wrong selections stay editable; correct
  selections lock, and Show Answer uses the same green feedback.
- Player IDs: sb_unit2_page12_grammar, sb_unit2_page14_q3 and sb_unit2_page15_q1.
  Exercise reset never seeks/remounts these players. Existing recordings and
  captions are retained, even when pre-existing content needs separate review.
- Unit2_Page5_Q4 is inactive in LessonData and was left unchanged. No CSS file,
  global style, shared component or unrelated unit is changed by this adaptation.


## Grade 4 Review 1 and 2 — question behavior references

- The twelve question components in StudentPages/review1&2 retain their own
  layout, headers, images, answer data and recordings. Main-page components,
  CSS and shared controls remain outside this question-only update.
- Written questions follow Unit 1/2 writing behavior: labelled fields, native
  typing including Space, stable DOM/focus, normalized comparison with raw text
  kept visible, correct-answer locks and independently editable wrong fields.
  Review1_Page2_Q2 keeps separate question/answer field IDs and the original
  per-field score. Review2_Page1_Q1 remains a single-letter written match; do
  not turn it into line Matching, Drag and Drop or unique selectors by assumption.
- Review2_Page1_Q3 uses a static matching diagram as a writing prompt; keep it
  static rather than inventing new line interactions.
- Review1_Page1_Q3 follows Select on the original in-paragraph will/won't
  options. Preserve pill shapes, option order and text fragments. Correct/reveal
  feedback is green; wrong choices stay editable; only selected options get
  result feedback. Its player ID is sb_review1_page1_q3.
- Review2_Page2_Q1 is the existing tick/cross cycling picture Select: initially
  empty, first activation sets tick left/cross right (A), then each activation
  alternates A/B. Click/touch and Enter/Space perform the same single step.
  Accessible names describe verified artwork and current tick/cross position.
  Preserve the original correctSide mapping, symbol placement and glyph colors;
  checked/revealed correct pictures get a green outline, wrong ones a red one.
  Lock each correct picture, leaving other pictures editable. Its player ID is
  sb_review2_page2_q1; reset never rewinds/remounts either review audio player.
- All Check buttons use actual disabled state and a handler guard after full
  checked success/reveal; Reset re-enables them. Keep action-button native focus
  styling. Before success, establish an enabled in-exercise return-focus target.


## Review 1&2 main-page keyboard launchers

- The user subsequently requested keyboard activation for every launcher on
  Review1_Page1, Review1_Page2, Review2_Page1 and Review2_Page2. Follow the Unit 2
  main-page reference: SVG button semantics and names, tabIndex 0, Enter/Space
  through the existing click action once, repeat suppression, native Tab order
  and scoped rounded blue focus. Preserve wrappers, positions, dimensions,
  images, CSS files and existing popup startIndex values.

## ExerciseHeader scope — latest user correction

- Use ExerciseHeader only for exercise components on the final two exercise pages
  of each unit. It must not be used in Reading, Writing or Grammar sections or
  their child components, even when those children contain questions/activities.
  Classify by the section's actual location and purpose, not merely by filename.
- In Reading, Writing and Grammar components, retain their original section and
  activity heading markup and visual style. Do not replace those headings with
  ExerciseHeader during future keyboard/accessibility or answer-state updates.
- This correction overrides the earlier blanket requirement to use ExerciseHeader
  in every question, and any conflicting header instructions/examples elsewhere
  in this file, including the previous Unit 3 adaptation summary.
- Where ExerciseHeader is applicable, preserve the target's own sectionLetter,
  questionNumber and title. Keep an existing/approved subtitle only; never invent
  one. Preserve the rest of the design and do not change the shared component.
- This request registers the rule. Do not remove existing usages or migrate other
  components retroactively without a requested implementation scope.

## Unordered sentence answers — جمل صحيحة بأي ترتيب

- User-approved example: StudentPages/review1&2/Review2_Page1_Q3.jsx. Accept the
  four existing target sentences in any answer row, comparing against every
  target's approved aliases with the existing normalization. Preserve typed text
  and row positions; do not reorder or rewrite the learner's answers on Check.
- Count each distinct target sentence once, including equivalent case/spacing/
  punctuation variants. On first checking, repeated sentences count only in the
  first matching row; other repeats stay incorrect/editable. Reserve matches for
  previously locked rows before evaluating editable rows, so an earlier row can
  never steal credit from a correct locked answer further down the exercise.
- Preserve individual green locks, editable wrong/repeated answers, rechecking,
  native Check disabling on completion, canonical Show Answer with no new score,
  Reset, keyboard behavior, ExerciseHeader, artwork and existing layout.
- This is an exercise-specific grading rule. Do not make other writing questions
  order-independent or permit arbitrary grammatically correct sentences without
  the user's instruction.


## Grade 4 story reading pages — keyboard access

- User-approved targets: StudentPages/unit2/Reading_Unit2_Page1.jsx and Page2.jsx
  (the latter's full filename is Reading_Unit2_Page2.jsx). Their earlier exclusion
  was lifted for this keyboard-only update. Interaction reference: Grade 2
  unit6/Reading_Unit6_Page1.jsx and Reading_Unit6_Page2.jsx; adapt to Grade 4's
  existing single recording and startFrom/stopAt slices, rather than copying
  Grade 2's separate audio files or context implementation.
- Each existing reading region and audio/video launcher has button semantics,
  a meaningful name, tabIndex 0 and local rounded visible focus. On Page1, put
  the existing top audio/video launchers before the reading regions in DOM/Tab
  order; on Page2 traverse the three reading regions in their displayed order.
  Tab/Shift+Tab never play or change audio. Enter/Space dispatch the
  existing click once, suppress repeats and conflicting ancestor key handlers.
  Keep current click/touch actions and playback highlighting; aria-pressed on
  a reading region reflects its active playback state, not focus alone.
- Keep page images, region coordinates, styles, recordings, captions, slice
  boundaries and popup-player props unchanged in a keyboard-only update. Do not
  fabricate corrected timings or replace local/shared audio machinery. Any timing
  correction needs verification against the actual recording and printed text.


## Even-unit story pages — keyboard adaptation coverage

- Apply the approved Unit 2 story-reading keyboard pattern to both Reading_UnitN
  pages at the ends of Units 4, 6, 8 and 10. Units 2/4/6/8/10 now use this pattern.
- Adapt to the actual number of regions on each page (some have four, not three).
  Preserve the original array/reading order, including side-by-side story panels
  whose text starts at different heights. First-page audio/video launchers come
  before reading regions in DOM/Tab order, without positive tab indices.
- Region labels identify the passage and actual printed page number; active
  aria-pressed reflects playback. Focus alone never starts playback. Enter/Space
  dispatch the existing click once, ignoring repeats and stopping key conflicts.
- Keep all original images, audio/video imports, captions, slice boundaries,
  coordinates, context handling and popup props. Do not correct suspicious video
  mappings or timestamps in a keyboard-only task without the user's instruction.
  Leave shared components and CSS files unchanged; scope focus-only styles locally.

## Written-response field labels — future unit work

- In every requested writing exercise/component update, provide one clearly
  identified text field or answer area for each response required by the existing
  exercise. Adapt descriptions to that question; distinguish question/answer
  fields and separate blanks, without revealing correct answers.
- Preserve the existing field count, response structure, dimensions and layout
  when they already provide the required answer areas. Do not convert other
  exercise types to typing or add redundant inputs.
- Provide a persistent accessible name with an appropriate associated label or
  aria-label. A short task-specific placeholder may supplement it, but must not
  be the only accessible name because it disappears during typing.
- Use a descriptive native title for a mouse-hover hint when no visible label is
  added. This is supplementary; do not rely on hover/title for keyboard, touch
  or screen-reader access. Keep field names distinct within each exercise.
- Reference the approved labeling adaptation in StudentPages/unit1,
  StudentPages/unit2 and StudentPages/review1&2: short placeholders plus contextual
  aria-label and title. Preserve typed answers, keyboard behavior, grading,
  normalization, locks, reveal/reset, audio and existing styles.
- Apply these conventions when working on Unit 3 and subsequent requested units;
  do not migrate unrelated components without a request.

## Image alternative text — every requested component update

- Every image in a requested question, exercise or component must have appropriate
  alternative text. Inspect actual artwork before writing a meaningful alt;
  never infer its content from filenames, variables or the expected answer.
- Informative img elements need concise, accurate alt text describing the relevant
  visual information. Purely decorative or redundant images use alt=""; hide
  decorative icons from assistive technology when appropriate.
- Images inside named buttons/links should not repeat the control's accessible
  name unnecessarily. Inline SVG and SVG image elements need an appropriate
  accessible name (for example title with aria-labelledby or aria-label), or
  aria-hidden when decorative; an unsupported alt attribute alone is insufficient.
- For CSS background artwork that conveys required information, provide an
  equivalent accessible description locally. Preserve artwork, styles and layout.
- If artwork cannot be visually verified, report exactly which asset needs review
  instead of inventing a description. Apply during requested work; this rule alone
  does not authorize a project-wide image migration.
## Grade 4 Unit 3 — approved adaptation and deferred content

- Unit3_Page1 through Unit3_Page6 follow the existing main-page keyboard launcher
  reference. Preserve their original popup indices, coordinates and audio slices.
- Written activities and personal writing follow the Unit 1/2 writing references:
  field-specific aria-label/title/placeholder, normal typing and stable field DOM,
  normalized comparison on both sides, retained raw answers, per-field correct
  locks and green reveal, correction of wrong answers, and actual disabled Check
  after checked completion/reveal. Personal writing remains ungraded.
- GrammarB uses renderInput as a render helper, preserving the original per-call
  widths and avoiding a nested component that remounts fields during typing.
- User-corrected GrammarA oral substitution examples: He had a whistle; choices
  motorcycle, rabbit, computer. Did they have a house; choices car, swimming pool,
  boat (retain the existing word boat). Replace only the noun in the chosen row;
  use the established Unit 1/2 keyboard substitution action, without grading.
- GrammarC uses the Select reference with its own pictures/options. User approved
  retaining page7_WritingA's six-item scoring: selecting or not selecting each
  item is evaluated; correctly unchecked items lock as well as checked ones.
- ComprehensionB follows Matching with the original image/word ordering, source
  selection from either side, keyboard focus to the opposite side, dashed preview,
  one-to-one conflict replacement restricted to editable pairs, individual green
  locks, pointer identity/capture/cancellation and geometry under Book scaling.
  No new recordings or word-audio mappings were invented.
- Verified image descriptions are local to the modified Unit 3 components. Keep
  styles/CSS, recordings, captions, slice boundaries and shared components intact.
- Player IDs: sb_unit3_page22_vocabulary, sb_unit3_page24_grammar,
  sb_unit3_page5_q3. Exercise reset does not seek/remount the instruction players.
- Explicitly deferred by the user: Unit3_Page6_Q2 (country answers do not match
  the activity pictures), changing the third answer key in Unit3_Page5_Q2 (great
  in the scrambled prompt versus quite in the answer), and adding optional image
  alt props to shared ReadingSection.jsx. Do not change these without renewed
  instruction. ReadingSection_U1's existing highlighting/audio remains unchanged;
  the shared image-alt limitation was reported.
- Verification used isolated render/handler/pointer simulations and actual asset
  inspection, plus lint/build. These are not live browser, touch-device, audible
  playback or screen-reader verification.
## Unit3_Page6_Q2 — deferral lifted by the user

- The user supplied the current question/answer data and explicitly authorized
  updating Unit3_Page6_Q2 using the established writing reference. Its earlier
  deferral is lifted. Keep the existing image variable names imgJapan, imgRussia,
  imgUK and imgAus and their paths, even though their names do not describe the
  actual artwork. Preserve all current prompts, accepted answers and model text.
- Apply field-level writing behavior and ExerciseHeader, since this is on the
  unit's final two exercise pages. Image alt descriptions come from the actual
  bicycle, sailboat, doll and capped-child artwork, not the variable names.
- Other deferred content and shared ReadingSection.jsx remain outside this update.
## Grade 4 Unit 4 and Review 3&4 — approved adaptation

- Unit 4 and Review 3&4 follow the established Unit 1/2/3 references for normal
  writing, Select, mixed Select/writing, oral substitution, Matching, standalone
  Word Search and main-page keyboard launchers. Preserve their own data, assets,
  captions, audio slice boundaries, coordinates, layout, CSS and interaction types.
- Keep original Reading/Writing/Grammar headings. ExerciseHeader is limited to
  end-of-unit questions and review questions, using isReview for the latter.
- Every scoped AudioWithCaption and QuestionAudioPlayer usage passes a literal,
  stable sb-prefixed pageId identifying its owner. AudioWithCaption already accepts
  pageId; no shared-player change is required. Keep Vocabulary's own distinct ID.
  Exercise resets do not seek/remount the instruction player or erase saved time.
- Unit4 GrammarA replaces all highlighted words in one example at a time, using
  its existing sets of comparison terms, without grading or adding recordings.
- Unit4 GrammarB and Review4_Page1_Q1 keep Select and typed answers independently
  graded and locked, preserving their original score out of eight. A correct
  selection never locks its incorrect typed completion, or the reverse.
- User explicitly approved GrammarC's existing cycle: no mark, underline, circle,
  no mark. Preserve its group score: both sentence marks must be right to lock
  that group. Wrong groups remain editable. Keyboard activation cycles once.
- Review4_Page1_Q2 follows standalone Word Search, retaining its exact grid,
  seven paths and displayed word list. Accept forward/reverse exact paths,
  including intersections. Use one roving Tab stop, arrows, endpoint Enter/Space,
  Escape cancellation and Backspace undo. Support pointer drag and two taps with
  pointer identity/capture/cancellation. Partial checking remains editable;
  full success/reveal locks and uses green feedback. No word recordings invented.
- Review4_Page2_Q2 follows Matching with original sentence/name sides, displayed
  order and mapping. Either side may start a match; show source selection and a
  dashed hover/focus preview. Protect both endpoints of correct pairs; clear only
  affected editable results during replacement. Scale line coordinates locally.
- All graded exercises disable native Check plus handler guards only after
  checked full success or reveal. Keep action buttons' existing native focus.
  Before success alerts, focus an enabled in-exercise return target. Normalizing
  writing must preserve raw displayed text, word boundaries and negation.
- Local image descriptions were based on actual artwork inspection. Shared
  ReadingSection.jsx image-alt support remains deferred by the user's earlier
  instruction. The already adapted story-reading keyboard behavior is retained;
  only its scoped AudioWithCaption usage needed a pageId in this update.
- Verification uses isolated render/handler/pointer simulations and asset
  inspection, plus targeted lint and build. Do not claim real browser, touch,
  audible playback, screen-reader or visual layout checks from those simulations.