"use client"

import { useState, useEffect } from "react"
import { Calculator, Calendar, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import Image from "next/image"
import HomeLoanImage from "../assets/images/HomeLoan.png"
import HouseMortgage from "../assets/images/HouseMortgage.png"
import MoneyManagement from "../assets/images/MoneyManagement.png"
import { motion} from "framer-motion"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  toast
} from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { BackgroundGradient } from "@/components/ui/background-gradient"


const formSchema = z.object({
  loanAmount: z.number().min(1000).max(999999999),
  interestRate: z.number().min(0.01).max(20.99),
  loanTenure: z.number().min(1).max(50)
});

export default function Home() {

  //Initialize and Set state for variables
  const [loanAmount, setLoanAmount] = useState(0.00)
  const [interestRate, setInterestRate] = useState(0.00)
  const [loanTerm, setLoanTerm] = useState(0)
  const [valid, setValidated] = useState(false)
  const [calculated, setCalculated] = useState(false)
  const [currentMonth, setCurrentMonth] = useState('');

  //Update the month accordingly
  useEffect(() => {
    // Get the current month and format it
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date();
    const currentMonthName = monthNames[date.getMonth()];
    setCurrentMonth(currentMonthName);
  }, []);


  //Calculate Loan Payments
  const calculateLoan = () => {
    const principal = loanAmount
    const rate = interestRate / 100 / 12
    const months = loanTerm * 12
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

  //Set the Loan Payments into the "results" object
  const results = calculateLoan()

  //Intializing Zod Form Schema 
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    
  })

  //Form Submit Valication
  // Handle successful submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setValidated(true); // Set form as valid
    console.log("Form submitted successfully:", values);

    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    );
  };

  // Handle invalid submission
  const onInvalidSubmit = (errors: unknown) => {
    setValidated(false); // Set form as invalid
    console.log("Validation errors:", errors);
    toast.error("Validation failed. Please correct the errors.");
  };
  
  // Validate when loanAmount, loanTerm, or interestRate change using Zod
  useEffect(() => {

    //Making sure the variables abide to the the Zod Form Schema
    const result = formSchema.safeParse({
      loanAmount,
      interestRate,
      loanTenure: loanTerm,
    });

    setValidated(result.success);
  }, [loanAmount, interestRate, loanTerm]); // Dependency array

  //console.log(`${loanAmount} ${interestRate} ${loanTerm}`)
  
  return (

    <div className="w-full bg-black min-h-screen glow:bg-cyan-300 relative">

      {/* MoneyManagement Image*/}
      <motion.div className="absolute xs:hidden right-[2%] top-[58%] z-50"
        drag initial={{translateY: 0}}
        animate={{translateY: [0, -60, 0]}}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
          >
          <Image
            src={MoneyManagement}
            alt="Illustration of home loan concept"
            width={270}
            height={25}
            className=""
            draggable="false"
          />
      </motion.div>

      {/* HouseMortgage Image*/}
      <motion.div className="absolute xs:hidden left-[4%] bottom-[11%] z-50"
          initial={{translateY: 0}}
          animate={{translateY: [0, 60, 0]}}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
          }} drag
          >
          <Image
            src={HouseMortgage}
            alt="Illustration of home loan concept"
            width={200}
            height={75}
            className=""
            draggable="false"
          />
        </motion.div>


      <div className="relative mx-auto max-w-5xl p-4 md:p-6 lg:p-8">

        <BackgroundGradient>
        
          {/* HomeLoan Image */}
          <motion.div className="absolute xs:hidden -right-[5%] top-0 z-50"
            drag
            >
            <Image
              src={HomeLoanImage}
              alt="Illustration of home loan concept"
              width={150}
              height={75}
              className=""
              draggable="false"
            />
          </motion.div>

          <Card>
            <CardHeader className="-mb-4">
              <CardTitle className="text-3xl font-semibold">Home Loan Calculator</CardTitle>
              <p className="text-lg text-muted-foreground">
                Calculate your mortgage and check bank eligibility
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="mortgage" className="w-full p-4 border border-gray-400 rounded-sm">
                <TabsList className="flex bg-black py-6 px-2 justify-center items-center">
                  <TabsTrigger 
                    value="mortgage" 
                    className="w-full text-[18px] font-bold rounded-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#47FFDF] data-[state=active]:to-[#755FF5] data-[state=active]:text-white">
                      Mortgage Calculator</TabsTrigger>

                  <TabsTrigger value="personal" 
                    className="w-full text-[18px] font-bold rounded-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#755FF5] data-[state=active]:to-[#47FFDF] data-[state=active]:text-white" 
                    onClick={() => {
                      setCalculated(false)
                    }}>
                  Personal Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mortgage" className="space-y-6 mt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-6 w-full mt-6">
                      
                      <div className="grid grid-cols-12 gap-4">
                        
                        <div className="col-span-4">
                          
                          <FormField
                            control={form.control}
                            name="loanAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg">Loan Amount (RM)</FormLabel>
                                <FormControl>
                                  <Input 
                                  placeholder="500,000"
                                  type="number"
                                  {...field}
                                  onChange={(e) => {
                                    setLoanAmount(Number(e.target.value))
                                    field.onChange(Number(e.target.value))
                                  }}
                                  />
                                </FormControl>
                                <FormMessage className="text-md" />
                              </FormItem>
                            )}
                          />
                        </div>
                          
                        <div className="col-span-4">
                            
                          <FormField
                            control={form.control}
                            name="interestRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg">Interest Rate (%)</FormLabel>
                                <FormControl>
                                  <Input 
                                  placeholder="3.00"
                                  type="number"
                                  {...field}
                                  onChange={(e) => {
                                    setInterestRate(Number(e.target.value))
                                    field.onChange(Number(e.target.value))
                                  }}
                                  />
                                </FormControl>
                                <FormMessage className="text-md" />
                              </FormItem>
                            )}
                          />
                        </div>
                          
                        <div className="col-span-4">
                            
                          <FormField
                            control={form.control}
                            name="loanTenure"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg">Loan Tenure (years)</FormLabel>
                                <FormControl>
                                  <Input 
                                  placeholder="30 years"
                                  type="number"
                                  {...field} 
                                  onChange={(e) => {
                                    setLoanTerm(Number(e.target.value))
                                    field.onChange(Number(e.target.value))
                                  }}
                                  />
                                </FormControl>
                                <FormMessage className="text-md" />
                              </FormItem>
                            )}
                          />
                        </div>
                          
                      </div>

                      {valid && calculated && (
                        <div className="space-y-6">
                          <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center gap-0 justify-center">
                                  <Calendar className="h-6 w-8 text-muted-foreground" />
                                  <span className="text-lg text-center font-medium">Loan Start</span>
                                </div>
                                <p className="mt-5 text-2xl font-bold text-center">{currentMonth}, {new Date().getFullYear()}</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center gap-0 justify-center">
                                  <Calculator className="h-6 w-8 text-muted-foreground" />
                                  <span className="text-lg font-medium">Loan Tenure</span>
                                </div>
                                <p className="mt-5 text-2xl font-bold text-center">
                                  {loanTerm} years
                                  <span className="text-lg text-muted-foreground">
                                    {" "}
                                    ({loanTerm * 12} months)
                                  </span>
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center gap-0 justify-center">
                                  <Calendar className="h-6 w-8 text-muted-foreground" />
                                  <span className="text-lg text-center font-medium">
                                    Estimated Payoff
                                  </span>
                                </div>
                                <p className="mt-5 text-2xl font-bold text-center">
                                {currentMonth}, {(new Date().getFullYear()) + loanTerm}
                                </p>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="grid gap-8 md:grid-cols-[43%_52%]">
                            

                            <div className="grid gap-4">

                              <Card>
                                <CardContent className="h-full flex flex-col align-middle items-center justify-center py-4">
                                  <div className="flex items-center gap-0 justify-center">
                                    <Percent className="h-6 w-8 text-muted-foreground" />
                                    <span className="text-lg text-center font-medium">
                                      Total Interest
                                    </span>
                                  </div>
                                  <p className="mt-5 text-2xl font-bold text-center">
                                    RM {Number(results.totalInterest.toFixed(2)).toLocaleString()}
                                  </p>
                                </CardContent>
                              </Card>


                              <Card>
                                <CardContent className="h-full flex flex-col align-middle items-center justify-center py-4">
                                  <div className="flex items-center gap-0 justify-center">
                                    <Calculator className="h-6 w-8 text-muted-foreground" />
                                    <span className="text-lg text-center font-medium">
                                      Total Payment
                                    </span>
                                  </div>
                                  <p className="mt-5 text-2xl font-bold text-center">
                                    RM {Number(results.totalPayment.toFixed(2)).toLocaleString()}
                                  </p>
                                </CardContent>
                              </Card>


                              <Card>
                                <CardContent className="h-full flex flex-col align-middle items-center justify-center py-4">
                                  <h3 className="text-lg font-bold">
                                    Monthly Payment
                                  </h3>
                                  <p className="mt-2 text-3xl font-bold text-primary">
                                    RM {Number(results.monthlyPayment.toFixed(2)).toLocaleString()}
                                  </p>
                                  <p className="text-lg text-muted-foreground">
                                    Estimated monthly repayment
                                  </p>
                                </CardContent>
                              </Card>
                            </div>


                            <div className="grid gap-6">
                              <div className="relative aspect-square">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold italic">Total</p>
                                    <p className="text-[28px] font-bold">
                                      RM {Number(results.totalPayment.toFixed(2)).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <svg
                                  className="h-full w-full -rotate-90 transform"
                                  viewBox="0 0 100 100"
                                >
                                  <circle
                                    className="fill-none stroke-[#D433F8]"
                                    strokeWidth="20"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    strokeDasharray={`${
                                      ((loanAmount / results.totalPayment) * 251.2).toFixed(2)
                                    } 251.2`}
                                  />
                                  <circle
                                    className="fill-none stroke-[#47FFDF]"
                                    strokeWidth="20"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    strokeDasharray={`${
                                      ((results.totalInterest / results.totalPayment) * 251.2).toFixed(2)
                                    } 251.2`}
                                    strokeDashoffset={`-${
                                      ((loanAmount / results.totalPayment) * 251.2).toFixed(2)
                                    }`}
                                  />
                                </svg>
                              </div>




                              <div className="flex justify-between">
                                <div className="text-center">
                                  <div className="flex items-center gap-2 justify-center">
                                    <div className="h-4 w-4 rounded-full bg-[#D433F8]" />
                                    <span className="text-xl">Principal</span>
                                  </div>

                                  <div className="font-bold text-xl mt-2">
                                    RM {Number(loanAmount.toFixed(2)).toLocaleString()}  
                                    <span className="ml-2 text-xl">
                                      ({((loanAmount / results.totalPayment) * 100).toFixed(2)}%)
                                    </span>
                                  </div>
                                </div>


                                <div className="text-center">
                                  <div className="flex items-center gap-2 justify-center">
                                    <div className="h-4 w-4 rounded-full bg-[#47FFDF]" />
                                    <span className="text-xl">Interest</span>
                                  </div>
                                  
                                  <div className="font-bold text-xl mt-2">
                                    RM {Number(results.totalInterest.toFixed(2)).toLocaleString()}
                                    <span className="ml-2 text-xl mt-2">
                                      ({((results.totalInterest / results.totalPayment) * 100).toFixed(2)}%)
                                    </span>
                                  </div>
                                </div>
                              </div>


                            </div>


                          </div>

                          
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full text-xl font-bold py-6 
                        hover:bg-gradient-to-r hover:from-[#47FFDF] hover:to-[#755FF5] border-black border-4"
                        size="lg"
                        onClick={() => {
                            setCalculated(true);
                        }}
                      >
                        Calculate
                      </Button>
                    </form>
                  </Form>

                  
                </TabsContent>

                <TabsContent value="personal" >
                  {/* Personal Details Tab */}
                  <div className="flex h-[400px] items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Personal details form coming soon...
                    </p>

                    
                  </div>
                </TabsContent>
              </Tabs>

            </CardContent>
          </Card>
        </BackgroundGradient>
        

      </div>

    </div>

  );
}
