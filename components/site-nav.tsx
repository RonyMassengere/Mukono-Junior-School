'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { nav, site } from '@/lib/site'
import { SocialLinks } from '@/components/social-links'

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="fixed inset-x-0 top-0 z-50 isolate">
      <div
        className={cn(
          'border-b border-primary/15 bg-white/[.98] shadow-sm backdrop-blur-2xl transition-all duration-300 ease-out',
          scrolled && 'shadow-lg',
        )}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 px-3 py-3 sm:px-5 lg:gap-3">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Image
              src="/mjs-logo.png"
              alt="MJS"
              width={48}
              height={48}
              sizes="48px"
              className="size-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 sm:size-[3rem]"
              priority
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-base font-800 tracking-tight text-primary sm:text-lg lg:text-[1.75rem]">
                {site.name}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
                Takkajunge
              </span>
            </span>
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <ul className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-1">
              {nav.map((item) => {
                if ('items' in item && item.items) {
                  return (
                    <li key={item.label} className="relative group py-1.5">
                      <Link
                        href={item.href}
                        className={cn(
                          'relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-700 text-[#303f9f] transition-colors duration-200 hover:bg-[#f7e600]/25 hover:text-[#c91f2b] xl:px-3 xl:text-sm',
                          isActive(item.href)
                            ? 'text-accent accent-underline'
                            : 'text-[#303f9f]',
                        )}
                      >
                        {item.label}
                        <span className="text-[10px] xl:text-xs">▾</span>
                      </Link>

                      <div className="absolute left-1/2 top-full z-20 mt-1 w-56 -translate-x-1/2 rounded-2xl border border-border bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto -translate-y-2 pointer-events-none">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block rounded-xl px-3 py-2 text-sm font-600 text-foreground transition-colors hover:bg-muted hover:text-accent',
                              isActive(subItem.href) && 'bg-primary/5 text-accent',
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative inline-flex rounded-full px-2.5 py-2 text-xs font-700 text-[#303f9f] transition-colors duration-200 hover:bg-[#f7e600]/25 hover:text-[#c91f2b] xl:px-3 xl:text-sm',
                        isActive(item.href)
                          ? 'text-accent accent-underline'
                          : 'text-[#303f9f]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden xl:block">
              <SocialLinks variant="dark" />
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full bg-accent px-4 py-2.5 text-xs font-700 text-accent-foreground shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] sm:inline-flex sm:text-sm"
            >
              Get in Touch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <div
          aria-hidden={!open}
          className={cn(
            'overflow-hidden border-t border-border/70 bg-white shadow-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden',
            open
              ? 'pointer-events-auto max-h-[38rem] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0',
          )}
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-2 px-5 pb-5 pt-3">
            {nav.map((item) => {
              if ('items' in item && item.items) {
                return (
                  <li key={item.label} className="rounded-2xl border border-border bg-muted/40 p-2">
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-xl px-4 py-3 text-base font-700 transition-[background-color,color,transform,opacity] duration-300',
                        open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
                        isActive(item.href)
                          ? 'bg-primary/10 text-accent'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      {item.label}
                    </Link>

                    <ul className="mt-2 space-y-1 pl-3">
                      {item.items.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              'block rounded-xl px-4 py-2 text-sm font-600 transition-colors',
                              open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
                              isActive(subItem.href)
                                ? 'bg-primary/10 text-accent'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-base font-600 transition-[background-color,color,transform,opacity] duration-300',
                      open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
                      isActive(item.href)
                        ? 'bg-primary/10 text-accent'
                        : 'text-foreground hover:bg-muted',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div
            className={cn(
              'border-t border-border/70 px-5 py-3 transition-[transform,opacity] delay-150 duration-300',
              open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
          >
            <SocialLinks variant="dark" />
          </div>
        </div>
      </div>
    </header>
  )
}
