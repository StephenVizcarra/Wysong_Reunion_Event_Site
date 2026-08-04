document.addEventListener("DOMContentLoaded", function () {
  var config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : null;
  if (!config) return;

  populateHero(config);
  populateAbout(config);
  populateSchedule(config);
  populateRegistration(config);
  populateLodging(config);
  populateGettingThere(config);
  populateContacts(config);
  populateFooter(config);
  initNavigation();
  initAdditionalNames();
  initFormSubmission();
});


// ---- Hero ----

function populateHero(config) {
  setText("hero-title", config.reunionName + " " + config.year);
  setText("hero-tagline", config.tagline);
  setText("hero-dates", config.dates);
  setText("print-year", config.year);
}


// ---- About ----

function populateAbout(config) {
  setText("about-text", config.aboutText);
}


// ---- Schedule ----

function populateSchedule(config) {
  var container = document.getElementById("schedule-content");
  if (!container || !config.schedule) return;

  container.innerHTML = "";
  config.schedule.forEach(function (day) {
    var card = document.createElement("div");
    card.className = "schedule-day";

    var h3 = document.createElement("h3");
    h3.textContent = day.day;
    card.appendChild(h3);

    day.items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "schedule-item";
      var timeSpan = document.createElement("span");
      timeSpan.className = "schedule-time";
      timeSpan.textContent = item.time;
      var titleSpan = document.createElement("span");
      titleSpan.className = "schedule-title";
      titleSpan.textContent = item.title;
      row.appendChild(timeSpan);
      row.appendChild(titleSpan);
      card.appendChild(row);
    });

    container.appendChild(card);
  });
}


// ---- Registration ----

function populateRegistration(config) {
  if (!config.registrationOpen) {
    hide("registration-open");
    show("registration-closed");
    return;
  }

  setText("reg-deadline", config.registrationDeadline);
  setText("check-payable", config.checkPayableTo);
  setText("payment-deadline", config.registrationDeadline);

  var addressEl = document.getElementById("mail-address");
  if (addressEl) {
    addressEl.textContent = config.mailingAddress.replace(/\\n/g, "\n");
  }

  populateDescendantOptions(config);
  populateEvents(config);
}

function populateDescendantOptions(config) {
  var select = document.getElementById("descendant-of");
  if (!select || !config.descendantOptions) return;

  config.descendantOptions.forEach(function (opt) {
    var option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function populateEvents(config) {
  if (!config.events) return;

  var anyActive = false;
  var eventRows = document.querySelectorAll(".event-row");

  config.events.forEach(function (evt, i) {
    if (i >= eventRows.length) return;
    var row = eventRows[i];

    if (!evt.active) {
      row.style.display = "none";
      return;
    }

    anyActive = true;
    row.style.display = "";
    row.querySelector(".event-name").textContent = evt.name;
    row.querySelector(".event-name-input").value = evt.name;

    var desc = row.querySelector(".event-description");
    if (desc) desc.textContent = evt.description || "";

    var adultRate = row.querySelector(".adult-rate");
    if (adultRate) adultRate.textContent = "x $" + evt.adultRate.toFixed(2) + " each";

    if (evt.hasChildRate) {
      var childGroup = row.querySelector(".children-group");
      if (childGroup) childGroup.style.display = "";
      var childRate = row.querySelector(".child-rate");
      if (childRate) childRate.textContent = "x $" + evt.childRate.toFixed(2) + " each";
    }

    var inputs = row.querySelectorAll(".event-qty");
    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        recalculate(config);
      });
    });
  });

  if (anyActive) {
    hide("no-events-msg");
    show("grand-total-row");
  }
}

function recalculate(config) {
  var grandTotal = 0;
  var eventRows = document.querySelectorAll(".event-row");

  config.events.forEach(function (evt, i) {
    if (i >= eventRows.length || !evt.active) return;
    var row = eventRows[i];

    var adultsInput = row.querySelector('input[name="event-' + (i + 1) + '-adults"]');
    var childrenInput = row.querySelector('input[name="event-' + (i + 1) + '-children"]');

    var adults = parseInt(adultsInput ? adultsInput.value : 0, 10) || 0;
    var children = parseInt(childrenInput ? childrenInput.value : 0, 10) || 0;

    var subtotal = (adults * evt.adultRate) + (evt.hasChildRate ? children * evt.childRate : 0);

    var display = row.querySelector(".subtotal-display");
    var hidden = row.querySelector(".subtotal-input");
    if (display) display.textContent = subtotal.toFixed(2);
    if (hidden) hidden.value = subtotal.toFixed(2);

    grandTotal += subtotal;
  });

  var totalDisplay = document.getElementById("grand-total-display");
  var totalInput = document.getElementById("grand-total-input");
  if (totalDisplay) totalDisplay.textContent = grandTotal.toFixed(2);
  if (totalInput) totalInput.value = grandTotal.toFixed(2);
}


// ---- Lodging ----

