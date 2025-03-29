import React, { useState } from "react";

interface HighlightedFieldProps {
  fieldKey: string; // e.g. "name", "summary", etc.
  originalText: string;
  correctedText: string;
  onReplace: (fieldKey: string, newValue: string) => void;
  finalValue: string; // The current final value used in the displayed CV
}

const HighlightedField: React.FC<HighlightedFieldProps> = ({
  fieldKey,
  originalText,
  correctedText,
  onReplace,
  finalValue,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleReplace = () => {
    // Ask for confirmation (optional)
    const confirmReplace = window.confirm(
      "Are you sure you want to replace with the suggested text?"
    );
    if (confirmReplace) {
      onReplace(fieldKey, correctedText);
    }
  };

  return (
    <div style={{ display: "inline-flex", gap: "8px" }}>
      {/* Original text in red */}
      <span style={{ color: "red" }}>{originalText}</span>

      {/* The slash or separator (optional) */}
      <span>/</span>

      {/* Corrected text in green with hover Replace button */}
      <span
        style={{ color: "green", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {correctedText}

        {hovered && (
          <button
            onClick={handleReplace}
            style={{
              marginLeft: "6px",
              padding: "2px 6px",
              fontSize: "0.75rem",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              position: "absolute",
              top: "-1.5rem",
              left: 0,
              zIndex: 10,
            }}
          >
            Replace
          </button>
        )}
      </span>

      {/* Show whichever value is ultimately used in the final CV (for debugging/demo) */}
      {/* If you only want to show the final text once in the CV, you can remove this part */}
      <span style={{ marginLeft: "8px", fontStyle: "italic" }}>
        (Final: {finalValue})
      </span>
    </div>
  );
};

export default HighlightedField;
