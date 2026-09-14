import Link from "next/link";
export default function AboutMe() {
  return <main className="desktop about-page">
    <header className="desktop-menu"><Link className="desktop-brand" href="/">✦ katherine</Link><span>about me</span><Link className="menu-right" href="/">← back to desktop</Link></header>
    <article className="about-window"><div className="dialog-header"><span aria-hidden="true">✦</span><span>about-me.txt</span><span aria-hidden="true">◇</span></div>
      <div className="intro-content"><h1>i’m katherine<span>.</span></h1><p>I’m a Software Engineer at Watershed 💻.</p><p>I currently live in SF 🌁 &amp; I’m from Toronto 🍁.</p><p>When I’m away from my keyboard, I like to eat 🍜, cook 🧑‍🍳, crochet 🧶, and play video games 🎮.</p><Link href="/" className="retro-button">← Back to my desktop</Link></div>
      <div className="window-status"><span>a little about me</span><span>thanks for stopping by ♡</span></div>
    </article>
  </main>;
}
