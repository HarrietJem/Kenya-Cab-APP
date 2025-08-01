document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("intensitySlider");
  const body = document.body;
  const marks = document.querySelectorAll(".intensity-mark");

  function updateIntensity(value) {
    body.classList.remove("intensity-low", "intensity-medium", "intensity-high", "intensity-extreme");
    marks.forEach((m) => m.classList.remove("active"));

    switch (value) {
      case "1":
        body.classList.add("intensity-low");
        marks[0].classList.add("active");
        break;
      case "2":
        body.classList.add("intensity-medium");
        marks[1].classList.add("active");
        break;
      case "3":
        body.classList.add("intensity-high");
        marks[2].classList.add("active");
        break;
      case "4":
        body.classList.add("intensity-extreme");
        marks[3].classList.add("active");
        break;
    }
  }

  slider.addEventListener("input", (e) => {
    updateIntensity(e.target.value);
  });

  updateIntensity(slider.value); // Set initial
});
