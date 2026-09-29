/** The official user-supplied logo; use this component wherever the brand appears. */
export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img
        src="/brand/matholympiad-logo.png"
        alt=""
        width={500}
        height={500}
        className="brand-mark-image"
      />
    </span>
  );
}
