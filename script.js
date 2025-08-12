/* JS toggle logic: swaps svg visually (we keep same svg and rotate) and toggles dropdown.
   If you want to replace the SVG paths entirely with the specific up-arrow svg, we can swap innerHTML.
*/

document.querySelectorAll('li.has-dropdown').forEach(li => {
  const svg = li.querySelector('.toggle-svg');
  const dropdown = li.querySelector('.dropdown');

  li.addEventListener('click', (e) => {
    // prevent link navigation when clicking the svg/label area
    e.stopPropagation();

    // close other open dropdowns
    document.querySelectorAll('li.has-dropdown.open').forEach(other => {
      if (other !== li) other.classList.remove('open');
    });

    // toggle this one
    li.classList.toggle('open');

    // optional: if you want to replace the arrow path with a specific "up" svg on open,
    // uncomment below and set svgInnerUp / svgInnerDown accordingly.

    /*
    const svgInnerUp = '<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />';
    const svgInnerDown = '<path d="m19.5 8.25-7.5 7.5-7.5-7.5" />';
    if (li.classList.contains('open')) svg.innerHTML = svgInnerUp;
    else svg.innerHTML = svgInnerDown;
    */
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  document.querySelectorAll('li.has-dropdown.open').forEach(li => {
    li.classList.remove('open');
  });
});

// Prevent anchor navigation when clicking the list toggle area but allow link if directly clicked
document.querySelectorAll('li.has-dropdown > a').forEach(a => {
  a.addEventListener('click', (e) => {
    // If you want the anchor to navigate, comment this out.
    e.preventDefault();
  });
});

const searchIcon = document.getElementById('search-icon');
const searchBox = document.getElementById('search-box');

searchIcon.addEventListener('click', () => {
  if (searchBox.style.display === 'none' || searchBox.style.display === '') {
    searchBox.style.display = 'inline-block';
    searchBox.focus();
  } else {
    searchBox.style.display = 'none';
  }
});

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchBox.value.trim().toLowerCase();

    const keywords = {
      sofa: 'sofa',
      sofas: 'sofa',
      table: 'table',
      tables: 'table',
      chair: 'chair',
      chairs: 'chair'
    };

    if (keywords[query]) {
      const section = document.getElementById(keywords[query]);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert('No matching category found.');
    }
  }
});

