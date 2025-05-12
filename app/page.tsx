import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Memezy
            </span>
          </div>
          <nav>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              About
            </Button>
            <Button className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Link href="/generator">Try It Now</Link>
            </Button>
          </nav>
        </header>

        <main className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Turn Your Chats Into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Memes</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Upload screenshots or describe your conversations to instantly generate hilarious memes
            </p>
            <Link href="/generator">
              <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Create Your Meme
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
