document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <svg class="svg-icons" aria-hidden="true">
    <symbol id="icon-letter" viewBox="0 0 128 128">
      <rect x="18" y="36" width="92" height="62" rx="14" fill="#fffaf0" stroke="#2f2f2f" stroke-width="7"/>
      <path d="M24 44L64 74L104 44" fill="none" stroke="#2f2f2f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24 92L55 66" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <path d="M104 92L73 66" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <path d="M64 88C58 82 44 72 44 60C44 52 50 47 57 47C61 47 64 50 64 54C64 50 68 47 72 47C79 47 84 52 84 60C84 72 70 82 64 88Z" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="26" cy="26" r="5" fill="#ffe66d" stroke="#2f2f2f" stroke-width="4"/>
      <circle cx="101" cy="102" r="4" fill="#7ddfff" stroke="#2f2f2f" stroke-width="4"/>
    </symbol>

    <symbol id="icon-music" viewBox="0 0 128 128">
      <path d="M73 24V78" fill="none" stroke="#2f2f2f" stroke-width="8" stroke-linecap="round"/>
      <path d="M100 32V87" fill="none" stroke="#2f2f2f" stroke-width="8" stroke-linecap="round"/>
      <path d="M73 24L100 31" fill="none" stroke="#2f2f2f" stroke-width="8" stroke-linecap="round"/>
      <path d="M76 25L103 32L103 46L76 39Z" fill="#7ddfff" stroke="#2f2f2f" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="58" cy="80" rx="18" ry="13" transform="rotate(-18 58 80)" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="6"/>
      <ellipse cx="86" cy="91" rx="18" ry="13" transform="rotate(-18 86 91)" fill="#ffe66d" stroke="#2f2f2f" stroke-width="6"/>
      <circle cx="30" cy="36" r="6" fill="#fffaf0" stroke="#2f2f2f" stroke-width="4"/>
    </symbol>

    <symbol id="icon-cute" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="43" fill="#ffd6e8" stroke="#2f2f2f" stroke-width="7"/>
      <circle cx="48" cy="57" r="7" fill="#2f2f2f"/>
      <circle cx="80" cy="57" r="7" fill="#2f2f2f"/>
      <circle cx="45" cy="73" r="8" fill="#ff8fc6" opacity="0.75"/>
      <circle cx="83" cy="73" r="8" fill="#ff8fc6" opacity="0.75"/>
      <path d="M56 78C59 84 69 84 72 78" fill="none" stroke="#2f2f2f" stroke-width="5" stroke-linecap="round"/>
      <path d="M38 32L28 18" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <path d="M90 32L100 18" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <path d="M27 91C18 83 17 71 25 65C33 72 35 84 27 91Z" fill="#7ddfff" stroke="#2f2f2f" stroke-width="5" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-calendar" viewBox="0 0 128 128">
      <rect x="22" y="25" width="84" height="86" rx="14" fill="#fffaf0" stroke="#2f2f2f" stroke-width="7"/>
      <path d="M22 48H106" fill="none" stroke="#2f2f2f" stroke-width="7"/>
      <rect x="22" y="25" width="84" height="27" rx="14" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="7"/>
      <path d="M43 17V34" fill="none" stroke="#2f2f2f" stroke-width="7" stroke-linecap="round"/>
      <path d="M85 17V34" fill="none" stroke="#2f2f2f" stroke-width="7" stroke-linecap="round"/>
      <circle cx="43" cy="68" r="5" fill="#7ddfff" stroke="#2f2f2f" stroke-width="3"/>
      <circle cx="64" cy="68" r="5" fill="#ffe66d" stroke="#2f2f2f" stroke-width="3"/>
      <circle cx="85" cy="68" r="5" fill="#7ddfff" stroke="#2f2f2f" stroke-width="3"/>
      <circle cx="43" cy="89" r="5" fill="#ffe66d" stroke="#2f2f2f" stroke-width="3"/>
      <path d="M76 96C70 91 60 84 60 75C60 69 65 65 70 65C73 65 76 67 77 71C78 67 82 65 85 65C91 65 95 69 95 75C95 84 82 91 76 96Z" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="4"/>
    </symbol>

    <symbol id="icon-clock" viewBox="0 0 128 128">
      <circle cx="64" cy="66" r="43" fill="#fffaf0" stroke="#2f2f2f" stroke-width="7"/>
      <circle cx="64" cy="66" r="5" fill="#2f2f2f"/>
      <path d="M64 66V42" fill="none" stroke="#2f2f2f" stroke-width="7" stroke-linecap="round"/>
      <path d="M64 66L83 77" fill="none" stroke="#2f2f2f" stroke-width="7" stroke-linecap="round"/>
      <path d="M36 23L24 35" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <path d="M92 23L104 35" fill="none" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/>
      <circle cx="64" cy="18" r="6" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="4"/>
      <circle cx="34" cy="66" r="4" fill="#ff7eb6"/>
      <circle cx="94" cy="66" r="4" fill="#ff7eb6"/>
      <circle cx="64" cy="96" r="4" fill="#ff7eb6"/>
    </symbol>

    <symbol id="icon-ice" viewBox="0 0 128 128">
      <path d="M43 63H85L64 115Z" fill="#f4b76e" stroke="#2f2f2f" stroke-width="7" stroke-linejoin="round"/>
      <path d="M53 82L75 68" fill="none" stroke="#2f2f2f" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
      <path d="M58 97L80 83" fill="none" stroke="#2f2f2f" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
      <circle cx="49" cy="56" r="20" fill="#ff8fc6" stroke="#2f2f2f" stroke-width="7"/>
      <circle cx="79" cy="56" r="20" fill="#7ddfff" stroke="#2f2f2f" stroke-width="7"/>
      <circle cx="64" cy="39" r="22" fill="#fff0a8" stroke="#2f2f2f" stroke-width="7"/>
      <circle cx="57" cy="32" r="4" fill="#ff7eb6"/>
      <circle cx="72" cy="43" r="4" fill="#ff7eb6"/>
    </symbol>

    <symbol id="icon-heart" viewBox="0 0 128 128">
      <path d="M64 109C54 99 22 76 22 49C22 32 35 24 48 24C56 24 62 29 64 36C66 29 72 24 80 24C93 24 106 32 106 49C106 76 74 99 64 109Z" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="7" stroke-linejoin="round"/>
      <path d="M43 42C38 47 37 56 40 64" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
    </symbol>

    <symbol id="icon-laptop" viewBox="0 0 128 128">
      <rect x="28" y="28" width="72" height="52" rx="10" fill="#7ddfff" stroke="#2f2f2f" stroke-width="7"/>
      <rect x="37" y="39" width="54" height="30" rx="6" fill="#fffaf0" stroke="#2f2f2f" stroke-width="5"/>
      <path d="M19 87H109L100 106H28Z" fill="#fff0a8" stroke="#2f2f2f" stroke-width="7" stroke-linejoin="round"/>
      <path d="M51 95H77" fill="none" stroke="#2f2f2f" stroke-width="5" stroke-linecap="round"/>
      <path d="M64 59C58 54 48 48 48 39C48 33 53 29 59 29C62 29 64 31 64 35C64 31 67 29 70 29C76 29 80 33 80 39C80 48 70 54 64 59Z" fill="#ff7eb6" stroke="#2f2f2f" stroke-width="4"/>
    </symbol>
  </svg>
  `
);
