import * as IconvCP932 from "iconv-cp932";

import { create10DigitsTrip, create12DigitsTrip, createRawKeyTrip } from './trip/index'

type Options = Partial<{
  hideWhitespace: boolean
}>

const rawKeyPettern = /^#[0-9A-Fa-f]{16}[.\/0-9A-Za-z]{0,2}$/
export const createTripByKey = (key: string) => {
//   const encodedKeyString = convert(key, { from: 'UNICODE', to: 'SJIS', fallback: 'html-entity' })
    const encodedKeyString = IconvCP932.encode(key).toString()

  // 10 桁トリップ
  if (encodedKeyString.length < 12) return create10DigitsTrip(key)

  // 生キートリップ
  if (encodedKeyString.startsWith('#') || encodedKeyString.startsWith('$')) {
    // 拡張用のため ??? を返す
    if (!rawKeyPettern.test(encodedKeyString)) return '???'

    return createRawKeyTrip(key)
  }

  // 12 桁トリップ
  return create12DigitsTrip(key)
}