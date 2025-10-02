// app/contact/page.tsx (Next.js 13+ App Router)
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReCaptcha from "react-google-recaptcha";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
type RecaptchaValue = string | null;



export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    related: "Suggestions",
    message: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState<RecaptchaValue>(null);

  const handleCaptcha = (value: string | null) => {
    console.log("Captcha value:", value);
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Here you can integrate with an API route, EmailJS, or backend service
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4">
        Contact Us
      </h1>

      <Card className="mb-8">
        <p className="ml-4">
          For any query, please feel free to contact the following departments respectively;</p>
        <CardHeader>

          <CardTitle>Department Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Editorial Desk:</strong>{" "}
            <a href="mailto:editorgeo.tv@immcorporate.com" className="text-blue-600 underline">
              editorgeo.tv@immcorporate.com
            </a>
          </p>
          <p>
            <strong>Marketing & Sales:</strong>{" "}
            <a href="mailto:sales@immcorporate.com" className="text-blue-600 underline">
              sales@immcorporate.com
            </a>
          </p>
          <p>
            <strong>Other queries:</strong>{" "}
            <a href="mailto:support@immcorporate.com" className="text-blue-600 underline">
              support@immcorporate.com
            </a>
          </p>
          <p>
            <strong>TV Shows:</strong> Muaz Ahsan (Director Programming, Strategy and Brand) –{" "}
            <a href="mailto:muaz.ahsan@geo.tv" className="text-blue-600 underline">
              muaz.ahsan@geo.tv
            </a>
          </p>
          <p>
            <strong>Product Development:</strong> Khurram Siddiqi (Head, Product Development) –{" "}
            <a href="mailto:khurram.siddiqi@geo.tv" className="text-blue-600 underline">
              khurram.siddiqi@geo.tv
            </a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="mt-3" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email}
                onChange={(e) => handleChange("email", e.target.value)} required
                className="mt-3" />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-3" />
            </div>

            <div>
              <Label htmlFor="related" >Related To</Label>
              <Select value={form.related} onValueChange={(value) => handleChange("related", value)}
              >
                <SelectTrigger className="mt-3" >
                  <SelectValue placeholder="Select" className="mt-3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Suggestions">Suggestions</SelectItem>
                  <SelectItem value="Complaints">Complaints</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" >Message</Label>
              <Textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                className="mt-3"
              />
            </div>

            {/* Captcha (centered & responsive) */}
            <div className="flex justify-center my-4">
              <div className="w-full max-w-sm flex justify-center">
                <ReCaptcha
                  sitekey="6LdktL8rAAAAAL9lgn24ViVPUHOaUPfD_qufGxiG"
                  onChange={handleCaptcha}
                />
              </div>
            </div>

            {/* Submit Button (centered & responsive) */}
            <div className="flex justify-center mt-5 px-4">
              <Button
                type="submit"
                className="px-8 py-2 bg-blue-800 text-white rounded-md"
              >
                Submit
              </Button>
            </div>




          </form>
        </CardContent>
      </Card>
    </div>
  );
}
