import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle>Daily Rawalpindi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Daily Rawalpindi</strong> is an online news and headlines
            platform particularly focusing on the twin cities of Rawalpindi and
            Islamabad. Our primary focus is to deliver <strong>unbiased</strong>{" "}
            and <strong>factual</strong> news of the latest events and incidents
            that affect the lives of people in the region.
          </p>
          <p>
            With a dedicated team, we aim to provide authentic journalism that
            highlights real issues, updates, and developments — keeping our
            readers informed with accuracy and credibility.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Our Offices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="font-semibold">Rawalpindi Office</h2>
            <p>
              6th Floor, Al-Rehman Building, Rawalpindi.
              <br />
              Phone: (+92) 51-1234567
              <br />
              Email: contact@dailyrawalpindi.com
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Islamabad Office</h2>
            <p>
              Jang Building, Blue Area, Islamabad.
              <br />
              Phone: (+92) 51-7654321
              <br />
              Email: islamabad@dailyrawalpindi.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
