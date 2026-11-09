'use client'

import { useState, type FormEvent } from 'react'

type Props = {
  /** Visible label above the field. */
  label?: string
  /** Button text. */
  cta?: string
  /** Small print under the field. */
  fine?: string
  /** Compact variant for the footer. */
  compact?: boolean
  /** Hide the visible label (keeps it for screen readers). */
  hideLabel?: boolean
  id?: string
}

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID

/**
 * Newsletter signup. Posts to a Kit (ConvertKit) form when
 * NEXT_PUBLIC_KIT_FORM_ID is set; otherwise falls back to a mailto so the
 * form is never a dead end.
 */
export default function NewsletterForm({
  label = 'Email address',
  cta = 'Send me the calendar',
  fine = 'Seasonal only. Unsubscribe in one click.',
  compact = false,
  hideLabel = false,
  id = 'newsletter-email',
}: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return

    if (!KIT_FORM_ID) {
      window.location.href = `mailto:info@the-urban-gardening-neighbor.com?subject=${encodeURIComponent(
        'Add me to the Neighbor’s Notes'
      )}&body=${encodeURIComponent(email)}`
      return
    }

    setState('busy')
    try {
      const res = await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email_address: email }),
      })
      setState(res.ok ? 'ok' : 'err')
      if (res.ok) setEmail('')
    } catch {
      setState('err')
    }
  }

  return (
    <form className="fn-form" onSubmit={onSubmit} noValidate>
      <label
        htmlFor={id}
        style={
          hideLabel
            ? { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }
            : undefined
        }
      >
        {label}
      </label>
      <div className="fn-form-row">
        <input
          id={id}
          className="fn-input"
          type="email"
          name="email_address"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === 'busy' || state === 'ok'}
        />
        <button
          type="submit"
          className={`fn-btn fn-btn--green${compact ? ' fn-btn--sm' : ''}`}
          disabled={state === 'busy' || state === 'ok'}
        >
          {state === 'busy' ? 'Sending…' : cta}
        </button>
      </div>
      {state === 'ok' ? (
        <span className="fn-form-msg fn-form-msg--ok" role="status">
          Check your inbox to confirm. The calendar follows.
        </span>
      ) : state === 'err' ? (
        <span className="fn-form-msg fn-form-msg--err" role="alert">
          That didn’t go through. Try again or email info@the-urban-gardening-neighbor.com.
        </span>
      ) : (
        <span className="fn-form-fine">{fine}</span>
      )}
    </form>
  )
}
