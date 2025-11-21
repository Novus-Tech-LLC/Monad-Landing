import Icon from './icon'

import { HTMLAttributes, useEffect, useMemo, useState } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Intro = ({ className }: Props) => {
  const [joinedUser, setJoinedUser] = useState(DEFAULT_JOINED_USER)

  useEffect(() => {
    const apiBaseUrl = resolveApiBaseUrl()

    if (!apiBaseUrl) {
      console.warn('Environment variables for Nad.fun API are missing; using fallback values.')
      return
    }

    const controller = new AbortController()

    const fetchAccountsCount = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/accounts_count`, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Failed to load accounts count: ${response.statusText}`)
        }

        const payload = (await response.json()) as { count?: number }

        if (typeof payload?.count === 'number') {
          setJoinedUser(payload.count)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        console.warn('Unable to fetch Nad.fun member count. Falling back to default.', error)
      }
    }

    fetchAccountsCount()

    return () => controller.abort()
  }, [])

  const roundedJoinedUser = useMemo(() => roundUpDynamic(joinedUser), [joinedUser])

  return (
    <div className={className}>
      <div className="relative h-svh">
        <div className="absolute inset-0 h-full bg-nad-gradient" />
        <div className="mx-auto h-full max-w-[1440px]">
          <img
            src="/intro-star.png"
            alt="monad-logo"
            className="absolute bottom-0 left-1/2 h-[675px] w-[1324px] -translate-x-1/2 object-cover object-center"
          />
          <img
            src="intro-gradation.png"
            alt=""
            className="absolute left-0 size-full object-cover"
          />
          <Icon
            name="intro-monad-logo"
            className="absolute right-1/2 top-0 size-[100vw] translate-x-1/2 blur-[3px] xs:size-[580px]"
          />
          <div className="flex flex-col items-center pt-[70px] *:z-10 xs:pt-[107px]">
            <Icon name="intro-nad-fun-logo" />
            <Icon
              name="intro-text-logo"
              className="mt-[32px] h-[58px] w-[283px] xs:mt-[41.6px] xs:h-[101.4px] xs:w-[494.2px]"
            />
            <p className="mt-[24px] px-[20px] text-center text-body2 text-gray-100 xs:mt-[32px] xs:text-[20px] xs:leading-[150%] xs:tracking-[-0.02em]">
              One click token generation & gamefied trading platform on Monad
            </p>

            <a
              href="https://demo.nad.fun/demo"
              target="_blank"
              rel="noreferrer noopener"
              className="relative mt-[48px] flex items-center gap-[12px] overflow-hidden rounded-[48px] border border-white bg-gradient-to-r from-[#FEFEFF] to-[#CFB7FF] bg-clip-text px-[19px] py-[11.5px] text-transparent xs:mt-[64px] xs:px-[32px] xs:py-[16px]"
            >
              <div className="absolute inset-0 bg-white/10" />
              <span className="text-subtitle3 xs:text-subtitle1">
                Grab GIGA opportunity before launch
              </span>
              <Icon name="chevron-right" className="xs:h-[16px] xs:w-[9px]" />
            </a>
            <p
              className="mt-[20px] text-body4 text-purple-100 xs:text-body2"
              aria-live="polite"
              aria-atomic="true"
            >
              {roundedJoinedUser}+ members already joined
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const DEFAULT_JOINED_USER = 6000

const roundUpDynamic = (number: number) => {
  if (number <= 0 || Number.isNaN(number)) {
    return DEFAULT_JOINED_USER
  }

  const magnitude = Math.floor(Math.log10(number))
  const scale = Math.max(1, Math.pow(10, magnitude - 1))

  return Math.ceil(number / scale) * scale
}

const resolveApiBaseUrl = () => {
  const prodUrl = import.meta.env.VITE_API_URL?.trim()
  const devUrl = import.meta.env.VITE_API_DEV_URL?.trim()

  if (import.meta.env.PROD) {
    return prodUrl || devUrl || ''
  }

  return devUrl || prodUrl || ''
}
