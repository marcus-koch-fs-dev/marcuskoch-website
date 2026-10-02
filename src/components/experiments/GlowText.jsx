export default function GlowText({ text }) {
  const nodes = [];
  text.split(" ").forEach((word, wi) => {
    if (wi > 0) nodes.push(" ");
    nodes.push(
      <span className="globe-hero__word" key={wi}>
        {word.split("").map((char, ci) => (
          <span key={ci}>{char}</span>
        ))}
      </span>
    );
  });
  return nodes;
}
