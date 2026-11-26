export default function PageHero({ title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <span className="page-hero-rule" aria-hidden="true" />
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
