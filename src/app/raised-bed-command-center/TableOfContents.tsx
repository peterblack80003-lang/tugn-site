'use client'
import { useState, useEffect } from 'react'

type TocItem = {
  title: string
  anchor: string
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeAnchor, setActiveAnchor] = useState<string>(items[0]?.anchor ?? '')

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActiveAnchor(intersecting[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
    )

    items.forEach(({ anchor }) => {
      const el = document.getElementById(anchor)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: 'sticky',
        top: '100px',
        padding: '1.25rem 1.25rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid #4A8C2A',
        borderRadius: '6px',
      }}
    >
      <p
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(232,223,200,0.35)',
          marginBottom: '0.85rem',
        }}
      >
        On This Page
      </p>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.15rem',
        }}
      >
        {items.map(({ title, anchor }) => {
          const isActive = activeAnchor === anchor
          return (
            <li key={anchor}>
              <a
                href={`#${anchor}`}
                style={{
                  display: 'block',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.4,
                  color: isActive ? '#4A8C2A' : 'rgba(232,223,200,0.5)',
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: '4px',
                  background: isActive ? 'rgba(74,140,42,0.1)' : 'transparent',
                  transition: 'color 0.15s, background 0.15s',
                  textDecoration: 'none',
                }}
              >
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
