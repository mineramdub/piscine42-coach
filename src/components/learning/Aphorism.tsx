interface AphorismData {
  quote: string
  author: string
}

const aphorisms: AphorismData[] = [
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds"
  },
  {
    quote: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs"
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    quote: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  },
  {
    quote: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson"
  },
  {
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  },
  {
    quote: "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare"
  },
  {
    quote: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine"
  },
  {
    quote: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie"
  },
  {
    quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    author: "Dan Salomon"
  },
  {
    quote: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson"
  }
]

export function getAphorism(index: number): AphorismData {
  return aphorisms[index % aphorisms.length]
}

interface AphorismProps {
  index?: number
}

export default function Aphorism({ index = 0 }: AphorismProps) {
  const { quote, author } = getAphorism(index)

  return (
    <div className="w-full p-4 bg-primary/5 border-l-4 border-primary rounded-lg">
      <p className="text-sm italic text-foreground mb-2">« {quote} »</p>
      <p className="text-xs text-muted-foreground">— {author}</p>
    </div>
  )
}
