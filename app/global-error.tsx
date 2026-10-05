"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Root-level failure UI — must include its own html/body. */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f2f0eb",
          fontFamily: "system-ui, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <p
            style={{
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              opacity: 0.6,
            }}
          >
            Critical error
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 500 }}>
            Wamunigga Cuts couldn’t load.
          </h1>
          <p style={{ opacity: 0.72, lineHeight: 1.6 }}>
            Refresh the page. If this keeps happening, try again shortly.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              height: "3rem",
              padding: "0 1.5rem",
              border: "none",
              background: "#f2f0eb",
              color: "#0a0a0a",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
