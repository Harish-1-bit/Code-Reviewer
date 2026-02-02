  "use client"

  import { useState } from "react"
  import {
    AlertCircle,
    CheckCircle,
    Copy,
    Moon,
    RefreshCw,
    Sun,
    AlertTriangle,
    Info,
    Code,
    TrendingUp,
    Lock,
    Zap,
    FileCode,
    Play,
  } from "lucide-react"
  import { useDispatch, useSelector } from "react-redux"
  import { reviewText } from "../features/review/ReviewSlice"

  export default function Page() {
    const {review,isLoading}=useSelector(state=>state.review)
      const dispatch = useDispatch()
    const [isDark, setIsDark] = useState(true)
    const [codeSnippet, setCodeSnippet] = useState("")
    const [language, setLanguage] = useState("javascript")
    const [showResults, setShowResults] = useState(false)
    const [lineCount, setLineCount] = useState(0)

    const handleCodeChange = (e) => {
      const {value} = e.target
      setCodeSnippet(value)
      setLineCount(value.split("\n").length)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(reviewText(codeSnippet))
        setShowResults(true)
    }

    const handleReset = (e) => {
      setCode("")
      setShowResults(false)
      setLineCount(0)
    }

    




    const stats = [
      { label: "Lines Reviewed", value: lineCount || 0, icon: Code },
      { label: "Issues Found", value: showResults ? 4 : 0, icon: AlertCircle },
      { label: "Improvements", value: showResults ? 3 : 0, icon: TrendingUp },
    ]

    return (
      <div className={isDark ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
          {/* Header */}
          <header className="border-b border-border bg-card">
            <div className="mx-auto max-w-7xl px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500 p-2">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Code Reviewer</h1>
                    <p className="text-sm text-muted-foreground">AI-powered code analysis tool</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="rounded-lg border border-border bg-card p-2 hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-400" />}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Code Input Card */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold">Paste Your Code</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Programming Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">Code Input</label>
                      <textarea
                          name="codeSnippet"
                        value={codeSnippet}
                        onChange={handleCodeChange}
                        placeholder="Paste your code here for review..."
                        className="h-64 w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        Lines: <span className="font-semibold text-foreground">{lineCount}</span>
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Submit for Review
                      </button>
                      <button
                        disabled={!codeSnippet && !showResults}
                        className="rounded-lg border border-border bg-card px-4 py-2 font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Clear
                      </button>
                    </div>
                  </form>
                </div>

                {/* Stats Dashboard */}
                {showResults && (
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => {
                      const Icon = stat.icon
                      return (
                        <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                          <Icon className="mb-2 h-5 w-5 text-blue-500" />
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {showResults ? (
                  <>
                    {/* Optimized Code */}
                    <div className="rounded-lg border border-border bg-card p-6">
                      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Code Review Result
                      </h2>

                      <div className="space-y-4 h-auto">
                        <div className="overflow-x-auto rounded-lg border border-border bg-background p-4">
                          <pre className="font-mono text-sm text-muted-foreground">
                            <code>{isLoading? "Reviewing Your Code":review }</code>
                          </pre>
                        </div>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(optimizedCode)
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium hover:bg-muted transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Copy to Clipboard
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                    <Code className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No Code Submitted Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste your code and click "Submit for Review" to see detailed analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
