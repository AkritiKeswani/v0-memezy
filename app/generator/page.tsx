"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Download, ImagePlus, Info } from "lucide-react"
import Link from "next/link"

// Predefined meme responses for the demo
const DEMO_MEMES = [
  {
    input: "my friend keeps texting me but I'm ignoring them",
    image: "/memes/cat-ignore.png",
    text: "When you see the message but pretend you didn't",
  },
  {
    input: "asking my crush out",
    image: "/memes/nervous-cat.png",
    text: "Kya bolte ho? Jung se pehle usko ek baar or text kardu?",
  },
  {
    input: "when someone leaves me on read",
    image: "/memes/sad-cat.png",
    text: "Me checking if they're online every 5 minutes",
  },
  {
    input: "my boss asking for the project I haven't started",
    image: "/memes/panic-cat.png",
    text: "Me trying to look productive while having done nothing",
  },
  {
    input: "when my mom finds my secret snack stash",
    image: "/memes/guilty-cat.png",
    text: "I was saving those for a special occasion",
  },
]

export default function GeneratorPage() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMeme, setGeneratedMeme] = useState<{ image: string; text: string } | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showInstructions, setShowInstructions] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const generateMeme = () => {
    if (!input && !uploadedImage) return

    setIsGenerating(true)
    setShowInstructions(false)

    // Simulate API call with timeout
    setTimeout(() => {
      // Find a matching predefined meme or use default
      const lowercaseInput = input.toLowerCase()
      const matchedMeme =
        DEMO_MEMES.find((meme) => lowercaseInput.includes(meme.input) || meme.input.includes(lowercaseInput)) ||
        DEMO_MEMES[1] // Default to the second meme if no match

      setGeneratedMeme({
        image: matchedMeme.image,
        text: matchedMeme.text,
      })
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <header className="flex justify-between items-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Memezy
            </h1>
          </Link>
          <div className="text-sm text-gray-400">Meme Generator Demo</div>
        </header>

        {showInstructions && (
          <Card className="bg-gray-800 border-gray-700 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-purple-900 rounded-full p-2 mt-1">
                <Info className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">How to use Memezy</h2>
                <p className="text-gray-300 mb-3">
                  This is a demo version with predefined responses. Try these prompts:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                  <li>
                    <span className="text-purple-400">asking my crush out</span> - Generates a nervous cat meme
                  </li>
                  <li>
                    <span className="text-purple-400">when someone leaves me on read</span> - Creates a sad waiting meme
                  </li>
                  <li>
                    <span className="text-purple-400">my boss asking for the project</span> - Shows a panic reaction
                    meme
                  </li>
                </ul>
                <p className="text-gray-400 text-sm">
                  You can also try your own prompts, but the demo works best with the examples below.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="p-4">
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-gray-300 mb-2">
                  input: <span className="text-purple-400">**chat screenshot**</span> or{" "}
                  <span className="text-purple-400">**describes the meme or convo**</span>
                </p>
                <div className="flex gap-4">
                  <Textarea
                    placeholder="Try: 'asking my crush out' or 'when someone leaves me on read'"
                    className="min-h-[100px] bg-gray-800 border-gray-600 text-white"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <div className="flex flex-col justify-center">
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="h-12 w-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <ImagePlus className="h-6 w-6 text-purple-400" />
                      </div>
                    </label>
                  </div>
                </div>
                {uploadedImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Uploaded image:</p>
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded chat"
                      className="max-h-[200px] rounded-lg"
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2"
                    onClick={generateMeme}
                    disabled={isGenerating || (!input && !uploadedImage)}
                  >
                    {isGenerating ? "Generating..." : "Generate Meme"}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300 mb-2">output:</p>
                {isGenerating ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : generatedMeme ? (
                  <div className="relative">
                    <div className="bg-black p-2 rounded-t-lg">
                      <p className="text-white text-center font-medium">{generatedMeme.text}</p>
                    </div>
                    <img src={generatedMeme.image || "/placeholder.svg"} alt="Generated meme" className="w-full" />
                    <div className="absolute bottom-4 right-4">
                      <Button
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-700"
                        onClick={() => window.open(generatedMeme.image, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-black p-1 rounded-b-lg">
                      <p className="text-white text-center text-xs">MEMEZY</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Your generated meme will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Quick Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEMO_MEMES.map((meme, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 justify-start"
                onClick={() => {
                  setInput(meme.input)
                  setShowInstructions(false)
                }}
              >
                {meme.input}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gray-800 border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">What can you prompt?</h2>
          <p className="text-gray-300 mb-4">
            In this demo version, Memezy works best with specific scenarios. Here's what you can try:
          </p>

          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-purple-400 mb-2">Relationship Scenarios</h3>
              <p className="text-gray-300 mb-2">Try prompts like:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>"asking my crush out"</li>
                <li>"when they don't text back"</li>
                <li>"waiting for a reply"</li>
              </ul>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-purple-400 mb-2">Work Situations</h3>
              <p className="text-gray-300 mb-2">Try prompts like:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>"my boss asking for the project I haven't started"</li>
                <li>"pretending to work during a meeting"</li>
                <li>"when the deadline is tomorrow"</li>
              </ul>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-purple-400 mb-2">Everyday Moments</h3>
              <p className="text-gray-300 mb-2">Try prompts like:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>"when my mom finds my secret snack stash"</li>
                <li>"my friend keeps texting me but I'm ignoring them"</li>
                <li>"when someone uses my phone without permission"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
