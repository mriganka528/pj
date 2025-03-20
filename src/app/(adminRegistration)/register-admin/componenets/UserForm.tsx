"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define the form schema with validation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

type UserFormValues = z.infer<typeof formSchema>;

export default function UserForm() {
  // Initialize the form with React Hook Form
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: UserFormValues) => {
    try {
      setIsSubmitting(true)
      const response = await axios.post('/api/register-admin', {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName
      })
      if (response.status === 200) {
        router.replace('/admin')
      }
    } catch (error) {
      toast.error("Falied to register admin")
      console.error(error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-100 dark:bg-purple-900 rounded-full opacity-50 blur-xl" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 relative mb-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-sm">
            <Image
              src="/assets/undraw_authentication.svg"
              alt="Application Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <h1 className="text-3xl font-bold text-center   dark:text-gray-200">
            Welcome!
          </h1>
        </div>

        <Card className="border border-border bg-card shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-foreground">User Registration</CardTitle>
            <CardDescription className="text-center px-4 text-muted-foreground">
              You haven&lsquo;t registered yourself yet. Please complete this form to continue your journey with us!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Middle name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your middle name"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2 flex justify-center">{
                  submitting ?
                    <div className="flex">
                      <Loader2 className=" animate-spin mr-2" /> Registering....
                    </div> : (
                      <Button
                        type="submit"
                        variant={"default"}
                        className="w-full transition-all duration-300 group"
                      >
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )
                }
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 pt-0">
            <div className="w-full border-t my-2 border-gray-100 dark:border-gray-700"></div>
            <div className="flex items-center text-sm text-muted-foreground justify-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
              <span>Your information is secure with us</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
