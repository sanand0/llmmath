import { scaleSequential } from "https://cdn.jsdelivr.net/npm/d3-scale@4/+esm";
import { interpolateRdYlGn } from "https://cdn.jsdelivr.net/npm/d3-scale-chromatic@3/+esm";

const { config, results } = await (await fetch("multiplication.json")).json();
const tests = config.tests.map((t) => t.description.replace(/,/g, "").replace(/\s*x\s*/g, "x"));
const entries = results.results;
const models = [...new Set(entries.map((r) => r.provider.id || r.provider))];

// Create a color scale from 0 to 100%
const colorScale = scaleSequential(interpolateRdYlGn).domain([0, 100]);

// Function to determine text color based on background color for contrast
const getTextColor = (bgColor) => {
  // Extract RGB from the rgba string
  const rgb = bgColor.match(/\d+/g).map(Number);
  // Calculate luminance - standard formula for perceived brightness
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5 ? "#000" : "#fff";
};

const stats = models.map((m) => {
  const res = { m, pass: 0, fail: 0, error: 0, blank: 0, totalAttempts: 0 };

  tests.forEach((d) => {
    // Get all responses for this model and test
    const responses = entries.filter((r) => (r.provider.id || r.provider) === m && `${r.vars.a}x${r.vars.b}` === d);

    // Count different types of responses
    const attempts = responses.length;
    const correct = responses.filter((r) => r.success).length;
    const errors = responses.filter((r) => r.response?.error).length;
    const blanks = responses.filter((r) => !(r.response?.output || "").trim() && !r.response?.error).length;
    const fails = attempts - correct - errors - blanks;

    // Store the responses for popover content
    res[d] = {
      attempts,
      correct,
      errors,
      blanks,
      fails,
      accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : 0,
      responses,
    };

    // Update totals
    res.totalAttempts += attempts;
    res.pass += correct;
    res.blank += blanks;
    res.error += errors;
    res.fail += fails;
  });

  res.overallAccuracy = res.totalAttempts > 0 ? Math.round((res.pass / res.totalAttempts) * 100) : 0;
  return res;
});

// Sort by overall accuracy, then name
stats.sort((a, b) => b.overallAccuracy - a.overallAccuracy || a.m.localeCompare(b.m));

// Header
document.getElementById("headerRow").innerHTML = ["Model", "%Win", ...tests]
  .map((h) => `<th class="text-end">${h}</th>`)
  .join("");

// Body
const b = document.getElementById("body");
stats.forEach((s) => {
  const cells = tests
    .map((d) => {
      const r = s[d];
      const text = `${r.correct}/${r.attempts}`;

      // Generate popover content with numbered list of responses
      let popoverContent = "";
      if (r.responses?.length) {
        const responseList = r.responses
          .map((resp, idx) => {
            if (resp.response?.error) return `${idx + 1}. Error: ${resp.response.error}`;
            return `${idx + 1}. ${resp.response?.output || "[No output]"}`.trim();
          })
          .join("<br>");
        popoverContent = responseList.replace(/"/g, "&quot;");
      }

      // Get background color based on accuracy
      const bgColor = colorScale(r.accuracy);
      const textColor = getTextColor(bgColor);

      return `<td class="text-end" data-bs-toggle="popover" data-bs-placement="top"
               data-bs-html="true" data-bs-content="${popoverContent}"
               style="background-color:${bgColor}; color:${textColor}">${text}</td>`;
    })
    .join("");

  b.insertAdjacentHTML(
    "beforeend",
    `<tr>
      <th class="text-end">${s.m}</th>
      <td class="text-end text-nowrap">${s.pass}/${s.totalAttempts} (${s.overallAccuracy}%)</td>
      ${cells}
    </tr>`
  );
});

// Initialize popovers
bootstrap.Popover.getOrCreateInstance(document.body, {
  selector: '[data-bs-toggle="popover"]',
  trigger: "hover",
});

// Footer averages
const foot = document.getElementById("foot");
const avg = tests.map((d) => {
  const pass = stats.reduce((sum, s) => sum + s[d].correct, 0);
  const totalAttempts = stats.reduce((sum, s) => sum + s[d].attempts, 0);
  return totalAttempts > 0 ? Math.round((pass / totalAttempts) * 100) : 0;
});

foot.innerHTML = `<tr class="table-secondary">
  <th class="text-end">Average</th>
  <th class="text-end"></th>
  ${avg.map((a) => `<th class="text-end">${a}%</th>`).join("")}
</tr>`;
