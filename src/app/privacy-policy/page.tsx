export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        lineHeight: 1.6,
      }}
    >
      <h1>Privacy Policy for Promptaze</h1>

      <p>
        <strong>Last updated:</strong> March 6, 2026
      </p>

      <p>
        Promptaze is a browser extension designed to help users quickly insert
        curated Azerbaijani prompts into AI chat interfaces such as ChatGPT,
        Gemini, and Claude.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        Promptaze does{" "}
        <strong>not collect or store personal information</strong> such as
        names, email addresses, account information, or payment details.
      </p>
      <p>
        When a user searches for prompts through the extension, the text entered
        into the search field (for example, a keyword like “biznes”) is sent to
        the Promptaze API (<code>api.promptaze.com</code>) to retrieve relevant
        prompts. This information is used solely to return matching prompts.
      </p>

      <h2>2. How We Use Information</h2>
      <p>The keyword entered by the user is used only to:</p>
      <ul>
        <li>Search the Promptaze prompt library</li>
        <li>Return relevant curated prompts</li>
        <li>Insert a selected prompt into the AI chat input field</li>
      </ul>
      <p>
        Promptaze does <strong>not store, track, or analyze</strong> the user’s
        search queries beyond the immediate request needed to return prompt
        results.
      </p>

      <h2>3. Data Storage</h2>
      <p>
        Promptaze does not store personal data locally or remotely. All prompt
        searches are processed in real time and are not retained by the
        extension.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        Promptaze does not sell, rent, or share user data with third parties.
      </p>
      <p>
        The only external communication performed by the extension is a request
        to the Promptaze API to retrieve prompts based on a search query.
      </p>

      <h2>5. Permissions</h2>
      <p>
        Promptaze runs only on supported AI chat websites (such as ChatGPT,
        Gemini, and Claude) in order to insert prompts directly into chat input
        fields. The extension does not access browsing history or monitor user
        activity outside of these pages.
      </p>

      <h2>6. Security</h2>
      <p>
        Promptaze is designed to minimize data access. The extension only
        processes the minimal information necessary to provide its
        functionality.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        This privacy policy may be updated from time to time. Updates will be
        reflected on this page with a revised “Last updated” date.
      </p>

      <h2>8. Contact</h2>
      <p>If you have questions about this Privacy Policy, please contact:</p>

      <p>
        <strong>Promptaze</strong>
        <br />
        Website: https://promptaze.com
        <br />
        Email: support@promptaze.com
      </p>
    </main>
  );
}
