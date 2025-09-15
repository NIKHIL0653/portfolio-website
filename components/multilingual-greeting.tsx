"use client"

import { useEffect, useState } from "react"

const greetings = [
  { text: "Nice to meet you", lang: "English" },
  { text: "Encantado de conocerte", lang: "Spanish" },
  { text: "よろしくお願いします", lang: "Japanese" },
  { text: "很高兴认识你", lang: "Chinese" },
  { text: "आप से मिलकर खुशी हुई", lang: "Hindi" },
  { text: "آپ سے مل کر خوشی ہوئی", lang: "Urdu" },
  { text: "તમને મળીને આનંદ થયો", lang: "Gujarati" },
  { text: "तुम्हाला भेटून आनंद झाला", lang: "Marathi" },
  { text: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো", lang: "Bengali" },
  { text: "നിങ്ങളെ കണ്ടതിൽ സന്തോഷം", lang: "Malayalam" },
  { text: "మిమ్మల్ని కలిసినందుకు సంతోషం", lang: "Telugu" },
  { text: "ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು", lang: "Kannada" },
  { text: "உங்களை சந்தித்ததில் மகிழ்ச்சி", lang: "Tamil" },
  { text: "Schön, Sie kennenzulernen", lang: "German" },
  { text: "Enchanté de vous rencontrer", lang: "French" },
  { text: "Prazer em conhecê-lo", lang: "Portuguese" },
  { text: "만나서 반갑습니다", lang: "Korean" },
  { text: "Приятно познакомиться", lang: "Russian" },
  { text: "تشرفت بمقابلتك", lang: "Arabic" }
];

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~`"

export function MultilingualGreeting() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState(greetings[0].text)
  const [isScrambling, setIsScrambling] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)

  // Custom sequence: English appears after every 2 other languages
  const getNextIndex = (currentIdx: number, count: number) => {
    // Always start with English (index 0)
    if (count === 0) return 0
    
    // Create pattern: English -> Lang1 -> Lang2 -> English -> Lang3 -> Lang4 -> English...
    const cyclePosition = count % 3
    
    if (cyclePosition === 0) {
      // Every 3rd display should be English
      return 0
    } else {
      // Calculate which non-English language to show
      // We have 18 non-English languages (indices 1-18)
      const nonEnglishLanguages = greetings.length - 1 // Exclude English
      const languageOffset = Math.floor((count - 1) / 2) // Which pair of languages we're in
      const positionInPair = (count - 1) % 2 // First or second language in the pair
      
      const languageIndex = ((languageOffset * 2 + positionInPair) % nonEnglishLanguages) + 1
      return languageIndex
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScrambling(true)

      // Scrambling phase
      let scrambleCount = 0
      const maxScrambles = 15

      const scrambleInterval = setInterval(() => {
        if (scrambleCount < maxScrambles) {
          // Generate scrambled text with fixed length (20 characters)
          const scrambled = Array.from(
            { length: 20 },
            () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)],
          ).join("")

          setDisplayText(scrambled)
          scrambleCount++
        } else {
          // Transition to next greeting
          clearInterval(scrambleInterval)
          const nextIdx = getNextIndex(currentIndex, displayCount + 1)
          setCurrentIndex(nextIdx)
          setDisplayText(greetings[nextIdx].text)
          setDisplayCount(prev => prev + 1)
          setIsScrambling(false)
        }
      }, 80)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [currentIndex, displayCount])

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10 border-t">
      <div className="text-center">
        <div className="h-[2rem] flex items-center justify-center">
          <span
            className={`transition-all duration-200 text-muted-foreground text-lg sm:text-xl ${isScrambling ? "opacity-60" : "opacity-80"}`}
            style={{
              fontFamily: '__geistMono_bb3bb8',
              fontWeight: '500',
              lineHeight: '24px'
            }}
          >
            {displayText}
          </span>
        </div>
      </div>
    </section>
  )
}