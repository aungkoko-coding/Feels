import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            background: "rgb(234, 88, 12)",
            color: "#ffffff",
            padding: "10px",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
            fontStyle: "italic",
          }}
        >
          F
        </span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
