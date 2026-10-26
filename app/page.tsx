"use client";
import { useState, useEffect } from "react";
import "./page.css";

const styles = new Proxy({}, { get: (_, k) => k }) as Record<string, string>;

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  reactions: { likes: number; dislikes: number };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=12")
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.heading}>Blog Posts</h1>
        <p className={styles.subheading}>Fresh stories, loaded on the client</p>
        <input
          className={styles.search}
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => (
            <article key={p.id} className={styles.card}>
              <span className={styles.badge}>#{p.id}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>

              <div className={styles.tags}>
                {p.tags.map(t => (
                  <span key={t} className={styles.tag}>#{t}</span>
                ))}
              </div>

              <div className={styles.footer}>
                <span>👍 {p.reactions.likes}</span>
                <span>👁 {p.views}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}