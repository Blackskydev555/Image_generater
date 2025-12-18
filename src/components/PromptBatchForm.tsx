import React, { useState } from "react";

type PromptBatchFormProps = {
  onGenerate: (prompts: string[]) => void;
  isGenerating: boolean;
};

export const PromptBatchForm: React.FC<PromptBatchFormProps> = ({
  onGenerate,
  isGenerating
}) => {
  const [rawPrompts, setRawPrompts] = useState<string>("Outfit of the day\nCosplay look\nStreetwear inspo");

  const prompts = rawPrompts
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompts.length || isGenerating) return;
    onGenerate(prompts);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2 className="card-title">Batch prompts</h2>
        <p className="card-subtitle">
          Enter one prompt per line. The app will generate one image (or video)
          per prompt.
        </p>
      </div>

      <label className="field">
        <div className="field-label">
          Prompts <span className="pill pill-muted">{prompts.length} items</span>
        </div>
        <textarea
          className="textarea"
          rows={5}
          value={rawPrompts}
          onChange={(e) => setRawPrompts(e.target.value)}
          placeholder={"Outfit of the day\nCosplay look\nStreetwear inspo"}
        />
      </label>

      <div className="actions">
        <button
          type="submit"
          className="button button-primary"
          disabled={!prompts.length || isGenerating}
        >
          {isGenerating ? "Generating..." : `Generate ${prompts.length || ""}`}
        </button>
      </div>

      <p className="helper-text">
        This is a demo. Under the hood we can plug in DALL·E, NanoBanana, or any
        other image/video API.
      </p>
    </form>
  );
};



