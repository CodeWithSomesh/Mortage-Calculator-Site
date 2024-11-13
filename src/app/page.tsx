"use client"

import { useState } from "react"
import { Calculator, Calendar, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {

  const [loanAmount, setLoanAmount] = useState("500000")
  const [interestRate, setInterestRate] = useState("4")
  const [loanTerm, setLoanTerm] = useState("30")
  const [calculated, setCalculated] = useState(false)

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const months = parseFloat(loanTerm) * 12
    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    }
  }

  const results = calculateLoan()

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Loan Calculator</CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate your mortgage and check bank eligibility
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="mortgage" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mortgage">Mortgage Calculator</TabsTrigger>
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
            </TabsList>
            <TabsContent value="mortgage" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount (RM)</Label>
                  <Input
                    id="loan-amount"
                    placeholder="Enter loan amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    placeholder="Enter interest rate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term (years)</Label>
                  <Select
                    value={loanTerm}
                    onValueChange={(value) => setLoanTerm(value)}
                  >
                    <SelectTrigger id="loan-term">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20, 25, 30, 35].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} years
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {calculated && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Loan Start</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">Nov, 2024</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Loan Tenure</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                          {loanTerm} years
                          <span className="text-sm text-muted-foreground">
                            {" "}
                            ({parseInt(loanTerm) * 12} months)
                          </span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Estimated Payoff
                          </span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                          Nov, {2024 + parseInt(loanTerm)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="col-span-full md:col-span-1">
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold">
                          Monthly Payment
                        </h3>
                        <p className="mt-2 text-3xl font-bold text-primary">
                          RM {results.monthlyPayment.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated monthly repayment
                        </p>
                      </CardContent>
                    </Card>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Total Interest
                            </span>
                          </div>
                          <p className="mt-2 text-xl font-bold">
                            RM {results.totalInterest.toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2">
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Total Payment
                            </span>
                          </div>
                          <p className="mt-2 text-xl font-bold">
                            RM {results.totalPayment.toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm font-medium">Total</p>
                          <p className="text-lg font-bold">
                            RM {results.totalPayment.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <svg
                        className="h-full w-full -rotate-90 transform"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="fill-none stroke-primary"
                          strokeWidth="12"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeDasharray={`${
                            (results.totalInterest / results.totalPayment) * 251.2
                          } 251.2`}
                        />
                        <circle
                          className="fill-none stroke-primary/20"
                          strokeWidth="12"
                          cx="50"
                          cy="50"
                          r="40"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary" />
                          <span className="text-sm">Principal</span>
                          <span className="font-bold">
                            RM {parseFloat(loanAmount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary/20" />
                          <span className="text-sm">Interest</span>
                          <span className="font-bold">
                            RM {results.totalInterest.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="personal">
              {/* Personal Details Tab */}
              <div className="flex h-[400px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Personal details form coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              setCalculated(true)}
            }
          >
            Calculate
          </Button>
        </CardContent>
      </Card>
    </div>
    
  );
}
