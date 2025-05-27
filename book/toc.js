// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="Intro.html">Intro</a></li><li class="chapter-item expanded affix "><li class="part-title">Thoery</li><li class="chapter-item expanded "><a href="Theme.html"><strong aria-hidden="true">1.</strong> Thoery</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="whatsatemplate.html"><strong aria-hidden="true">1.1.</strong> whats a template anyway</a></li><li class="chapter-item expanded "><a href="turingcomplete.html"><strong aria-hidden="true">1.2.</strong> Bad turing-completeness</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.</strong> Safetyphilia</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Syntax</li><li class="chapter-item expanded "><a href="features.html"><strong aria-hidden="true">2.</strong> New-ish features</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="aliasreassign.html"><strong aria-hidden="true">2.1.</strong> Alias reassignment</a></li><li class="chapter-item expanded "><a href="stringimport.html"><strong aria-hidden="true">2.2.</strong> openD string imports</a></li></ol></li><li class="chapter-item expanded "><a href="pattensection.html"><strong aria-hidden="true">3.</strong> Other patterns</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="special.html"><strong aria-hidden="true">3.1.</strong> Specailization as lookup tables</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Meat</li><li class="chapter-item expanded "><a href="ast.html"><strong aria-hidden="true">4.</strong> Walters wild ride</a></li><li class="chapter-item expanded "><a href="bugssection.html"><strong aria-hidden="true">5.</strong> Useful Bugs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="monkyyyheader.html"><strong aria-hidden="true">5.1.</strong> Monkyyy header</a></li><li class="chapter-item expanded "><a href="tgcounter.html"><strong aria-hidden="true">5.2.</strong> tg&#39;s counter</a></li></ol></li><li class="chapter-item expanded "><a href="unintentional.html"><strong aria-hidden="true">6.</strong> Unintentional Features</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="mixincounter.html"><strong aria-hidden="true">6.1.</strong> Mixin counter</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Examples</li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> plz help</div></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