function populateLodging(config) {
  var container = document.getElementById("lodging-content");
  if (!container || !config.lodging) return;

  container.innerHTML = "";
  config.lodging.forEach(function (hotel) {
    var card = document.createElement("div");
    card.className = "card";

    var h3 = document.createElement("h3");
    h3.textContent = hotel.name;
    card.appendChild(h3);

    if (hotel.address) card.appendChild(makeCardLine("Address:", hotel.address));
    if (hotel.phone) card.appendChild(makeCardLink("Phone:", "tel:" + hotel.phone, hotel.phone));
    if (hotel.website) {
      var p = document.createElement("p");
      var a = document.createElement("a");
      a.href = hotel.website;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Visit Website";
      p.appendChild(a);
      card.appendChild(p);
    }
    if (hotel.notes) {
      var note = document.createElement("p");
      note.className = "card-note";
      note.textContent = hotel.notes;
      card.appendChild(note);
    }

    container.appendChild(card);
  });
}


// ---- Getting There ----

function populateGettingThere(config) {
  var textEl = document.getElementById("directions-text");
  if (textEl && config.directionsNote) {
    var p = document.createElement("p");
    p.textContent = config.directionsNote;
    textEl.appendChild(p);
  }

  var mapContainer = document.getElementById("map-container");
  if (mapContainer && config.mapEmbedUrl) {
    var iframe = document.createElement("iframe");
    iframe.src = config.mapEmbedUrl;
    iframe.title = "Map to " + config.venueAddress;
    iframe.loading = "lazy";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    mapContainer.appendChild(iframe);
  } else if (mapContainer) {
    mapContainer.style.display = "none";
    if (textEl) textEl.parentElement.style.gridTemplateColumns = "1fr";
  }
}


// ---- Contacts ----

function populateContacts(config) {
  var container = document.getElementById("contact-content");
  if (!container || !config.contacts) return;

  container.innerHTML = "";
  config.contacts.forEach(function (contact) {
    var card = document.createElement("div");
    card.className = "card";

    var h3 = document.createElement("h3");
    h3.textContent = contact.name;
    card.appendChild(h3);

    if (contact.role) {
      var role = document.createElement("p");
      role.className = "text-muted";
      role.textContent = contact.role;
      card.appendChild(role);
    }
    if (contact.phone) card.appendChild(makeCardLink("Phone:", "tel:" + contact.phone, contact.phone));
    if (contact.email) card.appendChild(makeCardLink("Email:", "mailto:" + contact.email, contact.email));

    container.appendChild(card);
  });
}


// ---- Footer ----

function populateFooter(config) {
  setText("footer-year", config.year);
}


// ---- Navigation ----

function initNavigation() {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active link highlighting on scroll
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}


// ---- Additional Names ----

function initAdditionalNames() {
  var addBtn = document.getElementById("add-name-btn");
  var list = document.getElementById("additional-names-list");
  if (!addBtn || !list) return;

  var nameCount = 0;

  addBtn.addEventListener("click", function () {
    nameCount++;
    var row = document.createElement("div");
    row.className = "additional-name-row";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Full name";
    input.className = "additional-name-input";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn-remove-name";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", "Remove this name");
    removeBtn.addEventListener("click", function () {
      row.remove();
    });

    row.appendChild(input);
    row.appendChild(removeBtn);
    list.appendChild(row);
    input.focus();
  });
}

function collectAdditionalNames() {
  var inputs = document.querySelectorAll(".additional-name-input");
  var names = [];
  inputs.forEach(function (input) {
    var val = input.value.trim();
    if (val) names.push(val);
  });
  var hidden = document.getElementById("additional-names-hidden");
  if (hidden) hidden.value = names.join(", ");
}


// ---- Form Submission ----

function initFormSubmission() {
  var form = document.getElementById("registration-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    collectAdditionalNames();

    var formData = new FormData(form);
    var encoded = new URLSearchParams(formData).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encoded
    })
      .then(function (response) {
        if (response.ok) {
          form.style.display = "none";
          show("form-success");
          var successEl = document.getElementById("form-success");
          if (successEl) successEl.scrollIntoView({ behavior: "smooth" });
        } else {
          alert("Something went wrong. Please try again or contact the reunion host.");
        }
      })
      .catch(function () {
        form.submit();
      });
  });
}


// ---- Helpers ----

function setText(id, text) {
  var el = document.getElementById(id);
  if (el && text != null) el.textContent = text;
}

function show(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "";
}

function hide(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "none";
}

function makeCardLine(label, text) {
  var p = document.createElement("p");
  var span = document.createElement("span");
  span.className = "card-label";
  span.textContent = label + " ";
  p.appendChild(span);
  p.appendChild(document.createTextNode(text));
  return p;
}

function makeCardLink(label, href, text) {
  var p = document.createElement("p");
  var span = document.createElement("span");
  span.className = "card-label";
  span.textContent = label + " ";
  p.appendChild(span);
  var a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  p.appendChild(a);
  return p;
}
